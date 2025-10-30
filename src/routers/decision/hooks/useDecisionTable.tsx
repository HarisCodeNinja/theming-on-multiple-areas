import { useCallback, useEffect, useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { setForDelete, setForEdit, setForView, resetSelectedObj } from '@/store/slice/selectedObjSlice';
import { useInitializeTableConfig } from '@/hooks/useTableActions';
import { useTableOperations } from '@/hooks/useTableOperations';
import { Trash2, Edit, Eye } from 'lucide-react';
import { getDecisions, deleteDecision } from '../service';
import decisionTableConfigDefault from '../data/decisionTableConfigDefault';
import { TableAction, TableColumn } from '@/types/table';
import { IDecisionIndex } from '../interface';
import decisionConstants from '../constants';
import { formatDate } from '@/util/formatDate';

interface UseDecisionTableConfigProps {
  setDecisionCount: React.Dispatch<React.SetStateAction<number | null>>;
  setCurrentPageCount?: React.Dispatch<React.SetStateAction<number>>;
  filterKeys?: Record<string, unknown>;
}

export const useDecisionTableConfig = ({ setDecisionCount, setCurrentPageCount, filterKeys = {} }: UseDecisionTableConfigProps) => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const columns: TableColumn<IDecisionIndex>[] = useMemo(
    () => decisionTableColumns,
    [],
  );

  const tableConfiguration = useAppSelector((state: RootState) => state.tableConfiguration[decisionConstants.TABLE_CONFIG_KEY] || {});
  const { [decisionConstants.ENTITY_KEY]: { primaryKeys } = {} } = useAppSelector((state: RootState) => state.selectedObj);
  const { user } = useAppSelector((state: RootState) => state.session);

  const deleteEntityMutation = useMutation({
    mutationFn: deleteDecision || (() => Promise.reject(new Error('Delete function not provided'))),
  });

  const { pager, setPager, queryParams, handleSort, getSortDirection, getSortIndex } = useTableOperations(filterKeys as any, (tableConfiguration as any).multiSort);

  useInitializeTableConfig(decisionConstants.TABLE_CONFIG_KEY, decisionTableConfigDefault);

  const { data: entityResponse, isFetching: isLoading } = useQuery({
    queryKey: [decisionConstants.QUERY_KEY, queryParams],
    queryFn: () => getDecisions(queryParams as any),
    enabled: Boolean(queryParams),
  });

  const entityPager = useMemo(() => {
    return entityResponse?.data;
  }, [entityResponse]);

  useEffect(() => {
    if (entityPager) {
      setDecisionCount(entityPager?.meta?.total || 0);
      if (setCurrentPageCount) {
        setCurrentPageCount(entityPager?.data?.length || 0);
      }
    }
  }, [entityPager, setDecisionCount, setCurrentPageCount]);

  const handleDelete = useCallback(async () => {
  if (!primaryKeys || !primaryKeys[decisionConstants.PRIMARY_KEY]) {
    console.error('Cannot delete: Missing primary keys');
    return;
  }
  await deleteEntityMutation.mutateAsync(primaryKeys);
  queryClient.invalidateQueries({ queryKey: [decisionConstants.QUERY_KEY, queryParams], exact: false });
  dispatch(resetSelectedObj(decisionConstants.ENTITY_KEY));
  }, [deleteEntityMutation, primaryKeys, dispatch, queryParams, queryClient]);

  const visibleColumns = useMemo(() => {
    return columns.filter((column) => {
      const isVisible = (tableConfiguration as any)[column.key as keyof typeof tableConfiguration];
      return isVisible !== undefined ? isVisible : true;
    });
  }, [columns, tableConfiguration]);

  const totalPages = Math.ceil((entityPager?.meta?.total || 0) / pager.pageSize);
  const showPagination = (entityPager?.meta?.total || 0) > pager.pageSize;

  const handleDeleteAction = useCallback(
    (record: IDecisionIndex) => {
      const id = (record as any)[decisionConstants.PRIMARY_KEY];
      if (!id) {
        console.error('Cannot delete: Missing id');
        return;
      }
      dispatch(
        setForDelete({
          primaryKeys: { [decisionConstants.PRIMARY_KEY]: id },
          label: (record as any)[decisionConstants.LABEL_FIELD] || '',
          objKey: decisionConstants.ENTITY_KEY,
        }),
      );
    },
    [dispatch],
  );

  const handleView = useCallback(
    (record: IDecisionIndex) => {
      const id = (record as any)[decisionConstants.PRIMARY_KEY];
      if (!id) {
        console.error('Cannot view: Missing id');
        return;
      }
      dispatch(
        setForView({
          primaryKeys: { [decisionConstants.PRIMARY_KEY]: id },
          label: (record as any)[decisionConstants.LABEL_FIELD] || '',
          objKey: decisionConstants.ENTITY_KEY,
        }),
      );
    },
    [dispatch],
  );

  const handleEdit = useCallback(
    (record: IDecisionIndex) => {
      const id = (record as any)[decisionConstants.PRIMARY_KEY];
      if (!id) {
        console.error('Cannot edit: Missing id');
        return;
      }
      dispatch(
        setForEdit({
          primaryKeys: { [decisionConstants.PRIMARY_KEY]: id },
          label: (record as any)[decisionConstants.LABEL_FIELD] || '',
          objKey: decisionConstants.ENTITY_KEY,
        }),
      );
    },
    [dispatch],
  );

  const actions: TableAction<IDecisionIndex>[] = useMemo(() => {
    const list: TableAction<IDecisionIndex>[] = [];
    
    list.push({
      key: 'view',
      icon: <Eye className="size-4" />,
      onClick: handleView,
      permission: {
        scope: user?.scope || '',
        module: decisionConstants.PERMISSIONS.MODULE,
        resource: decisionConstants.PERMISSIONS.RESOURCE,
        action: decisionConstants.PERMISSIONS.ACTIONS.VIEW,
      },
    });

    
    list.push({
      key: 'edit',
      icon: <Edit className="size-4" />,
      onClick: handleEdit,
      permission: {
        scope: user?.scope || '',
        module: decisionConstants.PERMISSIONS.MODULE,
        resource: decisionConstants.PERMISSIONS.RESOURCE,
        action: decisionConstants.PERMISSIONS.ACTIONS.EDIT,
      },
    });

    
    list.push({
      key: 'delete',
      icon: <Trash2 className="size-4 text-red-500" />,
      onClick: handleDeleteAction,
      className: 'text-red-500',
      permission: {
        scope: user?.scope || '',
        module: decisionConstants.PERMISSIONS.MODULE,
        resource: decisionConstants.PERMISSIONS.RESOURCE,
        action: decisionConstants.PERMISSIONS.ACTIONS.DELETE,
      },
    });

    return list;
  }, [handleEdit, handleDeleteAction, handleView, user]);

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
    isConfigModified: Object.keys(decisionTableConfigDefault).some((key) => (decisionTableConfigDefault as any)[key as any] !== (tableConfiguration as any)[key as any]),
    tableConfiguration,
    handleDelete,
    isDeleteLoading: deleteEntityMutation.isPending,
    handleDeleteAction,
    handleEdit,
    handleView,

    user,
    entityName: decisionConstants.ENTITY_NAME,
    entityKey: decisionConstants.ENTITY_KEY,
    tableConfigKey: decisionConstants.TABLE_CONFIG_KEY,
    defaultTableConfig: decisionTableConfigDefault,
    totalCount: entityPager?.meta?.total || 0,
    columns,
    actions,
  };
};

// Export table columns for use in other components
export const decisionTableColumns: TableColumn<IDecisionIndex>[] = [
  { key: 'decisionId', title: 'Decision Id', dataIndex: 'decisionId', sortable: false },
			{ key: 'applicationId', title: 'Application Id', dataIndex: 'applicationId', sortable: false },
			{ key: 'decisionType', title: 'Decision Type', dataIndex: 'decisionType', sortable: false },
			{ key: 'decisionDate', title: 'Decision Date', dataIndex: 'decisionDate', sortable: false,
                    render: (value) => <span>{formatDate(value, 'DATE_TIME')}</span>
                },
			{ key: 'communicatedDate', title: 'Communicated Date', dataIndex: 'communicatedDate', sortable: false,
                    render: (value) => <span>{formatDate(value, 'DATE_TIME')}</span>
                },
			{ key: 'communicatedByUserId', title: 'Communicated By User Id', dataIndex: 'communicatedByUserId', sortable: false },
			{ key: 'note', title: 'Note', dataIndex: 'note', sortable: false },
			{ key: 'createdAt', title: 'Created At', dataIndex: 'createdAt', sortable: false,
                    render: (value) => <span>{formatDate(value, 'TIMESTAMP')}</span>
                },
			{ key: 'updatedAt', title: 'Updated At', dataIndex: 'updatedAt', sortable: false,
                    render: (value) => <span>{formatDate(value, 'TIMESTAMP')}</span>
                }
];
