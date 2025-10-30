import { useCallback, useEffect, useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { setForDelete, setForEdit, setForView, resetSelectedObj } from '@/store/slice/selectedObjSlice';
import { useInitializeTableConfig } from '@/hooks/useTableActions';
import { useTableOperations } from '@/hooks/useTableOperations';
import { Trash2, Edit, Eye } from 'lucide-react';
import { getEnrollments, deleteEnrollment } from '../service';
import enrollmentTableConfigDefault from '../data/enrollmentTableConfigDefault';
import { TableAction, TableColumn } from '@/types/table';
import { IEnrollmentIndex } from '../interface';
import enrollmentConstants from '../constants';
import { formatDate } from '@/util/formatDate';

interface UseEnrollmentTableConfigProps {
  setEnrollmentCount: React.Dispatch<React.SetStateAction<number | null>>;
  setCurrentPageCount?: React.Dispatch<React.SetStateAction<number>>;
  filterKeys?: Record<string, unknown>;
}

export const useEnrollmentTableConfig = ({ setEnrollmentCount, setCurrentPageCount, filterKeys = {} }: UseEnrollmentTableConfigProps) => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const columns: TableColumn<IEnrollmentIndex>[] = useMemo(
    () => enrollmentTableColumns,
    [],
  );

  const tableConfiguration = useAppSelector((state: RootState) => state.tableConfiguration[enrollmentConstants.TABLE_CONFIG_KEY] || {});
  const { [enrollmentConstants.ENTITY_KEY]: { primaryKeys } = {} } = useAppSelector((state: RootState) => state.selectedObj);
  const { user } = useAppSelector((state: RootState) => state.session);

  const deleteEntityMutation = useMutation({
    mutationFn: deleteEnrollment || (() => Promise.reject(new Error('Delete function not provided'))),
  });

  const { pager, setPager, queryParams, handleSort, getSortDirection, getSortIndex } = useTableOperations(filterKeys as any, (tableConfiguration as any).multiSort);

  useInitializeTableConfig(enrollmentConstants.TABLE_CONFIG_KEY, enrollmentTableConfigDefault);

  const { data: entityResponse, isFetching: isLoading } = useQuery({
    queryKey: [enrollmentConstants.QUERY_KEY, queryParams],
    queryFn: () => getEnrollments(queryParams as any),
    enabled: Boolean(queryParams),
  });

  const entityPager = useMemo(() => {
    return entityResponse?.data;
  }, [entityResponse]);

  useEffect(() => {
    if (entityPager) {
      setEnrollmentCount(entityPager?.meta?.total || 0);
      if (setCurrentPageCount) {
        setCurrentPageCount(entityPager?.data?.length || 0);
      }
    }
  }, [entityPager, setEnrollmentCount, setCurrentPageCount]);

  const handleDelete = useCallback(async () => {
  if (!primaryKeys || !primaryKeys[enrollmentConstants.PRIMARY_KEY]) {
    console.error('Cannot delete: Missing primary keys');
    return;
  }
  await deleteEntityMutation.mutateAsync(primaryKeys);
  queryClient.invalidateQueries({ queryKey: [enrollmentConstants.QUERY_KEY, queryParams], exact: false });
  dispatch(resetSelectedObj(enrollmentConstants.ENTITY_KEY));
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
    (record: IEnrollmentIndex) => {
      const id = (record as any)[enrollmentConstants.PRIMARY_KEY];
      if (!id) {
        console.error('Cannot delete: Missing id');
        return;
      }
      dispatch(
        setForDelete({
          primaryKeys: { [enrollmentConstants.PRIMARY_KEY]: id },
          label: (record as any)[enrollmentConstants.LABEL_FIELD] || '',
          objKey: enrollmentConstants.ENTITY_KEY,
        }),
      );
    },
    [dispatch],
  );

  const handleView = useCallback(
    (record: IEnrollmentIndex) => {
      const id = (record as any)[enrollmentConstants.PRIMARY_KEY];
      if (!id) {
        console.error('Cannot view: Missing id');
        return;
      }
      dispatch(
        setForView({
          primaryKeys: { [enrollmentConstants.PRIMARY_KEY]: id },
          label: (record as any)[enrollmentConstants.LABEL_FIELD] || '',
          objKey: enrollmentConstants.ENTITY_KEY,
        }),
      );
    },
    [dispatch],
  );

  const handleEdit = useCallback(
    (record: IEnrollmentIndex) => {
      const id = (record as any)[enrollmentConstants.PRIMARY_KEY];
      if (!id) {
        console.error('Cannot edit: Missing id');
        return;
      }
      dispatch(
        setForEdit({
          primaryKeys: { [enrollmentConstants.PRIMARY_KEY]: id },
          label: (record as any)[enrollmentConstants.LABEL_FIELD] || '',
          objKey: enrollmentConstants.ENTITY_KEY,
        }),
      );
    },
    [dispatch],
  );

  const actions: TableAction<IEnrollmentIndex>[] = useMemo(() => {
    const list: TableAction<IEnrollmentIndex>[] = [];
    
    list.push({
      key: 'view',
      icon: <Eye className="size-4" />,
      onClick: handleView,
      permission: {
        scope: user?.scope || '',
        module: enrollmentConstants.PERMISSIONS.MODULE,
        resource: enrollmentConstants.PERMISSIONS.RESOURCE,
        action: enrollmentConstants.PERMISSIONS.ACTIONS.VIEW,
      },
    });

    
    list.push({
      key: 'edit',
      icon: <Edit className="size-4" />,
      onClick: handleEdit,
      permission: {
        scope: user?.scope || '',
        module: enrollmentConstants.PERMISSIONS.MODULE,
        resource: enrollmentConstants.PERMISSIONS.RESOURCE,
        action: enrollmentConstants.PERMISSIONS.ACTIONS.EDIT,
      },
    });

    
    list.push({
      key: 'delete',
      icon: <Trash2 className="size-4 text-red-500" />,
      onClick: handleDeleteAction,
      className: 'text-red-500',
      permission: {
        scope: user?.scope || '',
        module: enrollmentConstants.PERMISSIONS.MODULE,
        resource: enrollmentConstants.PERMISSIONS.RESOURCE,
        action: enrollmentConstants.PERMISSIONS.ACTIONS.DELETE,
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
    isConfigModified: Object.keys(enrollmentTableConfigDefault).some((key) => (enrollmentTableConfigDefault as any)[key as any] !== (tableConfiguration as any)[key as any]),
    tableConfiguration,
    handleDelete,
    isDeleteLoading: deleteEntityMutation.isPending,
    handleDeleteAction,
    handleEdit,
    handleView,

    user,
    entityName: enrollmentConstants.ENTITY_NAME,
    entityKey: enrollmentConstants.ENTITY_KEY,
    tableConfigKey: enrollmentConstants.TABLE_CONFIG_KEY,
    defaultTableConfig: enrollmentTableConfigDefault,
    totalCount: entityPager?.meta?.total || 0,
    columns,
    actions,
  };
};

// Export table columns for use in other components
export const enrollmentTableColumns: TableColumn<IEnrollmentIndex>[] = [
  { key: 'enrollmentId', title: 'Enrollment Id', dataIndex: 'enrollmentId', sortable: false },
			{ key: 'applicationId', title: 'Application Id', dataIndex: 'applicationId', sortable: false },
			{ key: 'programId', title: 'Program Id', dataIndex: 'programId', sortable: false },
			{ key: 'enrollmentDate', title: 'Enrollment Date', dataIndex: 'enrollmentDate', sortable: false,
                    render: (value) => <span>{formatDate(value, 'DATE_TIME')}</span>
                },
			{ key: 'studentIdInSi', title: 'Student Id In Si', dataIndex: 'studentIdInSi', sortable: false },
			{ key: 'status', title: 'Status', dataIndex: 'status', sortable: false },
			{ key: 'createdAt', title: 'Created At', dataIndex: 'createdAt', sortable: false,
                    render: (value) => <span>{formatDate(value, 'TIMESTAMP')}</span>
                },
			{ key: 'updatedAt', title: 'Updated At', dataIndex: 'updatedAt', sortable: false,
                    render: (value) => <span>{formatDate(value, 'TIMESTAMP')}</span>
                }
];
