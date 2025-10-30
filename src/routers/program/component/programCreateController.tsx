import React from 'react';
	import { FormProvider, useForm } from 'react-hook-form';
	import { zodResolver } from '@hookform/resolvers/zod';
	import { z } from 'zod';
	import { useMutation, useQueryClient } from '@tanstack/react-query';
	
	import { addProgram } from '../service';
	import { createProgramPayloadValidator } from '../validation';
	import { IProgramAdd } from '../interface';
	import { RootState, useAppDispatch, useAppSelector } from '@/store';
	import { resetSelectedObj } from '@/store/slice/selectedObjSlice';
	import { getDefaultFormValues } from '@/util/getFormDefaultFormValues';
	import { handleApiFormErrors } from '@/util/handleApiFormErrors';
	import PROGRAM_CONSTANTS from '../constants';
	
	import Controls from '@/components/Wrapper/controls';
	import ProgramForm from '../form/programCreate';

type CreateProgramFormData = z.infer<typeof createProgramPayloadValidator>;

const ProgramCreateDrawer: React.FC = () => {
  const { [PROGRAM_CONSTANTS.ENTITY_KEY]: { showForm = false } = {} } = useAppSelector((state: RootState) => state.selectedObj);
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const addProgramMutation = useMutation({
    mutationFn: addProgram,
  });

  const form = useForm<CreateProgramFormData>({
    resolver: zodResolver(createProgramPayloadValidator),
    defaultValues: getDefaultFormValues(createProgramPayloadValidator),
    mode: 'onChange',
  });

  const handleSubmit = React.useCallback(
    async (data: CreateProgramFormData) => {
      try {
        await addProgramMutation.mutateAsync(data as IProgramAdd);
        queryClient.invalidateQueries({ queryKey: [PROGRAM_CONSTANTS.QUERY_KEY], exact: false });
        handleCloseDrawer();
      } catch (error) {
        handleApiFormErrors(error, form);
      }
    },
    [addProgramMutation, queryClient, form],
  );

  const handleCloseDrawer = React.useCallback(() => {
    form.reset(getDefaultFormValues(createProgramPayloadValidator));
    dispatch(resetSelectedObj(PROGRAM_CONSTANTS.ENTITY_KEY));
  }, [form, dispatch]);

  React.useEffect(() => {
    if (showForm) {
      form.reset(getDefaultFormValues(createProgramPayloadValidator));
    }
  }, [showForm, form]);

  React.useEffect(() => {
    return () => {
      if (addProgramMutation.isSuccess || addProgramMutation.isError) {
        addProgramMutation.reset();
      }
    };
  }, [addProgramMutation]);

  return (
  <Controls title={`Create ${PROGRAM_CONSTANTS.ENTITY_NAME}`} open={showForm} onClose={handleCloseDrawer} form={form} onSubmit={handleSubmit} type="drawer" width={600} loading={addProgramMutation.isPending}>
    <FormProvider {...form}>
      <ProgramForm />
    </FormProvider>
  </Controls>
);
};

export default ProgramCreateDrawer;
