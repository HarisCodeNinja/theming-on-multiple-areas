import React from 'react';
	import { FormProvider, useForm } from 'react-hook-form';
	import { zodResolver } from '@hookform/resolvers/zod';
	import { z } from 'zod';
	import { useMutation, useQueryClient } from '@tanstack/react-query';
	
	import { addEnrollment } from '../service';
	import { createEnrollmentPayloadValidator } from '../validation';
	import { IEnrollmentAdd } from '../interface';
	import { RootState, useAppDispatch, useAppSelector } from '@/store';
	import { resetSelectedObj } from '@/store/slice/selectedObjSlice';
	import { getDefaultFormValues } from '@/util/getFormDefaultFormValues';
	import { handleApiFormErrors } from '@/util/handleApiFormErrors';
	import ENROLLMENT_CONSTANTS from '../constants';
	
	import Controls from '@/components/Wrapper/controls';
	import EnrollmentForm from '../form/enrollmentCreate';

type CreateEnrollmentFormData = z.infer<typeof createEnrollmentPayloadValidator>;

const EnrollmentCreateDrawer: React.FC = () => {
  const { [ENROLLMENT_CONSTANTS.ENTITY_KEY]: { showForm = false } = {} } = useAppSelector((state: RootState) => state.selectedObj);
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const addEnrollmentMutation = useMutation({
    mutationFn: addEnrollment,
  });

  const form = useForm<CreateEnrollmentFormData>({
    resolver: zodResolver(createEnrollmentPayloadValidator),
    defaultValues: getDefaultFormValues(createEnrollmentPayloadValidator),
    mode: 'onChange',
  });

  const handleSubmit = React.useCallback(
    async (data: CreateEnrollmentFormData) => {
      try {
        await addEnrollmentMutation.mutateAsync(data as IEnrollmentAdd);
        queryClient.invalidateQueries({ queryKey: [ENROLLMENT_CONSTANTS.QUERY_KEY], exact: false });
        handleCloseDrawer();
      } catch (error) {
        handleApiFormErrors(error, form);
      }
    },
    [addEnrollmentMutation, queryClient, form],
  );

  const handleCloseDrawer = React.useCallback(() => {
    form.reset(getDefaultFormValues(createEnrollmentPayloadValidator));
    dispatch(resetSelectedObj(ENROLLMENT_CONSTANTS.ENTITY_KEY));
  }, [form, dispatch]);

  React.useEffect(() => {
    if (showForm) {
      form.reset(getDefaultFormValues(createEnrollmentPayloadValidator));
    }
  }, [showForm, form]);

  React.useEffect(() => {
    return () => {
      if (addEnrollmentMutation.isSuccess || addEnrollmentMutation.isError) {
        addEnrollmentMutation.reset();
      }
    };
  }, [addEnrollmentMutation]);

  return (
  <Controls title={`Create ${ENROLLMENT_CONSTANTS.ENTITY_NAME}`} open={showForm} onClose={handleCloseDrawer} form={form} onSubmit={handleSubmit} type="drawer" width={600} loading={addEnrollmentMutation.isPending}>
    <FormProvider {...form}>
      <EnrollmentForm />
    </FormProvider>
  </Controls>
);
};

export default EnrollmentCreateDrawer;
