import React, { useEffect, useRef } from 'react';
import GenericTable from '@/components/Table';
import DeleteConfirm from '@/components/DeleteConfirm';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileCardsView from '@/components/MobileCardsView';
import { ApplicantCard } from './applicantCard';
import ApplicantCreateController from './applicantCreateController';
import ApplicantUpdateController from './applicantUpdateController';
import ApplicantViewController from './applicantViewController';
import APPLICANT_CONSTANTS from '../constants';
import { useApplicantTableConfig } from '../hooks/useApplicantTable';
import { IApplicantQueryParams, IApplicantIndex } from '../interface';
import { Heart } from 'lucide-react';

interface ApplicantTableProps {
  setApplicantCount: React.Dispatch<React.SetStateAction<number | null>>;
  setCurrentPageCount?: React.Dispatch<React.SetStateAction<number>>;
  setCurrentQueryParams?: React.Dispatch<React.SetStateAction<IApplicantQueryParams>>;
}

const ApplicantTable: React.FC<ApplicantTableProps> = ({ setApplicantCount, setCurrentPageCount, setCurrentQueryParams }) => {
  const { actions, columns, visibleColumns, queryParams, ...tableProps } = useApplicantTableConfig({
    setApplicantCount,
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
        <MobileCardsView<IApplicantIndex>
          {...tableProps}
          columns={visibleColumns}
          actions={actions}
          totalCount={tableProps.data.length > 0 ? undefined : 0}
          CardComponent={ApplicantCard}
          emptyStateIcon={Heart}
          loadingCardVariant="compact"
          getRecordKey={(record, index) => record.applicantId || index}
        />
		<ApplicantCreateController />
		<ApplicantUpdateController />
		<ApplicantViewController />
		<DeleteConfirm handleDelete={tableProps.handleDelete} curObjName={APPLICANT_CONSTANTS.ENTITY_KEY} isDeleteLoading={tableProps.isDeleteLoading} />
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
	  <ApplicantCreateController />
	  <ApplicantUpdateController />
	  <ApplicantViewController />
	  <DeleteConfirm handleDelete={tableProps.handleDelete} curObjName={APPLICANT_CONSTANTS.ENTITY_KEY} isDeleteLoading={tableProps.isDeleteLoading} />
    </>
  );
};

export default ApplicantTable;