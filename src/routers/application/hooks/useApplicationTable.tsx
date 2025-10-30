import { useCallback, useEffect, useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { setForDelete, setForEdit, setForView, resetSelectedObj } from '@/store/slice/selectedObjSlice';
import { useInitializeTableConfig } from '@/hooks/useTableActions';
import { useTableOperations } from '@/hooks/useTableOperations';
import { Trash2, Edit, Eye } from 'lucide-react';
import { getApplications, deleteApplication } from '../service';
import applicationTableConfigDefault from '../data/applicationTableConfigDefault';
import { TableAction, TableColumn } from '@/types/table';
import { IApplicationIndex } from '../interface';
import applicationConstants from '../constants';
import { formatDate } from '@/util/formatDate';

interface UseApplicationTableConfigProps {
  setApplicationCount: React.Dispatch<React.SetStateAction<number | null>>;
  setCurrentPageCount?: React.Dispatch<React.SetStateAction<number>>;
  filterKeys?: Record<string, unknown>;
}

export const useApplicationTableConfig = ({ setApplicationCount, setCurrentPageCount, filterKeys = {} }: UseApplicationTableConfigProps) => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const columns: TableColumn<IApplicationIndex>[] = useMemo(
    () => applicationTableColumns,
    [],
  );

  const tableConfiguration = useAppSelector((state: RootState) => state.tableConfiguration[applicationConstants.TABLE_CONFIG_KEY] || {});
  const { [applicationConstants.ENTITY_KEY]: { primaryKeys } = {} } = useAppSelector((state: RootState) => state.selectedObj);
  const { user } = useAppSelector((state: RootState) => state.session);

  const deleteEntityMutation = useMutation({
    mutationFn: deleteApplication || (() => Promise.reject(new Error('Delete function not provided'))),
  });

  const { pager, setPager, queryParams, handleSort, getSortDirection, getSortIndex } = useTableOperations(filterKeys as any, (tableConfiguration as any).multiSort);

  useInitializeTableConfig(applicationConstants.TABLE_CONFIG_KEY, applicationTableConfigDefault);

  const { data: entityResponse, isFetching: isLoading } = useQuery({
    queryKey: [applicationConstants.QUERY_KEY, queryParams],
    queryFn: () => getApplications(queryParams as any),
    enabled: Boolean(queryParams),
  });

  const entityPager = useMemo(() => {
    return entityResponse?.data;
  }, [entityResponse]);

  useEffect(() => {
    if (entityPager) {
      setApplicationCount(entityPager?.meta?.total || 0);
      if (setCurrentPageCount) {
        setCurrentPageCount(entityPager?.data?.length || 0);
      }
    }
  }, [entityPager, setApplicationCount, setCurrentPageCount]);

  const handleDelete = useCallback(async () => {
  if (!primaryKeys || !primaryKeys[applicationConstants.PRIMARY_KEY]) {
    console.error('Cannot delete: Missing primary keys');
    return;
  }
  await deleteEntityMutation.mutateAsync(primaryKeys);
  queryClient.invalidateQueries({ queryKey: [applicationConstants.QUERY_KEY, queryParams], exact: false });
  dispatch(resetSelectedObj(applicationConstants.ENTITY_KEY));
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
    (record: IApplicationIndex) => {
      const id = (record as any)[applicationConstants.PRIMARY_KEY];
      if (!id) {
        console.error('Cannot delete: Missing id');
        return;
      }
      dispatch(
        setForDelete({
          primaryKeys: { [applicationConstants.PRIMARY_KEY]: id },
          label: (record as any)[applicationConstants.LABEL_FIELD] || '',
          objKey: applicationConstants.ENTITY_KEY,
        }),
      );
    },
    [dispatch],
  );

  const handleView = useCallback(
    (record: IApplicationIndex) => {
      const id = (record as any)[applicationConstants.PRIMARY_KEY];
      if (!id) {
        console.error('Cannot view: Missing id');
        return;
      }
      dispatch(
        setForView({
          primaryKeys: { [applicationConstants.PRIMARY_KEY]: id },
          label: (record as any)[applicationConstants.LABEL_FIELD] || '',
          objKey: applicationConstants.ENTITY_KEY,
        }),
      );
    },
    [dispatch],
  );

  const handleEdit = useCallback(
    (record: IApplicationIndex) => {
      const id = (record as any)[applicationConstants.PRIMARY_KEY];
      if (!id) {
        console.error('Cannot edit: Missing id');
        return;
      }
      dispatch(
        setForEdit({
          primaryKeys: { [applicationConstants.PRIMARY_KEY]: id },
          label: (record as any)[applicationConstants.LABEL_FIELD] || '',
          objKey: applicationConstants.ENTITY_KEY,
        }),
      );
    },
    [dispatch],
  );

  const actions: TableAction<IApplicationIndex>[] = useMemo(() => {
    const list: TableAction<IApplicationIndex>[] = [];
    
    list.push({
      key: 'view',
      icon: <Eye className="size-4" />,
      onClick: handleView,
      permission: {
        scope: user?.scope || '',
        module: applicationConstants.PERMISSIONS.MODULE,
        resource: applicationConstants.PERMISSIONS.RESOURCE,
        action: applicationConstants.PERMISSIONS.ACTIONS.VIEW,
      },
    });

    
    list.push({
      key: 'edit',
      icon: <Edit className="size-4" />,
      onClick: handleEdit,
      permission: {
        scope: user?.scope || '',
        module: applicationConstants.PERMISSIONS.MODULE,
        resource: applicationConstants.PERMISSIONS.RESOURCE,
        action: applicationConstants.PERMISSIONS.ACTIONS.EDIT,
      },
    });

    
    list.push({
      key: 'delete',
      icon: <Trash2 className="size-4 text-red-500" />,
      onClick: handleDeleteAction,
      className: 'text-red-500',
      permission: {
        scope: user?.scope || '',
        module: applicationConstants.PERMISSIONS.MODULE,
        resource: applicationConstants.PERMISSIONS.RESOURCE,
        action: applicationConstants.PERMISSIONS.ACTIONS.DELETE,
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
    isConfigModified: Object.keys(applicationTableConfigDefault).some((key) => (applicationTableConfigDefault as any)[key as any] !== (tableConfiguration as any)[key as any]),
    tableConfiguration,
    handleDelete,
    isDeleteLoading: deleteEntityMutation.isPending,
    handleDeleteAction,
    handleEdit,
    handleView,

    user,
    entityName: applicationConstants.ENTITY_NAME,
    entityKey: applicationConstants.ENTITY_KEY,
    tableConfigKey: applicationConstants.TABLE_CONFIG_KEY,
    defaultTableConfig: applicationTableConfigDefault,
    totalCount: entityPager?.meta?.total || 0,
    columns,
    actions,
  };
};

// Export table columns for use in other components
export const applicationTableColumns: TableColumn<IApplicationIndex>[] = [
  { key: 'applicationId', title: 'Application Id', dataIndex: 'applicationId', sortable: false },
			{ key: 'applicantId', title: 'Applicant Id', dataIndex: 'applicantId', sortable: false },
			{ key: 'programId', title: 'Program Id', dataIndex: 'programId', sortable: false },
			{ key: 'applicationDate', title: 'Application Date', dataIndex: 'applicationDate', sortable: false,
                    render: (value) => <span>{formatDate(value, 'DATE_TIME')}</span>
                },
			{ key: 'submissionStatus', title: 'Submission Status', dataIndex: 'submissionStatus', sortable: false },
			{ key: 'applicationFeePaid', title: 'Application Fee Paid', dataIndex: 'applicationFeePaid', sortable: false },
			{ key: 'paymentId', title: 'Payment Id', dataIndex: 'paymentId', sortable: false },
			{ key: 'currentDecisionId', title: 'Current Decision Id', dataIndex: 'currentDecisionId', sortable: false },
			{ key: 'createdAt', title: 'Created At', dataIndex: 'createdAt', sortable: false,
                    render: (value) => <span>{formatDate(value, 'TIMESTAMP')}</span>
                },
			{ key: 'updatedAt', title: 'Updated At', dataIndex: 'updatedAt', sortable: false,
                    render: (value) => <span>{formatDate(value, 'TIMESTAMP')}</span>
                }
];
