import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj } from '@/store/slice/selectedObjSlice';
import Controls from '@/components/Wrapper/controls';
import { Spinner } from '@/components/ui/spinner';
import { Label } from '@/components/ui';
import { getPaymentDetails } from '../service';
import PAYMENT_CONSTANTS from '../constants';

interface ViewProps {}

const PaymentViewController: React.FC<ViewProps> = ({}) => {
  const { [PAYMENT_CONSTANTS.ENTITY_KEY]: { showView, primaryKeys } = {} } = useAppSelector((state: RootState) => state.selectedObj);
  const dispatch = useAppDispatch();

  const { data: payment, isLoading } = useQuery({
    queryKey: [PAYMENT_CONSTANTS.QUERY_KEY, primaryKeys, primaryKeys?.paymentId, showView],
    queryFn: () => getPaymentDetails(primaryKeys?.paymentId || 0),
    enabled: Boolean(showView && primaryKeys?.paymentId),
  });

  const handleClose = React.useCallback(() => {
    dispatch(resetSelectedObj(PAYMENT_CONSTANTS.ENTITY_KEY));
  }, [dispatch]);

  const Content = () => (
    <>
      {isLoading && (
        <div className="flex items-center justify-center py-10 h-1/2">
          <Spinner />
        </div>
      )}
      {!isLoading && payment && (
        <div className="grid grid-cols-1 gap-6 items-start">
        <div className="space-y-2">
          <Label>Payment Id</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{payment?.data?.paymentId ?? '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Application Id</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{payment?.data?.applicationId ?? '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Amount</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{payment?.data?.amount ?? '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Payment Date</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{payment?.data?.paymentDate ? new Date(payment?.data?.paymentDate).toLocaleDateString() : '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Transaction Id</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{payment?.data?.transactionId ?? '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Payment Method</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{payment?.data?.paymentMethod ?? '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Status</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{payment?.data?.status ?? '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Created At</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{payment?.data?.createdAt ? new Date(payment?.data?.createdAt).toLocaleDateString() : '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Updated At</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{payment?.data?.updatedAt ? new Date(payment?.data?.updatedAt).toLocaleDateString() : '-'}</div>
        </div>
        </div>
      )}
    </>
  );

  return (
    <Controls
      title={`${PAYMENT_CONSTANTS.ENTITY_NAME} Details`}
      open={showView}
      onClose={handleClose}
      type="modal"
      width={800}
      loading={isLoading}
    >
      <Content />
    </Controls>
  );
};

export default PaymentViewController;