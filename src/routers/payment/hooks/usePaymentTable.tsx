import { useCallback, useEffect, useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { setForDelete, setForEdit, setForView, resetSelectedObj } from '@/store/slice/selectedObjSlice';
import { useInitializeTableConfig } from '@/hooks/useTableActions';
import { useTableOperations } from '@/hooks/useTableOperations';
import { Trash2, Edit, Eye } from 'lucide-react';
import { getPayments, deletePayment } from '../service';
import paymentTableConfigDefault from '../data/paymentTableConfigDefault';
import { TableAction, TableColumn } from '@/types/table';
import { IPaymentIndex } from '../interface';
import paymentConstants from '../constants';
import { formatDate } from '@/util/formatDate';

interface UsePaymentTableConfigProps {
  setPaymentCount: React.Dispatch<React.SetStateAction<number | null>>;
  setCurrentPageCount?: React.Dispatch<React.SetStateAction<number>>;
  filterKeys?: Record<string, unknown>;
}

export const usePaymentTableConfig = ({ setPaymentCount, setCurrentPageCount, filterKeys = {} }: UsePaymentTableConfigProps) => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const columns: TableColumn<IPaymentIndex>[] = useMemo(
    () => paymentTableColumns,
    [],
  );

  const tableConfiguration = useAppSelector((state: RootState) => state.tableConfiguration[paymentConstants.TABLE_CONFIG_KEY] || {});
  const { [paymentConstants.ENTITY_KEY]: { primaryKeys } = {} } = useAppSelector((state: RootState) => state.selectedObj);
  const { user } = useAppSelector((state: RootState) => state.session);

  const deleteEntityMutation = useMutation({
    mutationFn: deletePayment || (() => Promise.reject(new Error('Delete function not provided'))),
  });

  const { pager, setPager, queryParams, handleSort, getSortDirection, getSortIndex } = useTableOperations(filterKeys as any, (tableConfiguration as any).multiSort);

  useInitializeTableConfig(paymentConstants.TABLE_CONFIG_KEY, paymentTableConfigDefault);

  const { data: entityResponse, isFetching: isLoading } = useQuery({
    queryKey: [paymentConstants.QUERY_KEY, queryParams],
    queryFn: () => getPayments(queryParams as any),
    enabled: Boolean(queryParams),
  });

  const entityPager = useMemo(() => {
    return entityResponse?.data;
  }, [entityResponse]);

  useEffect(() => {
    if (entityPager) {
      setPaymentCount(entityPager?.meta?.total || 0);
      if (setCurrentPageCount) {
        setCurrentPageCount(entityPager?.data?.length || 0);
      }
    }
  }, [entityPager, setPaymentCount, setCurrentPageCount]);

  const handleDelete = useCallback(async () => {
  if (!primaryKeys || !primaryKeys[paymentConstants.PRIMARY_KEY]) {
    console.error('Cannot delete: Missing primary keys');
    return;
  }
  await deleteEntityMutation.mutateAsync(primaryKeys);
  queryClient.invalidateQueries({ queryKey: [paymentConstants.QUERY_KEY, queryParams], exact: false });
  dispatch(resetSelectedObj(paymentConstants.ENTITY_KEY));
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
    (record: IPaymentIndex) => {
      const id = (record as any)[paymentConstants.PRIMARY_KEY];
      if (!id) {
        console.error('Cannot delete: Missing id');
        return;
      }
      dispatch(
        setForDelete({
          primaryKeys: { [paymentConstants.PRIMARY_KEY]: id },
          label: (record as any)[paymentConstants.LABEL_FIELD] || '',
          objKey: paymentConstants.ENTITY_KEY,
        }),
      );
    },
    [dispatch],
  );

  const handleView = useCallback(
    (record: IPaymentIndex) => {
      const id = (record as any)[paymentConstants.PRIMARY_KEY];
      if (!id) {
        console.error('Cannot view: Missing id');
        return;
      }
      dispatch(
        setForView({
          primaryKeys: { [paymentConstants.PRIMARY_KEY]: id },
          label: (record as any)[paymentConstants.LABEL_FIELD] || '',
          objKey: paymentConstants.ENTITY_KEY,
        }),
      );
    },
    [dispatch],
  );

  const handleEdit = useCallback(
    (record: IPaymentIndex) => {
      const id = (record as any)[paymentConstants.PRIMARY_KEY];
      if (!id) {
        console.error('Cannot edit: Missing id');
        return;
      }
      dispatch(
        setForEdit({
          primaryKeys: { [paymentConstants.PRIMARY_KEY]: id },
          label: (record as any)[paymentConstants.LABEL_FIELD] || '',
          objKey: paymentConstants.ENTITY_KEY,
        }),
      );
    },
    [dispatch],
  );

  const actions: TableAction<IPaymentIndex>[] = useMemo(() => {
    const list: TableAction<IPaymentIndex>[] = [];
    
    list.push({
      key: 'view',
      icon: <Eye className="size-4" />,
      onClick: handleView,
      permission: {
        scope: user?.scope || '',
        module: paymentConstants.PERMISSIONS.MODULE,
        resource: paymentConstants.PERMISSIONS.RESOURCE,
        action: paymentConstants.PERMISSIONS.ACTIONS.VIEW,
      },
    });

    
    list.push({
      key: 'edit',
      icon: <Edit className="size-4" />,
      onClick: handleEdit,
      permission: {
        scope: user?.scope || '',
        module: paymentConstants.PERMISSIONS.MODULE,
        resource: paymentConstants.PERMISSIONS.RESOURCE,
        action: paymentConstants.PERMISSIONS.ACTIONS.EDIT,
      },
    });

    
    list.push({
      key: 'delete',
      icon: <Trash2 className="size-4 text-red-500" />,
      onClick: handleDeleteAction,
      className: 'text-red-500',
      permission: {
        scope: user?.scope || '',
        module: paymentConstants.PERMISSIONS.MODULE,
        resource: paymentConstants.PERMISSIONS.RESOURCE,
        action: paymentConstants.PERMISSIONS.ACTIONS.DELETE,
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
    isConfigModified: Object.keys(paymentTableConfigDefault).some((key) => (paymentTableConfigDefault as any)[key as any] !== (tableConfiguration as any)[key as any]),
    tableConfiguration,
    handleDelete,
    isDeleteLoading: deleteEntityMutation.isPending,
    handleDeleteAction,
    handleEdit,
    handleView,

    user,
    entityName: paymentConstants.ENTITY_NAME,
    entityKey: paymentConstants.ENTITY_KEY,
    tableConfigKey: paymentConstants.TABLE_CONFIG_KEY,
    defaultTableConfig: paymentTableConfigDefault,
    totalCount: entityPager?.meta?.total || 0,
    columns,
    actions,
  };
};

// Export table columns for use in other components
export const paymentTableColumns: TableColumn<IPaymentIndex>[] = [
  { key: 'paymentId', title: 'Payment Id', dataIndex: 'paymentId', sortable: false },
			{ key: 'applicationId', title: 'Application Id', dataIndex: 'applicationId', sortable: false },
			{ key: 'amount', title: 'Amount', dataIndex: 'amount', sortable: false },
			{ key: 'paymentDate', title: 'Payment Date', dataIndex: 'paymentDate', sortable: false,
                    render: (value) => <span>{formatDate(value, 'DATE_TIME')}</span>
                },
			{ key: 'transactionId', title: 'Transaction Id', dataIndex: 'transactionId', sortable: false },
			{ key: 'paymentMethod', title: 'Payment Method', dataIndex: 'paymentMethod', sortable: false },
			{ key: 'status', title: 'Status', dataIndex: 'status', sortable: false },
			{ key: 'createdAt', title: 'Created At', dataIndex: 'createdAt', sortable: false,
                    render: (value) => <span>{formatDate(value, 'TIMESTAMP')}</span>
                },
			{ key: 'updatedAt', title: 'Updated At', dataIndex: 'updatedAt', sortable: false,
                    render: (value) => <span>{formatDate(value, 'TIMESTAMP')}</span>
                }
];
