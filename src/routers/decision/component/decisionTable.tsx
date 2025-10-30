import React, { useEffect, useRef } from 'react';
import GenericTable from '@/components/Table';
import DeleteConfirm from '@/components/DeleteConfirm';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileCardsView from '@/components/MobileCardsView';
import { DecisionCard } from './decisionCard';
import DecisionCreateController from './decisionCreateController';
import DecisionUpdateController from './decisionUpdateController';
import DecisionViewController from './decisionViewController';
import DECISION_CONSTANTS from '../constants';
import { useDecisionTableConfig } from '../hooks/useDecisionTable';
import { IDecisionQueryParams, IDecisionIndex } from '../interface';
import { Heart } from 'lucide-react';

interface DecisionTableProps {
  setDecisionCount: React.Dispatch<React.SetStateAction<number | null>>;
  setCurrentPageCount?: React.Dispatch<React.SetStateAction<number>>;
  setCurrentQueryParams?: React.Dispatch<React.SetStateAction<IDecisionQueryParams>>;
}

const DecisionTable: React.FC<DecisionTableProps> = ({ setDecisionCount, setCurrentPageCount, setCurrentQueryParams }) => {
  const { actions, columns, visibleColumns, queryParams, ...tableProps } = useDecisionTableConfig({
    setDecisionCount,
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
        <MobileCardsView<IDecisionIndex>
          {...tableProps}
          columns={visibleColumns}
          actions={actions}
          totalCount={tableProps.data.length > 0 ? undefined : 0}
          CardComponent={DecisionCard}
          emptyStateIcon={Heart}
          loadingCardVariant="compact"
          getRecordKey={(record, index) => record.decisionId || index}
        />
		<DecisionCreateController />
		<DecisionUpdateController />
		<DecisionViewController />
		<DeleteConfirm handleDelete={tableProps.handleDelete} curObjName={DECISION_CONSTANTS.ENTITY_KEY} isDeleteLoading={tableProps.isDeleteLoading} />
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
	  <DecisionCreateController />
	  <DecisionUpdateController />
	  <DecisionViewController />
	  <DeleteConfirm handleDelete={tableProps.handleDelete} curObjName={DECISION_CONSTANTS.ENTITY_KEY} isDeleteLoading={tableProps.isDeleteLoading} />
    </>
  );
};

export default DecisionTable;