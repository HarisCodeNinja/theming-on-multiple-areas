import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getApplicantEditDetails, updateApplicant } from '../service';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { updateApplicantPayloadValidator } from '../validation';
import { IApplicantEdit } from '../interface';
import ApplicantUpdateForm from '../form/applicantUpdate';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj } from '@/store/slice/selectedObjSlice';
import Controls from '@/components/Wrapper/controls';
import { FormProvider } from 'react-hook-form';
import { getDefaultFormValues } from '@/util/getFormDefaultFormValues';
import { handleApiFormErrors } from '@/util/handleApiFormErrors';
import APPLICANT_CONSTANTS from '../constants';


const ApplicantUpdateDrawer: React.FC = () => {
  const { [APPLICANT_CONSTANTS.ENTITY_KEY]: { showEdit, primaryKeys } = {} } = useAppSelector((state: RootState) => state.selectedObj);
  const dispatch = useAppDispatch();

  const queryClient = useQueryClient();
  const { data: applicantResponse, isLoading: isLoadingApplicant } = useQuery({
    queryKey: [APPLICANT_CONSTANTS.QUERY_KEY, primaryKeys, primaryKeys?.applicantId, showEdit],
    queryFn: () => getApplicantEditDetails(primaryKeys?.applicantId || 0),
    enabled: Boolean(showEdit && primaryKeys?.applicantId),
  });


  const updateApplicantMutation = useMutation({
    mutationFn: updateApplicant,
  });

  const isLoading = isLoadingApplicant || updateApplicantMutation.isPending;
  const form = useForm<IApplicantEdit>({
  resolver: zodResolver(updateApplicantPayloadValidator),
  defaultValues: getDefaultFormValues(updateApplicantPayloadValidator),
  mode: 'onChange',
});

  useEffect(() => {
    if (applicantResponse?.data) {
      form.reset(applicantResponse.data);
    }
  }, [applicantResponse, form]);

  const updateData = React.useCallback(
  async (data: IApplicantEdit) => {
    try {
      await updateApplicantMutation.mutateAsync({ ...data, ...primaryKeys });
      queryClient.invalidateQueries({ queryKey: [APPLICANT_CONSTANTS.QUERY_KEY], exact: false });
      handleCloseDrawer();
    } catch (error) {
      handleApiFormErrors(error, form);
    }
  },
  [updateApplicantMutation, primaryKeys, queryClient, form],
);

  const handleCloseDrawer = React.useCallback(() => {
  form.reset(getDefaultFormValues(updateApplicantPayloadValidator));
  dispatch(resetSelectedObj(APPLICANT_CONSTANTS.ENTITY_KEY));
}, [form, dispatch]);

  return (
    <Controls title={`Edit ${APPLICANT_CONSTANTS.ENTITY_NAME}`} open={showEdit} onClose={handleCloseDrawer} form={form} onSubmit={updateData} type="drawer" width={600} loading={isLoading}>
  <FormProvider {...form}>
    <ApplicantUpdateForm />
  </FormProvider>
</Controls>
  );
};

export default ApplicantUpdateDrawer;
