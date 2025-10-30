import React, { useEffect, useRef } from 'react';
import GenericTable from '@/components/Table';
import DeleteConfirm from '@/components/DeleteConfirm';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileCardsView from '@/components/MobileCardsView';
import { CourseOfferingCard } from './courseOfferingCard';


import CourseOfferingViewController from './courseOfferingViewController';
import COURSEOFFERING_CONSTANTS from '../constants';
import { useCourseOfferingTableConfig } from '../hooks/useCourseOfferingTable';
import { ICourseOfferingQueryParams, ICourseOfferingIndex } from '../interface';
import { Heart } from 'lucide-react';

interface CourseOfferingTableProps {
  setCourseOfferingCount: React.Dispatch<React.SetStateAction<number | null>>;
  setCurrentPageCount?: React.Dispatch<React.SetStateAction<number>>;
  setCurrentQueryParams?: React.Dispatch<React.SetStateAction<ICourseOfferingQueryParams>>;
}

const CourseOfferingTable: React.FC<CourseOfferingTableProps> = ({ setCourseOfferingCount, setCurrentPageCount, setCurrentQueryParams }) => {
  const { actions, columns, visibleColumns, queryParams, ...tableProps } = useCourseOfferingTableConfig({
    setCourseOfferingCount,
    setCurrentPageCount,
  });
  const isMobile = useIsMobile();
  const prevQueryParamsRef = useRef<string>(null);

  useEffect(() => {
    if (!setCurrentQueryParams) return;

    const queryParamsStr = JSON.stringify(queryParams);
    if (prevQueryParamsRef.current !== queryParamsStr) {
      prevQueryParamsRef.current = queryParamsStr;
      setCurrentQueryParams(queryParams);
    }
  }, [queryParams, setCurrentQueryParams]);

  if (isMobile) {
    return (
      <>
        <MobileCardsView<ICourseOfferingIndex>
          {...tableProps}
          columns={visibleColumns}
          actions={actions}
          totalCount={tableProps.data.length > 0 ? undefined : 0}
          CardComponent={CourseOfferingCard}
          emptyStateIcon={Heart}
          loadingCardVariant="compact"
          getRecordKey={(record, index) => record.courseOfferingId || index}
        />
		
		
		<CourseOfferingViewController />
		
      </>
    );
  }

  return (
    <>
      <GenericTable
        {...tableProps}
        columns={visibleColumns}
        actions={actions}
        totalCount={tableProps.data.length > 0 ? undefined : 0}
      />
	  
	  
	  <CourseOfferingViewController />
	  
    </>
  );
};

export default CourseOfferingTable;