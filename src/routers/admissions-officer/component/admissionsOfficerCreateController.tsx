import React from 'react';
	import { FormProvider, useForm } from 'react-hook-form';
	import { zodResolver } from '@hookform/resolvers/zod';
	import { z } from 'zod';
	import { useMutation, useQueryClient } from '@tanstack/react-query';
	
	import { addAdmissionsOfficer } from '../service';
	import { createAdmissionsOfficerPayloadValidator } from '../validation';
	import { IAdmissionsOfficerAdd } from '../interface';
	import { RootState, useAppDispatch, useAppSelector } from '@/store';
	import { resetSelectedObj } from '@/store/slice/selectedObjSlice';
	import { getDefaultFormValues } from '@/util/getFormDefaultFormValues';
	import { handleApiFormErrors } from '@/util/handleApiFormErrors';
	import ADMISSIONSOFFICER_CONSTANTS from '../constants';
	
	import Controls from '@/components/Wrapper/controls';
	import AdmissionsOfficerForm from '../form/admissionsOfficerCreate';

type CreateAdmissionsOfficerFormData = z.infer<typeof createAdmissionsOfficerPayloadValidator>;

const AdmissionsOfficerCreateDrawer: React.FC = () => {
  const { [ADMISSIONSOFFICER_CONSTANTS.ENTITY_KEY]: { showForm = false } = {} } = useAppSelector((state: RootState) => state.selectedObj);
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const addAdmissionsOfficerMutation = useMutation({
    mutationFn: addAdmissionsOfficer,
  });

  const form = useForm<CreateAdmissionsOfficerFormData>({
    resolver: zodResolver(createAdmissionsOfficerPayloadValidator),
    defaultValues: getDefaultFormValues(createAdmissionsOfficerPayloadValidator),
    mode: 'onChange',
  });

  const handleSubmit = React.useCallback(
    async (data: CreateAdmissionsOfficerFormData) => {
      try {
        await addAdmissionsOfficerMutation.mutateAsync(data as IAdmissionsOfficerAdd);
        queryClient.invalidateQueries({ queryKey: [ADMISSIONSOFFICER_CONSTANTS.QUERY_KEY], exact: false });
        handleCloseDrawer();
      } catch (error) {
        handleApiFormErrors(error, form);
      }
    },
    [addAdmissionsOfficerMutation, queryClient, form],
  );

  const handleCloseDrawer = React.useCallback(() => {
    form.reset(getDefaultFormValues(createAdmissionsOfficerPayloadValidator));
    dispatch(resetSelectedObj(ADMISSIONSOFFICER_CONSTANTS.ENTITY_KEY));
  }, [form, dispatch]);

  React.useEffect(() => {
    if (showForm) {
      form.reset(getDefaultFormValues(createAdmissionsOfficerPayloadValidator));
    }
  }, [showForm, form]);

  React.useEffect(() => {
    return () => {
      if (addAdmissionsOfficerMutation.isSuccess || addAdmissionsOfficerMutation.isError) {
        addAdmissionsOfficerMutation.reset();
      }
    };
  }, [addAdmissionsOfficerMutation]);

  return (
  <Controls title={`Create ${ADMISSIONSOFFICER_CONSTANTS.ENTITY_NAME}`} open={showForm} onClose={handleCloseDrawer} form={form} onSubmit={handleSubmit} type="drawer" width={600} loading={addAdmissionsOfficerMutation.isPending}>
    <FormProvider {...form}>
      <AdmissionsOfficerForm />
    </FormProvider>
  </Controls>
);
};

export default AdmissionsOfficerCreateDrawer;
