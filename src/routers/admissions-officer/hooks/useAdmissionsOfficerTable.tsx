import { useCallback, useEffect, useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { setForDelete, setForEdit, setForView, resetSelectedObj } from '@/store/slice/selectedObjSlice';
import { useInitializeTableConfig } from '@/hooks/useTableActions';
import { useTableOperations } from '@/hooks/useTableOperations';
import { Trash2, Edit, Eye } from 'lucide-react';
import { getAdmissionsOfficers, deleteAdmissionsOfficer } from '../service';
import admissionsOfficerTableConfigDefault from '../data/admissionsOfficerTableConfigDefault';
import { TableAction, TableColumn } from '@/types/table';
import { IAdmissionsOfficerIndex } from '../interface';
import admissionsOfficerConstants from '../constants';
import { formatDate } from '@/util/formatDate';

interface UseAdmissionsOfficerTableConfigProps {
  setAdmissionsOfficerCount: React.Dispatch<React.SetStateAction<number | null>>;
  setCurrentPageCount?: React.Dispatch<React.SetStateAction<number>>;
  filterKeys?: Record<string, unknown>;
}

export const useAdmissionsOfficerTableConfig = ({ setAdmissionsOfficerCount, setCurrentPageCount, filterKeys = {} }: UseAdmissionsOfficerTableConfigProps) => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const columns: TableColumn<IAdmissionsOfficerIndex>[] = useMemo(
    () => admissionsOfficerTableColumns,
    [],
  );

  const tableConfiguration = useAppSelector((state: RootState) => state.tableConfiguration[admissionsOfficerConstants.TABLE_CONFIG_KEY] || {});
  const { [admissionsOfficerConstants.ENTITY_KEY]: { primaryKeys } = {} } = useAppSelector((state: RootState) => state.selectedObj);
  const { user } = useAppSelector((state: RootState) => state.session);

  const deleteEntityMutation = useMutation({
    mutationFn: deleteAdmissionsOfficer || (() => Promise.reject(new Error('Delete function not provided'))),
  });

  const { pager, setPager, queryParams, handleSort, getSortDirection, getSortIndex } = useTableOperations(filterKeys as any, (tableConfiguration as any).multiSort);

  useInitializeTableConfig(admissionsOfficerConstants.TABLE_CONFIG_KEY, admissionsOfficerTableConfigDefault);

  const { data: entityResponse, isFetching: isLoading } = useQuery({
    queryKey: [admissionsOfficerConstants.QUERY_KEY, queryParams],
    queryFn: () => getAdmissionsOfficers(queryParams as any),
    enabled: Boolean(queryParams),
  });

  const entityPager = useMemo(() => {
    return entityResponse?.data;
  }, [entityResponse]);

  useEffect(() => {
    if (entityPager) {
      setAdmissionsOfficerCount(entityPager?.meta?.total || 0);
      if (setCurrentPageCount) {
        setCurrentPageCount(entityPager?.data?.length || 0);
      }
    }
  }, [entityPager, setAdmissionsOfficerCount, setCurrentPageCount]);

  const handleDelete = useCallback(async () => {
  if (!primaryKeys || !primaryKeys[admissionsOfficerConstants.PRIMARY_KEY]) {
    console.error('Cannot delete: Missing primary keys');
    return;
  }
  await deleteEntityMutation.mutateAsync(primaryKeys);
  queryClient.invalidateQueries({ queryKey: [admissionsOfficerConstants.QUERY_KEY, queryParams], exact: false });
  dispatch(resetSelectedObj(admissionsOfficerConstants.ENTITY_KEY));
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
    (record: IAdmissionsOfficerIndex) => {
      const id = (record as any)[admissionsOfficerConstants.PRIMARY_KEY];
      if (!id) {
        console.error('Cannot delete: Missing id');
        return;
      }
      dispatch(
        setForDelete({
          primaryKeys: { [admissionsOfficerConstants.PRIMARY_KEY]: id },
          label: (record as any)[admissionsOfficerConstants.LABEL_FIELD] || '',
          objKey: admissionsOfficerConstants.ENTITY_KEY,
        }),
      );
    },
    [dispatch],
  );

  const handleView = useCallback(
    (record: IAdmissionsOfficerIndex) => {
      const id = (record as any)[admissionsOfficerConstants.PRIMARY_KEY];
      if (!id) {
        console.error('Cannot view: Missing id');
        return;
      }
      dispatch(
        setForView({
          primaryKeys: { [admissionsOfficerConstants.PRIMARY_KEY]: id },
          label: (record as any)[admissionsOfficerConstants.LABEL_FIELD] || '',
          objKey: admissionsOfficerConstants.ENTITY_KEY,
        }),
      );
    },
    [dispatch],
  );

  const handleEdit = useCallback(
    (record: IAdmissionsOfficerIndex) => {
      const id = (record as any)[admissionsOfficerConstants.PRIMARY_KEY];
      if (!id) {
        console.error('Cannot edit: Missing id');
        return;
      }
      dispatch(
        setForEdit({
          primaryKeys: { [admissionsOfficerConstants.PRIMARY_KEY]: id },
          label: (record as any)[admissionsOfficerConstants.LABEL_FIELD] || '',
          objKey: admissionsOfficerConstants.ENTITY_KEY,
        }),
      );
    },
    [dispatch],
  );

  const actions: TableAction<IAdmissionsOfficerIndex>[] = useMemo(() => {
    const list: TableAction<IAdmissionsOfficerIndex>[] = [];
    
    list.push({
      key: 'view',
      icon: <Eye className="size-4" />,
      onClick: handleView,
      permission: {
        scope: user?.scope || '',
        module: admissionsOfficerConstants.PERMISSIONS.MODULE,
        resource: admissionsOfficerConstants.PERMISSIONS.RESOURCE,
        action: admissionsOfficerConstants.PERMISSIONS.ACTIONS.VIEW,
      },
    });

    
    list.push({
      key: 'edit',
      icon: <Edit className="size-4" />,
      onClick: handleEdit,
      permission: {
        scope: user?.scope || '',
        module: admissionsOfficerConstants.PERMISSIONS.MODULE,
        resource: admissionsOfficerConstants.PERMISSIONS.RESOURCE,
        action: admissionsOfficerConstants.PERMISSIONS.ACTIONS.EDIT,
      },
    });

    
    list.push({
      key: 'delete',
      icon: <Trash2 className="size-4 text-red-500" />,
      onClick: handleDeleteAction,
      className: 'text-red-500',
      permission: {
        scope: user?.scope || '',
        module: admissionsOfficerConstants.PERMISSIONS.MODULE,
        resource: admissionsOfficerConstants.PERMISSIONS.RESOURCE,
        action: admissionsOfficerConstants.PERMISSIONS.ACTIONS.DELETE,
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
    isConfigModified: Object.keys(admissionsOfficerTableConfigDefault).some((key) => (admissionsOfficerTableConfigDefault as any)[key as any] !== (tableConfiguration as any)[key as any]),
    tableConfiguration,
    handleDelete,
    isDeleteLoading: deleteEntityMutation.isPending,
    handleDeleteAction,
    handleEdit,
    handleView,

    user,
    entityName: admissionsOfficerConstants.ENTITY_NAME,
    entityKey: admissionsOfficerConstants.ENTITY_KEY,
    tableConfigKey: admissionsOfficerConstants.TABLE_CONFIG_KEY,
    defaultTableConfig: admissionsOfficerTableConfigDefault,
    totalCount: entityPager?.meta?.total || 0,
    columns,
    actions,
  };
};

// Export table columns for use in other components
export const admissionsOfficerTableColumns: TableColumn<IAdmissionsOfficerIndex>[] = [
  { key: 'admissionsOfficerId', title: 'Admissions Officer Id', dataIndex: 'admissionsOfficerId', sortable: false },
			{ key: 'userId', title: 'User Id', dataIndex: 'userId', sortable: false },
			{ key: 'department', title: 'Department', dataIndex: 'department', sortable: false },
			{ key: 'title', title: 'Title', dataIndex: 'title', sortable: false },
			{ key: 'createdAt', title: 'Created At', dataIndex: 'createdAt', sortable: false,
                    render: (value) => <span>{formatDate(value, 'TIMESTAMP')}</span>
                },
			{ key: 'updatedAt', title: 'Updated At', dataIndex: 'updatedAt', sortable: false,
                    render: (value) => <span>{formatDate(value, 'TIMESTAMP')}</span>
                }
];
