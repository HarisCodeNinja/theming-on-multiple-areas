import React, { useEffect, useRef } from 'react';
import GenericTable from '@/components/Table';
import DeleteConfirm from '@/components/DeleteConfirm';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileCardsView from '@/components/MobileCardsView';
import { AdmissionsOfficerCard } from './admissionsOfficerCard';
import AdmissionsOfficerCreateController from './admissionsOfficerCreateController';
import AdmissionsOfficerUpdateController from './admissionsOfficerUpdateController';
import AdmissionsOfficerViewController from './admissionsOfficerViewController';
import ADMISSIONSOFFICER_CONSTANTS from '../constants';
import { useAdmissionsOfficerTableConfig } from '../hooks/useAdmissionsOfficerTable';
import { IAdmissionsOfficerQueryParams, IAdmissionsOfficerIndex } from '../interface';
import { Heart } from 'lucide-react';

interface AdmissionsOfficerTableProps {
  setAdmissionsOfficerCount: React.Dispatch<React.SetStateAction<number | null>>;
  setCurrentPageCount?: React.Dispatch<React.SetStateAction<number>>;
  setCurrentQueryParams?: React.Dispatch<React.SetStateAction<IAdmissionsOfficerQueryParams>>;
}

const AdmissionsOfficerTable: React.FC<AdmissionsOfficerTableProps> = ({ setAdmissionsOfficerCount, setCurrentPageCount, setCurrentQueryParams }) => {
  const { actions, columns, visibleColumns, queryParams, ...tableProps } = useAdmissionsOfficerTableConfig({
    setAdmissionsOfficerCount,
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
        <MobileCardsView<IAdmissionsOfficerIndex>
          {...tableProps}
          columns={visibleColumns}
          actions={actions}
          totalCount={tableProps.data.length > 0 ? undefined : 0}
          CardComponent={AdmissionsOfficerCard}
          emptyStateIcon={Heart}
          loadingCardVariant="compact"
          getRecordKey={(record, index) => record.admissionsOfficerId || index}
        />
		<AdmissionsOfficerCreateController />
		<AdmissionsOfficerUpdateController />
		<AdmissionsOfficerViewController />
		<DeleteConfirm handleDelete={tableProps.handleDelete} curObjName={ADMISSIONSOFFICER_CONSTANTS.ENTITY_KEY} isDeleteLoading={tableProps.isDeleteLoading} />
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
	  <AdmissionsOfficerCreateController />
	  <AdmissionsOfficerUpdateController />
	  <AdmissionsOfficerViewController />
	  <DeleteConfirm handleDelete={tableProps.handleDelete} curObjName={ADMISSIONSOFFICER_CONSTANTS.ENTITY_KEY} isDeleteLoading={tableProps.isDeleteLoading} />
    </>
  );
};

export default AdmissionsOfficerTable;