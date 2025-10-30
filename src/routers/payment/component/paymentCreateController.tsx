import React from 'react';
	import { FormProvider, useForm } from 'react-hook-form';
	import { zodResolver } from '@hookform/resolvers/zod';
	import { z } from 'zod';
	import { useMutation, useQueryClient } from '@tanstack/react-query';
	
	import { addPayment } from '../service';
	import { createPaymentPayloadValidator } from '../validation';
	import { IPaymentAdd } from '../interface';
	import { RootState, useAppDispatch, useAppSelector } from '@/store';
	import { resetSelectedObj } from '@/store/slice/selectedObjSlice';
	import { getDefaultFormValues } from '@/util/getFormDefaultFormValues';
	import { handleApiFormErrors } from '@/util/handleApiFormErrors';
	import PAYMENT_CONSTANTS from '../constants';
	
	import Controls from '@/components/Wrapper/controls';
	import PaymentForm from '../form/paymentCreate';

type CreatePaymentFormData = z.infer<typeof createPaymentPayloadValidator>;

const PaymentCreateDrawer: React.FC = () => {
  const { [PAYMENT_CONSTANTS.ENTITY_KEY]: { showForm = false } = {} } = useAppSelector((state: RootState) => state.selectedObj);
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const addPaymentMutation = useMutation({
    mutationFn: addPayment,
  });

  const form = useForm<CreatePaymentFormData>({
    resolver: zodResolver(createPaymentPayloadValidator),
    defaultValues: getDefaultFormValues(createPaymentPayloadValidator),
    mode: 'onChange',
  });

  const handleSubmit = React.useCallback(
    async (data: CreatePaymentFormData) => {
      try {
        await addPaymentMutation.mutateAsync(data as IPaymentAdd);
        queryClient.invalidateQueries({ queryKey: [PAYMENT_CONSTANTS.QUERY_KEY], exact: false });
        handleCloseDrawer();
      } catch (error) {
        handleApiFormErrors(error, form);
      }
    },
    [addPaymentMutation, queryClient, form],
  );

  const handleCloseDrawer = React.useCallback(() => {
    form.reset(getDefaultFormValues(createPaymentPayloadValidator));
    dispatch(resetSelectedObj(PAYMENT_CONSTANTS.ENTITY_KEY));
  }, [form, dispatch]);

  React.useEffect(() => {
    if (showForm) {
      form.reset(getDefaultFormValues(createPaymentPayloadValidator));
    }
  }, [showForm, form]);

  React.useEffect(() => {
    return () => {
      if (addPaymentMutation.isSuccess || addPaymentMutation.isError) {
        addPaymentMutation.reset();
      }
    };
  }, [addPaymentMutation]);

  return (
  <Controls title={`Create ${PAYMENT_CONSTANTS.ENTITY_NAME}`} open={showForm} onClose={handleCloseDrawer} form={form} onSubmit={handleSubmit} type="drawer" width={600} loading={addPaymentMutation.isPending}>
    <FormProvider {...form}>
      <PaymentForm />
    </FormProvider>
  </Controls>
);
};

export default PaymentCreateDrawer;
