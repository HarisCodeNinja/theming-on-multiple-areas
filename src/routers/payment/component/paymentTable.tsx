import React, { useEffect, useRef } from 'react';
import GenericTable from '@/components/Table';
import DeleteConfirm from '@/components/DeleteConfirm';
import { useIsMobile } from '@/hooks/use-mobile';
import MobileCardsView from '@/components/MobileCardsView';
import { PaymentCard } from './paymentCard';
import PaymentCreateController from './paymentCreateController';
import PaymentUpdateController from './paymentUpdateController';
import PaymentViewController from './paymentViewController';
import PAYMENT_CONSTANTS from '../constants';
import { usePaymentTableConfig } from '../hooks/usePaymentTable';
import { IPaymentQueryParams, IPaymentIndex } from '../interface';
import { Heart } from 'lucide-react';

interface PaymentTableProps {
  setPaymentCount: React.Dispatch<React.SetStateAction<number | null>>;
  setCurrentPageCount?: React.Dispatch<React.SetStateAction<number>>;
  setCurrentQueryParams?: React.Dispatch<React.SetStateAction<IPaymentQueryParams>>;
}

const PaymentTable: React.FC<PaymentTableProps> = ({ setPaymentCount, setCurrentPageCount, setCurrentQueryParams }) => {
  const { actions, columns, visibleColumns, queryParams, ...tableProps } = usePaymentTableConfig({
    setPaymentCount,
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
        <MobileCardsView<IPaymentIndex>
          {...tableProps}
          columns={visibleColumns}
          actions={actions}
          totalCount={tableProps.data.length > 0 ? undefined : 0}
          CardComponent={PaymentCard}
          emptyStateIcon={Heart}
          loadingCardVariant="compact"
          getRecordKey={(record, index) => record.paymentId || index}
        />
		<PaymentCreateController />
		<PaymentUpdateController />
		<PaymentViewController />
		<DeleteConfirm handleDelete={tableProps.handleDelete} curObjName={PAYMENT_CONSTANTS.ENTITY_KEY} isDeleteLoading={tableProps.isDeleteLoading} />
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
	  <PaymentCreateController />
	  <PaymentUpdateController />
	  <PaymentViewController />
	  <DeleteConfirm handleDelete={tableProps.handleDelete} curObjName={PAYMENT_CONSTANTS.ENTITY_KEY} isDeleteLoading={tableProps.isDeleteLoading} />
    </>
  );
};

export default PaymentTable;