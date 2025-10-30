import { useCallback, useEffect, useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { setForDelete, setForEdit, setForView, resetSelectedObj } from '@/store/slice/selectedObjSlice';
import { useInitializeTableConfig } from '@/hooks/useTableActions';
import { useTableOperations } from '@/hooks/useTableOperations';
import { Trash2, Edit, Eye } from 'lucide-react';
import { getApplicantPortalCourseOfferings } from '../service';
import courseOfferingTableConfigDefault from '../data/courseOfferingTableConfigDefault';
import { TableAction, TableColumn } from '@/types/table';
import { ICourseOfferingIndex } from '../interface';
import courseOfferingConstants from '../constants';
import { formatDate } from '@/util/formatDate';

interface UseCourseOfferingTableConfigProps {
  setCourseOfferingCount: React.Dispatch<React.SetStateAction<number | null>>;
  setCurrentPageCount?: React.Dispatch<React.SetStateAction<number>>;
  filterKeys?: Record<string, unknown>;
}

export const useCourseOfferingTableConfig = ({ setCourseOfferingCount, setCurrentPageCount, filterKeys = {} }: UseCourseOfferingTableConfigProps) => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const columns: TableColumn<ICourseOfferingIndex>[] = useMemo(
    () => courseOfferingTableColumns,
    [],
  );

  const tableConfiguration = useAppSelector((state: RootState) => state.tableConfiguration[courseOfferingConstants.TABLE_CONFIG_KEY] || {});
  const { [courseOfferingConstants.ENTITY_KEY]: { primaryKeys } = {} } = useAppSelector((state: RootState) => state.selectedObj);
  const { user } = useAppSelector((state: RootState) => state.session);

  const { pager, setPager, queryParams, handleSort, getSortDirection, getSortIndex } = useTableOperations(filterKeys as any, (tableConfiguration as any).multiSort);

  useInitializeTableConfig(courseOfferingConstants.TABLE_CONFIG_KEY, courseOfferingTableConfigDefault);

  const { data: entityResponse, isFetching: isLoading } = useQuery({
    queryKey: [courseOfferingConstants.QUERY_KEY, queryParams],
    queryFn: () => getApplicantPortalCourseOfferings(queryParams as any),
    enabled: Boolean(queryParams),
  });

  const entityPager = useMemo(() => {
    return entityResponse?.data;
  }, [entityResponse]);

  useEffect(() => {
    if (entityPager) {
      setCourseOfferingCount(entityPager?.meta?.total || 0);
      if (setCurrentPageCount) {
        setCurrentPageCount(entityPager?.data?.length || 0);
      }
    }
  }, [entityPager, setCourseOfferingCount, setCurrentPageCount]);

  const visibleColumns = useMemo(() => {
    return columns.filter((column) => {
      const isVisible = (tableConfiguration as any)[column.key as keyof typeof tableConfiguration];
      return isVisible !== undefined ? isVisible : true;
    });
  }, [columns, tableConfiguration]);

  const totalPages = Math.ceil((entityPager?.meta?.total || 0) / pager.pageSize);
  const showPagination = (entityPager?.meta?.total || 0) > pager.pageSize;

  const handleView = useCallback(
    (record: ICourseOfferingIndex) => {
      const id = (record as any)[courseOfferingConstants.PRIMARY_KEY];
      if (!id) {
        console.error('Cannot view: Missing id');
        return;
      }
      dispatch(
        setForView({
          primaryKeys: { [courseOfferingConstants.PRIMARY_KEY]: id },
          label: (record as any)[courseOfferingConstants.LABEL_FIELD] || '',
          objKey: courseOfferingConstants.ENTITY_KEY,
        }),
      );
    },
    [dispatch],
  );

  const handleEdit = useCallback(
    (record: ICourseOfferingIndex) => {
      const id = (record as any)[courseOfferingConstants.PRIMARY_KEY];
      if (!id) {
        console.error('Cannot edit: Missing id');
        return;
      }
      dispatch(
        setForEdit({
          primaryKeys: { [courseOfferingConstants.PRIMARY_KEY]: id },
          label: (record as any)[courseOfferingConstants.LABEL_FIELD] || '',
          objKey: courseOfferingConstants.ENTITY_KEY,
        }),
      );
    },
    [dispatch],
  );

  const actions: TableAction<ICourseOfferingIndex>[] = useMemo(() => {
    const list: TableAction<ICourseOfferingIndex>[] = [];
    
    list.push({
      key: 'view',
      icon: <Eye className="size-4" />,
      onClick: handleView,
      permission: {
        scope: user?.scope || '',
        module: courseOfferingConstants.PERMISSIONS.MODULE,
        resource: courseOfferingConstants.PERMISSIONS.RESOURCE,
        action: courseOfferingConstants.PERMISSIONS.ACTIONS.VIEW,
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
    isConfigModified: Object.keys(courseOfferingTableConfigDefault).some((key) => (courseOfferingTableConfigDefault as any)[key as any] !== (tableConfiguration as any)[key as any]),
    tableConfiguration,
    handleEdit,
    handleView,

    user,
    entityName: courseOfferingConstants.ENTITY_NAME,
    entityKey: courseOfferingConstants.ENTITY_KEY,
    tableConfigKey: courseOfferingConstants.TABLE_CONFIG_KEY,
    defaultTableConfig: courseOfferingTableConfigDefault,
    totalCount: entityPager?.meta?.total || 0,
    columns,
    actions,
  };
};

// Export table columns for use in other components
export const courseOfferingTableColumns: TableColumn<ICourseOfferingIndex>[] = [
  { key: 'courseOfferingId', title: 'Course Offering Id', dataIndex: 'courseOfferingId', sortable: false },
			{ key: 'programId', title: 'Program Id', dataIndex: 'programId', sortable: false },
			{ key: 'courseName', title: 'Course Name', dataIndex: 'courseName', sortable: false },
			{ key: 'description', title: 'Description', dataIndex: 'description', sortable: false },
			{ key: 'startDate', title: 'Start Date', dataIndex: 'startDate', sortable: false,
                    render: (value) => <span>{formatDate(value, 'DATE')}</span>
                },
			{ key: 'endDate', title: 'End Date', dataIndex: 'endDate', sortable: false,
                    render: (value) => <span>{formatDate(value, 'DATE')}</span>
                },
			{ key: 'maxCapacity', title: 'Max Capacity', dataIndex: 'maxCapacity', sortable: false },
			{ key: 'currentEnrollment', title: 'Current Enrollment', dataIndex: 'currentEnrollment', sortable: false },
			{ key: 'isActive', title: 'Is Active', dataIndex: 'isActive', sortable: false },
			{ key: 'createdAt', title: 'Created At', dataIndex: 'createdAt', sortable: false,
                    render: (value) => <span>{formatDate(value, 'TIMESTAMP')}</span>
                },
			{ key: 'updatedAt', title: 'Updated At', dataIndex: 'updatedAt', sortable: false,
                    render: (value) => <span>{formatDate(value, 'TIMESTAMP')}</span>
                }
];
