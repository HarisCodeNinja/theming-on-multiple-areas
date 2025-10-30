import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getAdmissionsOfficerEditDetails, updateAdmissionsOfficer } from '../service';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { updateAdmissionsOfficerPayloadValidator } from '../validation';
import { IAdmissionsOfficerEdit } from '../interface';
import AdmissionsOfficerUpdateForm from '../form/admissionsOfficerUpdate';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj } from '@/store/slice/selectedObjSlice';
import Controls from '@/components/Wrapper/controls';
import { FormProvider } from 'react-hook-form';
import { getDefaultFormValues } from '@/util/getFormDefaultFormValues';
import { handleApiFormErrors } from '@/util/handleApiFormErrors';
import ADMISSIONSOFFICER_CONSTANTS from '../constants';


const AdmissionsOfficerUpdateDrawer: React.FC = () => {
  const { [ADMISSIONSOFFICER_CONSTANTS.ENTITY_KEY]: { showEdit, primaryKeys } = {} } = useAppSelector((state: RootState) => state.selectedObj);
  const dispatch = useAppDispatch();

  const queryClient = useQueryClient();
  const { data: admissionsOfficerResponse, isLoading: isLoadingAdmissionsOfficer } = useQuery({
    queryKey: [ADMISSIONSOFFICER_CONSTANTS.QUERY_KEY, primaryKeys, primaryKeys?.admissionsOfficerId, showEdit],
    queryFn: () => getAdmissionsOfficerEditDetails(primaryKeys?.admissionsOfficerId || 0),
    enabled: Boolean(showEdit && primaryKeys?.admissionsOfficerId),
  });


  const updateAdmissionsOfficerMutation = useMutation({
    mutationFn: updateAdmissionsOfficer,
  });

  const isLoading = isLoadingAdmissionsOfficer || updateAdmissionsOfficerMutation.isPending;
  const form = useForm<IAdmissionsOfficerEdit>({
  resolver: zodResolver(updateAdmissionsOfficerPayloadValidator),
  defaultValues: getDefaultFormValues(updateAdmissionsOfficerPayloadValidator),
  mode: 'onChange',
});

  useEffect(() => {
    if (admissionsOfficerResponse?.data) {
      form.reset(admissionsOfficerResponse.data);
    }
  }, [admissionsOfficerResponse, form]);

  const updateData = React.useCallback(
  async (data: IAdmissionsOfficerEdit) => {
    try {
      await updateAdmissionsOfficerMutation.mutateAsync({ ...data, ...primaryKeys });
      queryClient.invalidateQueries({ queryKey: [ADMISSIONSOFFICER_CONSTANTS.QUERY_KEY], exact: false });
      handleCloseDrawer();
    } catch (error) {
      handleApiFormErrors(error, form);
    }
  },
  [updateAdmissionsOfficerMutation, primaryKeys, queryClient, form],
);

  const handleCloseDrawer = React.useCallback(() => {
  form.reset(getDefaultFormValues(updateAdmissionsOfficerPayloadValidator));
  dispatch(resetSelectedObj(ADMISSIONSOFFICER_CONSTANTS.ENTITY_KEY));
}, [form, dispatch]);

  return (
    <Controls title={`Edit ${ADMISSIONSOFFICER_CONSTANTS.ENTITY_NAME}`} open={showEdit} onClose={handleCloseDrawer} form={form} onSubmit={updateData} type="drawer" width={600} loading={isLoading}>
  <FormProvider {...form}>
    <AdmissionsOfficerUpdateForm />
  </FormProvider>
</Controls>
  );
};

export default AdmissionsOfficerUpdateDrawer;
