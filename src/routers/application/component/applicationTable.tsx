import React, { useEffect, useRef } from 'react';
import GenericTable from '@/components/Table';
import DeleteConfirm from '@/components/DeleteConfirm';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileCardsView from '@/components/MobileCardsView';
import { ApplicationCard } from './applicationCard';
import ApplicationCreateController from './applicationCreateController';
import ApplicationUpdateController from './applicationUpdateController';
import ApplicationViewController from './applicationViewController';
import APPLICATION_CONSTANTS from '../constants';
import { useApplicationTableConfig } from '../hooks/useApplicationTable';
import { IApplicationQueryParams, IApplicationIndex } from '../interface';
import { Heart } from 'lucide-react';

interface ApplicationTableProps {
  setApplicationCount: React.Dispatch<React.SetStateAction<number | null>>;
  setCurrentPageCount?: React.Dispatch<React.SetStateAction<number>>;
  setCurrentQueryParams?: React.Dispatch<React.SetStateAction<IApplicationQueryParams>>;
}

const ApplicationTable: React.FC<ApplicationTableProps> = ({ setApplicationCount, setCurrentPageCount, setCurrentQueryParams }) => {
  const { actions, columns, visibleColumns, queryParams, ...tableProps } = useApplicationTableConfig({
    setApplicationCount,
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
        <MobileCardsView<IApplicationIndex>
          {...tableProps}
          columns={visibleColumns}
          actions={actions}
          totalCount={tableProps.data.length > 0 ? undefined : 0}
          CardComponent={ApplicationCard}
          emptyStateIcon={Heart}
          loadingCardVariant="compact"
          getRecordKey={(record, index) => record.applicationId || index}
        />
		<ApplicationCreateController />
		<ApplicationUpdateController />
		<ApplicationViewController />
		<DeleteConfirm handleDelete={tableProps.handleDelete} curObjName={APPLICATION_CONSTANTS.ENTITY_KEY} isDeleteLoading={tableProps.isDeleteLoading} />
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
	  <ApplicationCreateController />
	  <ApplicationUpdateController />
	  <ApplicationViewController />
	  <DeleteConfirm handleDelete={tableProps.handleDelete} curObjName={APPLICATION_CONSTANTS.ENTITY_KEY} isDeleteLoading={tableProps.isDeleteLoading} />
    </>
  );
};

export default ApplicationTable;