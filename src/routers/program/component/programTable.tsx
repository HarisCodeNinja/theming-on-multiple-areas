import React, { useEffect, useRef } from 'react';
import GenericTable from '@/components/Table';
import DeleteConfirm from '@/components/DeleteConfirm';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileCardsView from '@/components/MobileCardsView';
import { ProgramCard } from './programCard';
import ProgramCreateController from './programCreateController';
import ProgramUpdateController from './programUpdateController';
import ProgramViewController from './programViewController';
import PROGRAM_CONSTANTS from '../constants';
import { useProgramTableConfig } from '../hooks/useProgramTable';
import { IProgramQueryParams, IProgramIndex, IProgramFilters } from '../interface';
import { Heart } from 'lucide-react';

interface ProgramTableProps {
  setProgramCount: React.Dispatch<React.SetStateAction<number | null>>;
  setCurrentPageCount?: React.Dispatch<React.SetStateAction<number>>;
  setCurrentQueryParams?: React.Dispatch<React.SetStateAction<IProgramQueryParams>>;
  filterKeys?: IProgramFilters;
}

const ProgramTable: React.FC<ProgramTableProps> = ({ setProgramCount, setCurrentPageCount, setCurrentQueryParams, filterKeys }) => {
  const { actions, columns, visibleColumns, queryParams, ...tableProps } = useProgramTableConfig({
    setProgramCount,
    setCurrentPageCount,
    filterKeys: filterKeys,
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
        <MobileCardsView<IProgramIndex>
          {...tableProps}
          columns={visibleColumns}
          actions={actions}
          totalCount={tableProps.data.length > 0 ? undefined : 0}
          CardComponent={ProgramCard}
          emptyStateIcon={Heart}
          loadingCardVariant="compact"
          getRecordKey={(record, index) => record.programId || index}
        />
		<ProgramCreateController />
		<ProgramUpdateController />
		<ProgramViewController />
		<DeleteConfirm handleDelete={tableProps.handleDelete} curObjName={PROGRAM_CONSTANTS.ENTITY_KEY} isDeleteLoading={tableProps.isDeleteLoading} />
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
	  <ProgramCreateController />
	  <ProgramUpdateController />
	  <ProgramViewController />
	  <DeleteConfirm handleDelete={tableProps.handleDelete} curObjName={PROGRAM_CONSTANTS.ENTITY_KEY} isDeleteLoading={tableProps.isDeleteLoading} />
    </>
  );
};

export default ProgramTable;