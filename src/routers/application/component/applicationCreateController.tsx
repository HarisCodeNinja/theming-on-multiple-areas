import React from 'react';
	import { FormProvider, useForm } from 'react-hook-form';
	import { zodResolver } from '@hookform/resolvers/zod';
	import { z } from 'zod';
	import { useMutation, useQueryClient } from '@tanstack/react-query';
	
	import { addApplication } from '../service';
	import { createApplicationPayloadValidator } from '../validation';
	import { IApplicationAdd } from '../interface';
	import { RootState, useAppDispatch, useAppSelector } from '@/store';
	import { resetSelectedObj } from '@/store/slice/selectedObjSlice';
	import { getDefaultFormValues } from '@/util/getFormDefaultFormValues';
	import { handleApiFormErrors } from '@/util/handleApiFormErrors';
	import APPLICATION_CONSTANTS from '../constants';
	
	import Controls from '@/components/Wrapper/controls';
	import ApplicationForm from '../form/applicationCreate';

type CreateApplicationFormData = z.infer<typeof createApplicationPayloadValidator>;

const ApplicationCreateDrawer: React.FC = () => {
  const { [APPLICATION_CONSTANTS.ENTITY_KEY]: { showForm = false } = {} } = useAppSelector((state: RootState) => state.selectedObj);
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const addApplicationMutation = useMutation({
    mutationFn: addApplication,
  });

  const form = useForm<CreateApplicationFormData>({
    resolver: zodResolver(createApplicationPayloadValidator),
    defaultValues: getDefaultFormValues(createApplicationPayloadValidator),
    mode: 'onChange',
  });

  const handleSubmit = React.useCallback(
    async (data: CreateApplicationFormData) => {
      try {
        await addApplicationMutation.mutateAsync(data as IApplicationAdd);
        queryClient.invalidateQueries({ queryKey: [APPLICATION_CONSTANTS.QUERY_KEY], exact: false });
        handleCloseDrawer();
      } catch (error) {
        handleApiFormErrors(error, form);
      }
    },
    [addApplicationMutation, queryClient, form],
  );

  const handleCloseDrawer = React.useCallback(() => {
    form.reset(getDefaultFormValues(createApplicationPayloadValidator));
    dispatch(resetSelectedObj(APPLICATION_CONSTANTS.ENTITY_KEY));
  }, [form, dispatch]);

  React.useEffect(() => {
    if (showForm) {
      form.reset(getDefaultFormValues(createApplicationPayloadValidator));
    }
  }, [showForm, form]);

  React.useEffect(() => {
    return () => {
      if (addApplicationMutation.isSuccess || addApplicationMutation.isError) {
        addApplicationMutation.reset();
      }
    };
  }, [addApplicationMutation]);

  return (
  <Controls title={`Create ${APPLICATION_CONSTANTS.ENTITY_NAME}`} open={showForm} onClose={handleCloseDrawer} form={form} onSubmit={handleSubmit} type="drawer" width={600} loading={addApplicationMutation.isPending}>
    <FormProvider {...form}>
      <ApplicationForm />
    </FormProvider>
  </Controls>
);
};

export default ApplicationCreateDrawer;
