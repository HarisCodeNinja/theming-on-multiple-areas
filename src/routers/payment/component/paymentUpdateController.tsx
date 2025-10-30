import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getPaymentEditDetails, updatePayment } from '../service';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { updatePaymentPayloadValidator } from '../validation';
import { IPaymentEdit } from '../interface';
import PaymentUpdateForm from '../form/paymentUpdate';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj } from '@/store/slice/selectedObjSlice';
import Controls from '@/components/Wrapper/controls';
import { FormProvider } from 'react-hook-form';
import { getDefaultFormValues } from '@/util/getFormDefaultFormValues';
import { handleApiFormErrors } from '@/util/handleApiFormErrors';
import PAYMENT_CONSTANTS from '../constants';


const PaymentUpdateDrawer: React.FC = () => {
  const { [PAYMENT_CONSTANTS.ENTITY_KEY]: { showEdit, primaryKeys } = {} } = useAppSelector((state: RootState) => state.selectedObj);
  const dispatch = useAppDispatch();

  const queryClient = useQueryClient();
  const { data: paymentResponse, isLoading: isLoadingPayment } = useQuery({
    queryKey: [PAYMENT_CONSTANTS.QUERY_KEY, primaryKeys, primaryKeys?.paymentId, showEdit],
    queryFn: () => getPaymentEditDetails(primaryKeys?.paymentId || 0),
    enabled: Boolean(showEdit && primaryKeys?.paymentId),
  });


  const updatePaymentMutation = useMutation({
    mutationFn: updatePayment,
  });

  const isLoading = isLoadingPayment || updatePaymentMutation.isPending;
  const form = useForm<IPaymentEdit>({
  resolver: zodResolver(updatePaymentPayloadValidator),
  defaultValues: getDefaultFormValues(updatePaymentPayloadValidator),
  mode: 'onChange',
});

  useEffect(() => {
    if (paymentResponse?.data) {
      form.reset(paymentResponse.data);
    }
  }, [paymentResponse, form]);

  const updateData = React.useCallback(
  async (data: IPaymentEdit) => {
    try {
      await updatePaymentMutation.mutateAsync({ ...data, ...primaryKeys });
      queryClient.invalidateQueries({ queryKey: [PAYMENT_CONSTANTS.QUERY_KEY], exact: false });
      handleCloseDrawer();
    } catch (error) {
      handleApiFormErrors(error, form);
    }
  },
  [updatePaymentMutation, primaryKeys, queryClient, form],
);

  const handleCloseDrawer = React.useCallback(() => {
  form.reset(getDefaultFormValues(updatePaymentPayloadValidator));
  dispatch(resetSelectedObj(PAYMENT_CONSTANTS.ENTITY_KEY));
}, [form, dispatch]);

  return (
    <Controls title={`Edit ${PAYMENT_CONSTANTS.ENTITY_NAME}`} open={showEdit} onClose={handleCloseDrawer} form={form} onSubmit={updateData} type="drawer" width={600} loading={isLoading}>
  <FormProvider {...form}>
    <PaymentUpdateForm />
  </FormProvider>
</Controls>
  );
};

export default PaymentUpdateDrawer;
