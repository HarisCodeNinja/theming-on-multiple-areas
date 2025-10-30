import React from 'react';
	import { FormProvider, useForm } from 'react-hook-form';
	import { zodResolver } from '@hookform/resolvers/zod';
	import { z } from 'zod';
	import { useMutation, useQueryClient } from '@tanstack/react-query';
	
	import { addDecision } from '../service';
	import { createDecisionPayloadValidator } from '../validation';
	import { IDecisionAdd } from '../interface';
	import { RootState, useAppDispatch, useAppSelector } from '@/store';
	import { resetSelectedObj } from '@/store/slice/selectedObjSlice';
	import { getDefaultFormValues } from '@/util/getFormDefaultFormValues';
	import { handleApiFormErrors } from '@/util/handleApiFormErrors';
	import DECISION_CONSTANTS from '../constants';
	
	import Controls from '@/components/Wrapper/controls';
	import DecisionForm from '../form/decisionCreate';

type CreateDecisionFormData = z.infer<typeof createDecisionPayloadValidator>;

const DecisionCreateDrawer: React.FC = () => {
  const { [DECISION_CONSTANTS.ENTITY_KEY]: { showForm = false } = {} } = useAppSelector((state: RootState) => state.selectedObj);
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const addDecisionMutation = useMutation({
    mutationFn: addDecision,
  });

  const form = useForm<CreateDecisionFormData>({
    resolver: zodResolver(createDecisionPayloadValidator),
    defaultValues: getDefaultFormValues(createDecisionPayloadValidator),
    mode: 'onChange',
  });

  const handleSubmit = React.useCallback(
    async (data: CreateDecisionFormData) => {
      try {
        await addDecisionMutation.mutateAsync(data as IDecisionAdd);
        queryClient.invalidateQueries({ queryKey: [DECISION_CONSTANTS.QUERY_KEY], exact: false });
        handleCloseDrawer();
      } catch (error) {
        handleApiFormErrors(error, form);
      }
    },
    [addDecisionMutation, queryClient, form],
  );

  const handleCloseDrawer = React.useCallback(() => {
    form.reset(getDefaultFormValues(createDecisionPayloadValidator));
    dispatch(resetSelectedObj(DECISION_CONSTANTS.ENTITY_KEY));
  }, [form, dispatch]);

  React.useEffect(() => {
    if (showForm) {
      form.reset(getDefaultFormValues(createDecisionPayloadValidator));
    }
  }, [showForm, form]);

  React.useEffect(() => {
    return () => {
      if (addDecisionMutation.isSuccess || addDecisionMutation.isError) {
        addDecisionMutation.reset();
      }
    };
  }, [addDecisionMutation]);

  return (
  <Controls title={`Create ${DECISION_CONSTANTS.ENTITY_NAME}`} open={showForm} onClose={handleCloseDrawer} form={form} onSubmit={handleSubmit} type="drawer" width={600} loading={addDecisionMutation.isPending}>
    <FormProvider {...form}>
      <DecisionForm />
    </FormProvider>
  </Controls>
);
};

export default DecisionCreateDrawer;
