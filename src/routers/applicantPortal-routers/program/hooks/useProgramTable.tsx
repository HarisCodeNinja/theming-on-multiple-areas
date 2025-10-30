import { useCallback, useEffect, useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { setForDelete, setForEdit, setForView, resetSelectedObj } from '@/store/slice/selectedObjSlice';
import { useInitializeTableConfig } from '@/hooks/useTableActions';
import { useTableOperations } from '@/hooks/useTableOperations';
import { Trash2, Edit, Eye } from 'lucide-react';
import { getApplicantPortalPrograms } from '../service';
import programTableConfigDefault from '../data/programTableConfigDefault';
import { TableAction, TableColumn } from '@/types/table';
import { IProgramIndex, IProgramFilters } from '../interface';
import programConstants from '../constants';
import { formatDate } from '@/util/formatDate';

interface UseProgramTableConfigProps {
  setProgramCount: React.Dispatch<React.SetStateAction<number | null>>;
  setCurrentPageCount?: React.Dispatch<React.SetStateAction<number>>;
  filterKeys?: IProgramFilters;
}

export const useProgramTableConfig = ({ setProgramCount, setCurrentPageCount, filterKeys = {} }: UseProgramTableConfigProps) => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const columns: TableColumn<IProgramIndex>[] = useMemo(
    () => programTableColumns,
    [],
  );

  const tableConfiguration = useAppSelector((state: RootState) => state.tableConfiguration[programConstants.TABLE_CONFIG_KEY] || {});
  const { [programConstants.ENTITY_KEY]: { primaryKeys } = {} } = useAppSelector((state: RootState) => state.selectedObj);
  const { user } = useAppSelector((state: RootState) => state.session);

  const { pager, setPager, queryParams, handleSort, getSortDirection, getSortIndex } = useTableOperations(filterKeys as any, (tableConfiguration as any).multiSort);

  useInitializeTableConfig(programConstants.TABLE_CONFIG_KEY, programTableConfigDefault);

  const { data: entityResponse, isFetching: isLoading } = useQuery({
    queryKey: [programConstants.QUERY_KEY, queryParams],
    queryFn: () => getApplicantPortalPrograms(queryParams as any),
    enabled: Boolean(queryParams),
  });

  const entityPager = useMemo(() => {
    return entityResponse?.data;
  }, [entityResponse]);

  useEffect(() => {
    if (entityPager) {
      setProgramCount(entityPager?.meta?.total || 0);
      if (setCurrentPageCount) {
        setCurrentPageCount(entityPager?.data?.length || 0);
      }
    }
  }, [entityPager, setProgramCount, setCurrentPageCount]);

  const visibleColumns = useMemo(() => {
    return columns.filter((column) => {
      const isVisible = (tableConfiguration as any)[column.key as keyof typeof tableConfiguration];
      return isVisible !== undefined ? isVisible : true;
    });
  }, [columns, tableConfiguration]);

  const totalPages = Math.ceil((entityPager?.meta?.total || 0) / pager.pageSize);
  const showPagination = (entityPager?.meta?.total || 0) > pager.pageSize;

  const handleView = useCallback(
    (record: IProgramIndex) => {
      const id = (record as any)[programConstants.PRIMARY_KEY];
      if (!id) {
        console.error('Cannot view: Missing id');
        return;
      }
      dispatch(
        setForView({
          primaryKeys: { [programConstants.PRIMARY_KEY]: id },
          label: (record as any)[programConstants.LABEL_FIELD] || '',
          objKey: programConstants.ENTITY_KEY,
        }),
      );
    },
    [dispatch],
  );

  const handleEdit = useCallback(
    (record: IProgramIndex) => {
      const id = (record as any)[programConstants.PRIMARY_KEY];
      if (!id) {
        console.error('Cannot edit: Missing id');
        return;
      }
      dispatch(
        setForEdit({
          primaryKeys: { [programConstants.PRIMARY_KEY]: id },
          label: (record as any)[programConstants.LABEL_FIELD] || '',
          objKey: programConstants.ENTITY_KEY,
        }),
      );
    },
    [dispatch],
  );

  const actions: TableAction<IProgramIndex>[] = useMemo(() => {
    const list: TableAction<IProgramIndex>[] = [];
    
    list.push({
      key: 'view',
      icon: <Eye className="size-4" />,
      onClick: handleView,
      permission: {
        scope: user?.scope || '',
        module: programConstants.PERMISSIONS.MODULE,
        resource: programConstants.PERMISSIONS.RESOURCE,
        action: programConstants.PERMISSIONS.ACTIONS.VIEW,
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
    isConfigModified: Object.keys(programTableConfigDefault).some((key) => (programTableConfigDefault as any)[key as any] !== (tableConfiguration as any)[key as any]),
    tableConfiguration,
    handleEdit,
    handleView,

    user,
    entityName: programConstants.ENTITY_NAME,
    entityKey: programConstants.ENTITY_KEY,
    tableConfigKey: programConstants.TABLE_CONFIG_KEY,
    defaultTableConfig: programTableConfigDefault,
    totalCount: entityPager?.meta?.total || 0,
    columns,
    actions,
  };
};

// Export table columns for use in other components
export const programTableColumns: TableColumn<IProgramIndex>[] = [
  { key: 'programId', title: 'Program Id', dataIndex: 'programId', sortable: false },
			{ key: 'programName', title: 'Program Name', dataIndex: 'programName', sortable: false },
			{ key: 'description', title: 'Description', dataIndex: 'description', sortable: false },
			{ key: 'programType', title: 'Program Type', dataIndex: 'programType', sortable: false },
			{ key: 'duration', title: 'Duration', dataIndex: 'duration', sortable: false },
			{ key: 'fee', title: 'Fee', dataIndex: 'fee', sortable: false },
			{ key: 'applicationDeadline', title: 'Application Deadline', dataIndex: 'applicationDeadline', sortable: false,
                    render: (value) => <span>{formatDate(value, 'DATE')}</span>
                },
			{ key: 'isActive', title: 'Is Active', dataIndex: 'isActive', sortable: false },
			{ key: 'createdAt', title: 'Created At', dataIndex: 'createdAt', sortable: false,
                    render: (value) => <span>{formatDate(value, 'TIMESTAMP')}</span>
                },
			{ key: 'updatedAt', title: 'Updated At', dataIndex: 'updatedAt', sortable: false,
                    render: (value) => <span>{formatDate(value, 'TIMESTAMP')}</span>
                }
];
