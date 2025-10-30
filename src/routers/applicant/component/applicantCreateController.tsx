import React from 'react';
	import { FormProvider, useForm } from 'react-hook-form';
	import { zodResolver } from '@hookform/resolvers/zod';
	import { z } from 'zod';
	import { useMutation, useQueryClient } from '@tanstack/react-query';
	
	import { addApplicant } from '../service';
	import { createApplicantPayloadValidator } from '../validation';
	import { IApplicantAdd } from '../interface';
	import { RootState, useAppDispatch, useAppSelector } from '@/store';
	import { resetSelectedObj } from '@/store/slice/selectedObjSlice';
	import { getDefaultFormValues } from '@/util/getFormDefaultFormValues';
	import { handleApiFormErrors } from '@/util/handleApiFormErrors';
	import APPLICANT_CONSTANTS from '../constants';
	
	import Controls from '@/components/Wrapper/controls';
	import ApplicantForm from '../form/applicantCreate';

type CreateApplicantFormData = z.infer<typeof createApplicantPayloadValidator>;

const ApplicantCreateDrawer: React.FC = () => {
  const { [APPLICANT_CONSTANTS.ENTITY_KEY]: { showForm = false } = {} } = useAppSelector((state: RootState) => state.selectedObj);
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const addApplicantMutation = useMutation({
    mutationFn: addApplicant,
  });

  const form = useForm<CreateApplicantFormData>({
    resolver: zodResolver(createApplicantPayloadValidator),
    defaultValues: getDefaultFormValues(createApplicantPayloadValidator),
    mode: 'onChange',
  });

  const handleSubmit = React.useCallback(
    async (data: CreateApplicantFormData) => {
      try {
        await addApplicantMutation.mutateAsync(data as IApplicantAdd);
        queryClient.invalidateQueries({ queryKey: [APPLICANT_CONSTANTS.QUERY_KEY], exact: false });
        handleCloseDrawer();
      } catch (error) {
        handleApiFormErrors(error, form);
      }
    },
    [addApplicantMutation, queryClient, form],
  );

  const handleCloseDrawer = React.useCallback(() => {
    form.reset(getDefaultFormValues(createApplicantPayloadValidator));
    dispatch(resetSelectedObj(APPLICANT_CONSTANTS.ENTITY_KEY));
  }, [form, dispatch]);

  React.useEffect(() => {
    if (showForm) {
      form.reset(getDefaultFormValues(createApplicantPayloadValidator));
    }
  }, [showForm, form]);

  React.useEffect(() => {
    return () => {
      if (addApplicantMutation.isSuccess || addApplicantMutation.isError) {
        addApplicantMutation.reset();
      }
    };
  }, [addApplicantMutation]);

  return (
  <Controls title={`Create ${APPLICANT_CONSTANTS.ENTITY_NAME}`} open={showForm} onClose={handleCloseDrawer} form={form} onSubmit={handleSubmit} type="drawer" width={600} loading={addApplicantMutation.isPending}>
    <FormProvider {...form}>
      <ApplicantForm />
    </FormProvider>
  </Controls>
);
};

export default ApplicantCreateDrawer;
