import { useCallback, useEffect, useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { setForDelete, setForEdit, setForView, resetSelectedObj } from '@/store/slice/selectedObjSlice';
import { useInitializeTableConfig } from '@/hooks/useTableActions';
import { useTableOperations } from '@/hooks/useTableOperations';
import { Trash2, Edit, Eye } from 'lucide-react';
import { getApplicants, deleteApplicant } from '../service';
import applicantTableConfigDefault from '../data/applicantTableConfigDefault';
import { TableAction, TableColumn } from '@/types/table';
import { IApplicantIndex } from '../interface';
import applicantConstants from '../constants';
import { formatDate } from '@/util/formatDate';

interface UseApplicantTableConfigProps {
  setApplicantCount: React.Dispatch<React.SetStateAction<number | null>>;
  setCurrentPageCount?: React.Dispatch<React.SetStateAction<number>>;
  filterKeys?: Record<string, unknown>;
}

export const useApplicantTableConfig = ({ setApplicantCount, setCurrentPageCount, filterKeys = {} }: UseApplicantTableConfigProps) => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const columns: TableColumn<IApplicantIndex>[] = useMemo(
    () => applicantTableColumns,
    [],
  );

  const tableConfiguration = useAppSelector((state: RootState) => state.tableConfiguration[applicantConstants.TABLE_CONFIG_KEY] || {});
  const { [applicantConstants.ENTITY_KEY]: { primaryKeys } = {} } = useAppSelector((state: RootState) => state.selectedObj);
  const { user } = useAppSelector((state: RootState) => state.session);

  const deleteEntityMutation = useMutation({
    mutationFn: deleteApplicant || (() => Promise.reject(new Error('Delete function not provided'))),
  });

  const { pager, setPager, queryParams, handleSort, getSortDirection, getSortIndex } = useTableOperations(filterKeys as any, (tableConfiguration as any).multiSort);

  useInitializeTableConfig(applicantConstants.TABLE_CONFIG_KEY, applicantTableConfigDefault);

  const { data: entityResponse, isFetching: isLoading } = useQuery({
    queryKey: [applicantConstants.QUERY_KEY, queryParams],
    queryFn: () => getApplicants(queryParams as any),
    enabled: Boolean(queryParams),
  });

  const entityPager = useMemo(() => {
    return entityResponse?.data;
  }, [entityResponse]);

  useEffect(() => {
    if (entityPager) {
      setApplicantCount(entityPager?.meta?.total || 0);
      if (setCurrentPageCount) {
        setCurrentPageCount(entityPager?.data?.length || 0);
      }
    }
  }, [entityPager, setApplicantCount, setCurrentPageCount]);

  const handleDelete = useCallback(async () => {
  if (!primaryKeys || !primaryKeys[applicantConstants.PRIMARY_KEY]) {
    console.error('Cannot delete: Missing primary keys');
    return;
  }
  await deleteEntityMutation.mutateAsync(primaryKeys);
  queryClient.invalidateQueries({ queryKey: [applicantConstants.QUERY_KEY, queryParams], exact: false });
  dispatch(resetSelectedObj(applicantConstants.ENTITY_KEY));
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
    (record: IApplicantIndex) => {
      const id = (record as any)[applicantConstants.PRIMARY_KEY];
      if (!id) {
        console.error('Cannot delete: Missing id');
        return;
      }
      dispatch(
        setForDelete({
          primaryKeys: { [applicantConstants.PRIMARY_KEY]: id },
          label: (record as any)[applicantConstants.LABEL_FIELD] || '',
          objKey: applicantConstants.ENTITY_KEY,
        }),
      );
    },
    [dispatch],
  );

  const handleView = useCallback(
    (record: IApplicantIndex) => {
      const id = (record as any)[applicantConstants.PRIMARY_KEY];
      if (!id) {
        console.error('Cannot view: Missing id');
        return;
      }
      dispatch(
        setForView({
          primaryKeys: { [applicantConstants.PRIMARY_KEY]: id },
          label: (record as any)[applicantConstants.LABEL_FIELD] || '',
          objKey: applicantConstants.ENTITY_KEY,
        }),
      );
    },
    [dispatch],
  );

  const handleEdit = useCallback(
    (record: IApplicantIndex) => {
      const id = (record as any)[applicantConstants.PRIMARY_KEY];
      if (!id) {
        console.error('Cannot edit: Missing id');
        return;
      }
      dispatch(
        setForEdit({
          primaryKeys: { [applicantConstants.PRIMARY_KEY]: id },
          label: (record as any)[applicantConstants.LABEL_FIELD] || '',
          objKey: applicantConstants.ENTITY_KEY,
        }),
      );
    },
    [dispatch],
  );

  const actions: TableAction<IApplicantIndex>[] = useMemo(() => {
    const list: TableAction<IApplicantIndex>[] = [];
    
    list.push({
      key: 'view',
      icon: <Eye className="size-4" />,
      onClick: handleView,
      permission: {
        scope: user?.scope || '',
        module: applicantConstants.PERMISSIONS.MODULE,
        resource: applicantConstants.PERMISSIONS.RESOURCE,
        action: applicantConstants.PERMISSIONS.ACTIONS.VIEW,
      },
    });

    
    list.push({
      key: 'edit',
      icon: <Edit className="size-4" />,
      onClick: handleEdit,
      permission: {
        scope: user?.scope || '',
        module: applicantConstants.PERMISSIONS.MODULE,
        resource: applicantConstants.PERMISSIONS.RESOURCE,
        action: applicantConstants.PERMISSIONS.ACTIONS.EDIT,
      },
    });

    
    list.push({
      key: 'delete',
      icon: <Trash2 className="size-4 text-red-500" />,
      onClick: handleDeleteAction,
      className: 'text-red-500',
      permission: {
        scope: user?.scope || '',
        module: applicantConstants.PERMISSIONS.MODULE,
        resource: applicantConstants.PERMISSIONS.RESOURCE,
        action: applicantConstants.PERMISSIONS.ACTIONS.DELETE,
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
    isConfigModified: Object.keys(applicantTableConfigDefault).some((key) => (applicantTableConfigDefault as any)[key as any] !== (tableConfiguration as any)[key as any]),
    tableConfiguration,
    handleDelete,
    isDeleteLoading: deleteEntityMutation.isPending,
    handleDeleteAction,
    handleEdit,
    handleView,

    user,
    entityName: applicantConstants.ENTITY_NAME,
    entityKey: applicantConstants.ENTITY_KEY,
    tableConfigKey: applicantConstants.TABLE_CONFIG_KEY,
    defaultTableConfig: applicantTableConfigDefault,
    totalCount: entityPager?.meta?.total || 0,
    columns,
    actions,
  };
};

// Export table columns for use in other components
export const applicantTableColumns: TableColumn<IApplicantIndex>[] = [
  { key: 'applicantId', title: 'Applicant Id', dataIndex: 'applicantId', sortable: false },
			{ key: 'userId', title: 'User Id', dataIndex: 'userId', sortable: false },
			{ key: 'firstName', title: 'First Name', dataIndex: 'firstName', sortable: false },
			{ key: 'lastName', title: 'Last Name', dataIndex: 'lastName', sortable: false },
			{ key: 'dateOfBirth', title: 'Date Of Birth', dataIndex: 'dateOfBirth', sortable: false,
                    render: (value) => <span>{formatDate(value, 'DATE')}</span>
                },
			{ key: 'gender', title: 'Gender', dataIndex: 'gender', sortable: false },
			{ key: 'nationality', title: 'Nationality', dataIndex: 'nationality', sortable: false },
			{ key: 'address', title: 'Address', dataIndex: 'address', sortable: false },
			{ key: 'phoneNumber', title: 'Phone Number', dataIndex: 'phoneNumber', sortable: false },
			{ key: 'status', title: 'Status', dataIndex: 'status', sortable: false },
			{ key: 'createdAt', title: 'Created At', dataIndex: 'createdAt', sortable: false,
                    render: (value) => <span>{formatDate(value, 'TIMESTAMP')}</span>
                },
			{ key: 'updatedAt', title: 'Updated At', dataIndex: 'updatedAt', sortable: false,
                    render: (value) => <span>{formatDate(value, 'TIMESTAMP')}</span>
                }
];
