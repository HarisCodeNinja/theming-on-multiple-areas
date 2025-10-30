import React from 'react';
	import { FormProvider, useForm } from 'react-hook-form';
	import { zodResolver } from '@hookform/resolvers/zod';
	import { z } from 'zod';
	import { useMutation, useQueryClient } from '@tanstack/react-query';
	
	import { addCourseOffering } from '../service';
	import { createCourseOfferingPayloadValidator } from '../validation';
	import { ICourseOfferingAdd } from '../interface';
	import { RootState, useAppDispatch, useAppSelector } from '@/store';
	import { resetSelectedObj } from '@/store/slice/selectedObjSlice';
	import { getDefaultFormValues } from '@/util/getFormDefaultFormValues';
	import { handleApiFormErrors } from '@/util/handleApiFormErrors';
	import COURSEOFFERING_CONSTANTS from '../constants';
	
	import Controls from '@/components/Wrapper/controls';
	import CourseOfferingForm from '../form/courseOfferingCreate';

type CreateCourseOfferingFormData = z.infer<typeof createCourseOfferingPayloadValidator>;

const CourseOfferingCreateDrawer: React.FC = () => {
  const { [COURSEOFFERING_CONSTANTS.ENTITY_KEY]: { showForm = false } = {} } = useAppSelector((state: RootState) => state.selectedObj);
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const addCourseOfferingMutation = useMutation({
    mutationFn: addCourseOffering,
  });

  const form = useForm<CreateCourseOfferingFormData>({
    resolver: zodResolver(createCourseOfferingPayloadValidator),
    defaultValues: getDefaultFormValues(createCourseOfferingPayloadValidator),
    mode: 'onChange',
  });

  const handleSubmit = React.useCallback(
    async (data: CreateCourseOfferingFormData) => {
      try {
        await addCourseOfferingMutation.mutateAsync(data as ICourseOfferingAdd);
        queryClient.invalidateQueries({ queryKey: [COURSEOFFERING_CONSTANTS.QUERY_KEY], exact: false });
        handleCloseDrawer();
      } catch (error) {
        handleApiFormErrors(error, form);
      }
    },
    [addCourseOfferingMutation, queryClient, form],
  );

  const handleCloseDrawer = React.useCallback(() => {
    form.reset(getDefaultFormValues(createCourseOfferingPayloadValidator));
    dispatch(resetSelectedObj(COURSEOFFERING_CONSTANTS.ENTITY_KEY));
  }, [form, dispatch]);

  React.useEffect(() => {
    if (showForm) {
      form.reset(getDefaultFormValues(createCourseOfferingPayloadValidator));
    }
  }, [showForm, form]);

  React.useEffect(() => {
    return () => {
      if (addCourseOfferingMutation.isSuccess || addCourseOfferingMutation.isError) {
        addCourseOfferingMutation.reset();
      }
    };
  }, [addCourseOfferingMutation]);

  return (
  <Controls title={`Create ${COURSEOFFERING_CONSTANTS.ENTITY_NAME}`} open={showForm} onClose={handleCloseDrawer} form={form} onSubmit={handleSubmit} type="drawer" width={600} loading={addCourseOfferingMutation.isPending}>
    <FormProvider {...form}>
      <CourseOfferingForm />
    </FormProvider>
  </Controls>
);
};

export default CourseOfferingCreateDrawer;
