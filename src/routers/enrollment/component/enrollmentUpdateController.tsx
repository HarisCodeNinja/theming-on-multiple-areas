import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getEnrollmentEditDetails, updateEnrollment } from '../service';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { updateEnrollmentPayloadValidator } from '../validation';
import { IEnrollmentEdit } from '../interface';
import EnrollmentUpdateForm from '../form/enrollmentUpdate';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj } from '@/store/slice/selectedObjSlice';
import Controls from '@/components/Wrapper/controls';
import { FormProvider } from 'react-hook-form';
import { getDefaultFormValues } from '@/util/getFormDefaultFormValues';
import { handleApiFormErrors } from '@/util/handleApiFormErrors';
import ENROLLMENT_CONSTANTS from '../constants';


const EnrollmentUpdateDrawer: React.FC = () => {
  const { [ENROLLMENT_CONSTANTS.ENTITY_KEY]: { showEdit, primaryKeys } = {} } = useAppSelector((state: RootState) => state.selectedObj);
  const dispatch = useAppDispatch();

  const queryClient = useQueryClient();
  const { data: enrollmentResponse, isLoading: isLoadingEnrollment } = useQuery({
    queryKey: [ENROLLMENT_CONSTANTS.QUERY_KEY, primaryKeys, primaryKeys?.enrollmentId, showEdit],
    queryFn: () => getEnrollmentEditDetails(primaryKeys?.enrollmentId || 0),
    enabled: Boolean(showEdit && primaryKeys?.enrollmentId),
  });


  const updateEnrollmentMutation = useMutation({
    mutationFn: updateEnrollment,
  });

  const isLoading = isLoadingEnrollment || updateEnrollmentMutation.isPending;
  const form = useForm<IEnrollmentEdit>({
  resolver: zodResolver(updateEnrollmentPayloadValidator),
  defaultValues: getDefaultFormValues(updateEnrollmentPayloadValidator),
  mode: 'onChange',
});

  useEffect(() => {
    if (enrollmentResponse?.data) {
      form.reset(enrollmentResponse.data);
    }
  }, [enrollmentResponse, form]);

  const updateData = React.useCallback(
  async (data: IEnrollmentEdit) => {
    try {
      await updateEnrollmentMutation.mutateAsync({ ...data, ...primaryKeys });
      queryClient.invalidateQueries({ queryKey: [ENROLLMENT_CONSTANTS.QUERY_KEY], exact: false });
      handleCloseDrawer();
    } catch (error) {
      handleApiFormErrors(error, form);
    }
  },
  [updateEnrollmentMutation, primaryKeys, queryClient, form],
);

  const handleCloseDrawer = React.useCallback(() => {
  form.reset(getDefaultFormValues(updateEnrollmentPayloadValidator));
  dispatch(resetSelectedObj(ENROLLMENT_CONSTANTS.ENTITY_KEY));
}, [form, dispatch]);

  return (
    <Controls title={`Edit ${ENROLLMENT_CONSTANTS.ENTITY_NAME}`} open={showEdit} onClose={handleCloseDrawer} form={form} onSubmit={updateData} type="drawer" width={600} loading={isLoading}>
  <FormProvider {...form}>
    <EnrollmentUpdateForm />
  </FormProvider>
</Controls>
  );
};

export default EnrollmentUpdateDrawer;
