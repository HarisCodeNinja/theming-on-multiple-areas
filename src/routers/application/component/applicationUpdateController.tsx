import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getApplicationEditDetails, updateApplication } from '../service';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { updateApplicationPayloadValidator } from '../validation';
import { IApplicationEdit } from '../interface';
import ApplicationUpdateForm from '../form/applicationUpdate';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj } from '@/store/slice/selectedObjSlice';
import Controls from '@/components/Wrapper/controls';
import { FormProvider } from 'react-hook-form';
import { getDefaultFormValues } from '@/util/getFormDefaultFormValues';
import { handleApiFormErrors } from '@/util/handleApiFormErrors';
import APPLICATION_CONSTANTS from '../constants';


const ApplicationUpdateDrawer: React.FC = () => {
  const { [APPLICATION_CONSTANTS.ENTITY_KEY]: { showEdit, primaryKeys } = {} } = useAppSelector((state: RootState) => state.selectedObj);
  const dispatch = useAppDispatch();

  const queryClient = useQueryClient();
  const { data: applicationResponse, isLoading: isLoadingApplication } = useQuery({
    queryKey: [APPLICATION_CONSTANTS.QUERY_KEY, primaryKeys, primaryKeys?.applicationId, showEdit],
    queryFn: () => getApplicationEditDetails(primaryKeys?.applicationId || 0),
    enabled: Boolean(showEdit && primaryKeys?.applicationId),
  });


  const updateApplicationMutation = useMutation({
    mutationFn: updateApplication,
  });

  const isLoading = isLoadingApplication || updateApplicationMutation.isPending;
  const form = useForm<IApplicationEdit>({
  resolver: zodResolver(updateApplicationPayloadValidator),
  defaultValues: getDefaultFormValues(updateApplicationPayloadValidator),
  mode: 'onChange',
});

  useEffect(() => {
    if (applicationResponse?.data) {
      form.reset(applicationResponse.data);
    }
  }, [applicationResponse, form]);

  const updateData = React.useCallback(
  async (data: IApplicationEdit) => {
    try {
      await updateApplicationMutation.mutateAsync({ ...data, ...primaryKeys });
      queryClient.invalidateQueries({ queryKey: [APPLICATION_CONSTANTS.QUERY_KEY], exact: false });
      handleCloseDrawer();
    } catch (error) {
      handleApiFormErrors(error, form);
    }
  },
  [updateApplicationMutation, primaryKeys, queryClient, form],
);

  const handleCloseDrawer = React.useCallback(() => {
  form.reset(getDefaultFormValues(updateApplicationPayloadValidator));
  dispatch(resetSelectedObj(APPLICATION_CONSTANTS.ENTITY_KEY));
}, [form, dispatch]);

  return (
    <Controls title={`Edit ${APPLICATION_CONSTANTS.ENTITY_NAME}`} open={showEdit} onClose={handleCloseDrawer} form={form} onSubmit={updateData} type="drawer" width={600} loading={isLoading}>
  <FormProvider {...form}>
    <ApplicationUpdateForm />
  </FormProvider>
</Controls>
  );
};

export default ApplicationUpdateDrawer;
