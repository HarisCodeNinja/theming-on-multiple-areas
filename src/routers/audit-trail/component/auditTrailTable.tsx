import React, { useEffect, useRef } from 'react';
import GenericTable from '@/components/Table';
import DeleteConfirm from '@/components/DeleteConfirm';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileCardsView from '@/components/MobileCardsView';
import { AuditTrailCard } from './auditTrailCard';


import AuditTrailViewController from './auditTrailViewController';
import AUDITTRAIL_CONSTANTS from '../constants';
import { useAuditTrailTableConfig } from '../hooks/useAuditTrailTable';
import { IAuditTrailQueryParams, IAuditTrailIndex } from '../interface';
import { Heart } from 'lucide-react';

interface AuditTrailTableProps {
  setAuditTrailCount: React.Dispatch<React.SetStateAction<number | null>>;
  setCurrentPageCount?: React.Dispatch<React.SetStateAction<number>>;
  setCurrentQueryParams?: React.Dispatch<React.SetStateAction<IAuditTrailQueryParams>>;
}

const AuditTrailTable: React.FC<AuditTrailTableProps> = ({ setAuditTrailCount, setCurrentPageCount, setCurrentQueryParams }) => {
  const { actions, columns, visibleColumns, queryParams, ...tableProps } = useAuditTrailTableConfig({
    setAuditTrailCount,
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
        <MobileCardsView<IAuditTrailIndex>
          {...tableProps}
          columns={visibleColumns}
          actions={actions}
          totalCount={tableProps.data.length > 0 ? undefined : 0}
          CardComponent={AuditTrailCard}
          emptyStateIcon={Heart}
          loadingCardVariant="compact"
          getRecordKey={(record, index) => record.auditId || index}
        />
		
		
		<AuditTrailViewController />
		
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
	  
	  
	  <AuditTrailViewController />
	  
    </>
  );
};

export default AuditTrailTable;