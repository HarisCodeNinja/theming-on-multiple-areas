import { useCallback, useEffect, useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { setForDelete, setForEdit, setForView, resetSelectedObj } from '@/store/slice/selectedObjSlice';
import { useInitializeTableConfig } from '@/hooks/useTableActions';
import { useTableOperations } from '@/hooks/useTableOperations';
import { Trash2, Edit, Eye } from 'lucide-react';
import { getAuditTrails } from '../service';
import auditTrailTableConfigDefault from '../data/auditTrailTableConfigDefault';
import { TableAction, TableColumn } from '@/types/table';
import { IAuditTrailIndex } from '../interface';
import auditTrailConstants from '../constants';
import { JSONValueRenderer } from '@/components/JSONValueRenderer';
import { formatDate } from '@/util/formatDate';

interface UseAuditTrailTableConfigProps {
  setAuditTrailCount: React.Dispatch<React.SetStateAction<number | null>>;
  setCurrentPageCount?: React.Dispatch<React.SetStateAction<number>>;
  filterKeys?: Record<string, unknown>;
}

export const useAuditTrailTableConfig = ({ setAuditTrailCount, setCurrentPageCount, filterKeys = {} }: UseAuditTrailTableConfigProps) => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const columns: TableColumn<IAuditTrailIndex>[] = useMemo(
    () => auditTrailTableColumns,
    [],
  );

  const tableConfiguration = useAppSelector((state: RootState) => state.tableConfiguration[auditTrailConstants.TABLE_CONFIG_KEY] || {});
  const { [auditTrailConstants.ENTITY_KEY]: { primaryKeys } = {} } = useAppSelector((state: RootState) => state.selectedObj);
  const { user } = useAppSelector((state: RootState) => state.session);

  const { pager, setPager, queryParams, handleSort, getSortDirection, getSortIndex } = useTableOperations(filterKeys as any, (tableConfiguration as any).multiSort);

  useInitializeTableConfig(auditTrailConstants.TABLE_CONFIG_KEY, auditTrailTableConfigDefault);

  const { data: entityResponse, isFetching: isLoading } = useQuery({
    queryKey: [auditTrailConstants.QUERY_KEY, queryParams],
    queryFn: () => getAuditTrails(queryParams as any),
    enabled: Boolean(queryParams),
  });

  const entityPager = useMemo(() => {
    return entityResponse?.data;
  }, [entityResponse]);

  useEffect(() => {
    if (entityPager) {
      setAuditTrailCount(entityPager?.meta?.total || 0);
      if (setCurrentPageCount) {
        setCurrentPageCount(entityPager?.data?.length || 0);
      }
    }
  }, [entityPager, setAuditTrailCount, setCurrentPageCount]);

  const visibleColumns = useMemo(() => {
    return columns.filter((column) => {
      const isVisible = (tableConfiguration as any)[column.key as keyof typeof tableConfiguration];
      return isVisible !== undefined ? isVisible : true;
    });
  }, [columns, tableConfiguration]);

  const totalPages = Math.ceil((entityPager?.meta?.total || 0) / pager.pageSize);
  const showPagination = (entityPager?.meta?.total || 0) > pager.pageSize;

  const handleView = useCallback(
    (record: IAuditTrailIndex) => {
      const id = (record as any)[auditTrailConstants.PRIMARY_KEY];
      if (!id) {
        console.error('Cannot view: Missing id');
        return;
      }
      dispatch(
        setForView({
          primaryKeys: { [auditTrailConstants.PRIMARY_KEY]: id },
          label: (record as any)[auditTrailConstants.LABEL_FIELD] || '',
          objKey: auditTrailConstants.ENTITY_KEY,
        }),
      );
    },
    [dispatch],
  );

  const handleEdit = useCallback(
    (record: IAuditTrailIndex) => {
      const id = (record as any)[auditTrailConstants.PRIMARY_KEY];
      if (!id) {
        console.error('Cannot edit: Missing id');
        return;
      }
      dispatch(
        setForEdit({
          primaryKeys: { [auditTrailConstants.PRIMARY_KEY]: id },
          label: (record as any)[auditTrailConstants.LABEL_FIELD] || '',
          objKey: auditTrailConstants.ENTITY_KEY,
        }),
      );
    },
    [dispatch],
  );

  const actions: TableAction<IAuditTrailIndex>[] = useMemo(() => {
    const list: TableAction<IAuditTrailIndex>[] = [];
    
    list.push({
      key: 'view',
      icon: <Eye className="size-4" />,
      onClick: handleView,
      permission: {
        scope: user?.scope || '',
        module: auditTrailConstants.PERMISSIONS.MODULE,
        resource: auditTrailConstants.PERMISSIONS.RESOURCE,
        action: auditTrailConstants.PERMISSIONS.ACTIONS.VIEW,
      },
    });

    

    

    return list;
  }, [handleEdit,  handleView, user]);

  return {
    data: entityPager?.data || [],
    isLoading,
    totalPages,
    showPagination,
    visibleColumns,
    pager,
    setPager,
    queryParams,
    handleSort,
    getSortDirection,
    getSortIndex,
    isConfigModified: Object.keys(auditTrailTableConfigDefault).some((key) => (auditTrailTableConfigDefault as any)[key as any] !== (tableConfiguration as any)[key as any]),
    tableConfiguration,
    handleEdit,
    handleView,

    user,
    entityName: auditTrailConstants.ENTITY_NAME,
    entityKey: auditTrailConstants.ENTITY_KEY,
    tableConfigKey: auditTrailConstants.TABLE_CONFIG_KEY,
    defaultTableConfig: auditTrailTableConfigDefault,
    totalCount: entityPager?.meta?.total || 0,
    columns,
    actions,
  };
};

// Export table columns for use in other components
export const auditTrailTableColumns: TableColumn<IAuditTrailIndex>[] = [
  { key: 'auditId', title: 'Audit Id', dataIndex: 'auditId', sortable: false },
			{ key: 'entityType', title: 'Entity Type', dataIndex: 'entityType', sortable: false },
			{ key: 'entityId', title: 'Entity Id', dataIndex: 'entityId', sortable: false },
			{ key: 'action', title: 'Action', dataIndex: 'action', sortable: false },
			{ key: 'changedByUserId', title: 'Changed By User Id', dataIndex: 'changedByUserId', sortable: false },
			{ key: 'oldValue', title: 'Old Value', dataIndex: 'oldValue', sortable: false,
              render: (value) => <JSONValueRenderer value={value} />
             },
			{ key: 'newValue', title: 'New Value', dataIndex: 'newValue', sortable: false,
              render: (value) => <JSONValueRenderer value={value} />
             },
			{ key: 'changeTimestamp', title: 'Change Timestamp', dataIndex: 'changeTimestamp', sortable: false,
                    render: (value) => <span>{formatDate(value, 'TIMESTAMP')}</span>
                }
];
