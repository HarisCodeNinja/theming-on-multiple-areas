import React, { useEffect, useRef } from 'react';
import GenericTable from '@/components/Table';
import DeleteConfirm from '@/components/DeleteConfirm';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileCardsView from '@/components/MobileCardsView';
import { EnrollmentCard } from './enrollmentCard';
import EnrollmentCreateController from './enrollmentCreateController';
import EnrollmentUpdateController from './enrollmentUpdateController';
import EnrollmentViewController from './enrollmentViewController';
import ENROLLMENT_CONSTANTS from '../constants';
import { useEnrollmentTableConfig } from '../hooks/useEnrollmentTable';
import { IEnrollmentQueryParams, IEnrollmentIndex } from '../interface';
import { Heart } from 'lucide-react';

interface EnrollmentTableProps {
  setEnrollmentCount: React.Dispatch<React.SetStateAction<number | null>>;
  setCurrentPageCount?: React.Dispatch<React.SetStateAction<number>>;
  setCurrentQueryParams?: React.Dispatch<React.SetStateAction<IEnrollmentQueryParams>>;
}

const EnrollmentTable: React.FC<EnrollmentTableProps> = ({ setEnrollmentCount, setCurrentPageCount, setCurrentQueryParams }) => {
  const { actions, columns, visibleColumns, queryParams, ...tableProps } = useEnrollmentTableConfig({
    setEnrollmentCount,
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
        <MobileCardsView<IEnrollmentIndex>
          {...tableProps}
          columns={visibleColumns}
          actions={actions}
          totalCount={tableProps.data.length > 0 ? undefined : 0}
          CardComponent={EnrollmentCard}
          emptyStateIcon={Heart}
          loadingCardVariant="compact"
          getRecordKey={(record, index) => record.enrollmentId || index}
        />
		<EnrollmentCreateController />
		<EnrollmentUpdateController />
		<EnrollmentViewController />
		<DeleteConfirm handleDelete={tableProps.handleDelete} curObjName={ENROLLMENT_CONSTANTS.ENTITY_KEY} isDeleteLoading={tableProps.isDeleteLoading} />
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
	  <EnrollmentCreateController />
	  <EnrollmentUpdateController />
	  <EnrollmentViewController />
	  <DeleteConfirm handleDelete={tableProps.handleDelete} curObjName={ENROLLMENT_CONSTANTS.ENTITY_KEY} isDeleteLoading={tableProps.isDeleteLoading} />
    </>
  );
};

export default EnrollmentTable;