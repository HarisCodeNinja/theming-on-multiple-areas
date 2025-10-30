import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getDecisionEditDetails, updateDecision } from '../service';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { updateDecisionPayloadValidator } from '../validation';
import { IDecisionEdit } from '../interface';
import DecisionUpdateForm from '../form/decisionUpdate';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj } from '@/store/slice/selectedObjSlice';
import Controls from '@/components/Wrapper/controls';
import { FormProvider } from 'react-hook-form';
import { getDefaultFormValues } from '@/util/getFormDefaultFormValues';
import { handleApiFormErrors } from '@/util/handleApiFormErrors';
import DECISION_CONSTANTS from '../constants';


const DecisionUpdateDrawer: React.FC = () => {
  const { [DECISION_CONSTANTS.ENTITY_KEY]: { showEdit, primaryKeys } = {} } = useAppSelector((state: RootState) => state.selectedObj);
  const dispatch = useAppDispatch();

  const queryClient = useQueryClient();
  const { data: decisionResponse, isLoading: isLoadingDecision } = useQuery({
    queryKey: [DECISION_CONSTANTS.QUERY_KEY, primaryKeys, primaryKeys?.decisionId, showEdit],
    queryFn: () => getDecisionEditDetails(primaryKeys?.decisionId || 0),
    enabled: Boolean(showEdit && primaryKeys?.decisionId),
  });


  const updateDecisionMutation = useMutation({
    mutationFn: updateDecision,
  });

  const isLoading = isLoadingDecision || updateDecisionMutation.isPending;
  const form = useForm<IDecisionEdit>({
  resolver: zodResolver(updateDecisionPayloadValidator),
  defaultValues: getDefaultFormValues(updateDecisionPayloadValidator),
  mode: 'onChange',
});

  useEffect(() => {
    if (decisionResponse?.data) {
      form.reset(decisionResponse.data);
    }
  }, [decisionResponse, form]);

  const updateData = React.useCallback(
  async (data: IDecisionEdit) => {
    try {
      await updateDecisionMutation.mutateAsync({ ...data, ...primaryKeys });
      queryClient.invalidateQueries({ queryKey: [DECISION_CONSTANTS.QUERY_KEY], exact: false });
      handleCloseDrawer();
    } catch (error) {
      handleApiFormErrors(error, form);
    }
  },
  [updateDecisionMutation, primaryKeys, queryClient, form],
);

  const handleCloseDrawer = React.useCallback(() => {
  form.reset(getDefaultFormValues(updateDecisionPayloadValidator));
  dispatch(resetSelectedObj(DECISION_CONSTANTS.ENTITY_KEY));
}, [form, dispatch]);

  return (
    <Controls title={`Edit ${DECISION_CONSTANTS.ENTITY_NAME}`} open={showEdit} onClose={handleCloseDrawer} form={form} onSubmit={updateData} type="drawer" width={600} loading={isLoading}>
  <FormProvider {...form}>
    <DecisionUpdateForm />
  </FormProvider>
</Controls>
  );
};

export default DecisionUpdateDrawer;
