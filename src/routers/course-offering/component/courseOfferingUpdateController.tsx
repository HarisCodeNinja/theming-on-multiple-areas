import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getCourseOfferingEditDetails, updateCourseOffering } from '../service';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { updateCourseOfferingPayloadValidator } from '../validation';
import { ICourseOfferingEdit } from '../interface';
import CourseOfferingUpdateForm from '../form/courseOfferingUpdate';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj } from '@/store/slice/selectedObjSlice';
import Controls from '@/components/Wrapper/controls';
import { FormProvider } from 'react-hook-form';
import { getDefaultFormValues } from '@/util/getFormDefaultFormValues';
import { handleApiFormErrors } from '@/util/handleApiFormErrors';
import COURSEOFFERING_CONSTANTS from '../constants';


const CourseOfferingUpdateDrawer: React.FC = () => {
  const { [COURSEOFFERING_CONSTANTS.ENTITY_KEY]: { showEdit, primaryKeys } = {} } = useAppSelector((state: RootState) => state.selectedObj);
  const dispatch = useAppDispatch();

  const queryClient = useQueryClient();
  const { data: courseOfferingResponse, isLoading: isLoadingCourseOffering } = useQuery({
    queryKey: [COURSEOFFERING_CONSTANTS.QUERY_KEY, primaryKeys, primaryKeys?.courseOfferingId, showEdit],
    queryFn: () => getCourseOfferingEditDetails(primaryKeys?.courseOfferingId || 0),
    enabled: Boolean(showEdit && primaryKeys?.courseOfferingId),
  });


  const updateCourseOfferingMutation = useMutation({
    mutationFn: updateCourseOffering,
  });

  const isLoading = isLoadingCourseOffering || updateCourseOfferingMutation.isPending;
  const form = useForm<ICourseOfferingEdit>({
  resolver: zodResolver(updateCourseOfferingPayloadValidator),
  defaultValues: getDefaultFormValues(updateCourseOfferingPayloadValidator),
  mode: 'onChange',
});

  useEffect(() => {
    if (courseOfferingResponse?.data) {
      form.reset(courseOfferingResponse.data);
    }
  }, [courseOfferingResponse, form]);

  const updateData = React.useCallback(
  async (data: ICourseOfferingEdit) => {
    try {
      await updateCourseOfferingMutation.mutateAsync({ ...data, ...primaryKeys });
      queryClient.invalidateQueries({ queryKey: [COURSEOFFERING_CONSTANTS.QUERY_KEY], exact: false });
      handleCloseDrawer();
    } catch (error) {
      handleApiFormErrors(error, form);
    }
  },
  [updateCourseOfferingMutation, primaryKeys, queryClient, form],
);

  const handleCloseDrawer = React.useCallback(() => {
  form.reset(getDefaultFormValues(updateCourseOfferingPayloadValidator));
  dispatch(resetSelectedObj(COURSEOFFERING_CONSTANTS.ENTITY_KEY));
}, [form, dispatch]);

  return (
    <Controls title={`Edit ${COURSEOFFERING_CONSTANTS.ENTITY_NAME}`} open={showEdit} onClose={handleCloseDrawer} form={form} onSubmit={updateData} type="drawer" width={600} loading={isLoading}>
  <FormProvider {...form}>
    <CourseOfferingUpdateForm />
  </FormProvider>
</Controls>
  );
};

export default CourseOfferingUpdateDrawer;
