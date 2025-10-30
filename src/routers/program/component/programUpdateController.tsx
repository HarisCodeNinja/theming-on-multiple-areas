import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getProgramEditDetails, updateProgram } from '../service';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { updateProgramPayloadValidator } from '../validation';
import { IProgramEdit } from '../interface';
import ProgramUpdateForm from '../form/programUpdate';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj } from '@/store/slice/selectedObjSlice';
import Controls from '@/components/Wrapper/controls';
import { FormProvider } from 'react-hook-form';
import { getDefaultFormValues } from '@/util/getFormDefaultFormValues';
import { handleApiFormErrors } from '@/util/handleApiFormErrors';
import PROGRAM_CONSTANTS from '../constants';


const ProgramUpdateDrawer: React.FC = () => {
  const { [PROGRAM_CONSTANTS.ENTITY_KEY]: { showEdit, primaryKeys } = {} } = useAppSelector((state: RootState) => state.selectedObj);
  const dispatch = useAppDispatch();

  const queryClient = useQueryClient();
  const { data: programResponse, isLoading: isLoadingProgram } = useQuery({
    queryKey: [PROGRAM_CONSTANTS.QUERY_KEY, primaryKeys, primaryKeys?.programId, showEdit],
    queryFn: () => getProgramEditDetails(primaryKeys?.programId || 0),
    enabled: Boolean(showEdit && primaryKeys?.programId),
  });


  const updateProgramMutation = useMutation({
    mutationFn: updateProgram,
  });

  const isLoading = isLoadingProgram || updateProgramMutation.isPending;
  const form = useForm<IProgramEdit>({
  resolver: zodResolver(updateProgramPayloadValidator),
  defaultValues: getDefaultFormValues(updateProgramPayloadValidator),
  mode: 'onChange',
});

  useEffect(() => {
    if (programResponse?.data) {
      form.reset(programResponse.data);
    }
  }, [programResponse, form]);

  const updateData = React.useCallback(
  async (data: IProgramEdit) => {
    try {
      await updateProgramMutation.mutateAsync({ ...data, ...primaryKeys });
      queryClient.invalidateQueries({ queryKey: [PROGRAM_CONSTANTS.QUERY_KEY], exact: false });
      handleCloseDrawer();
    } catch (error) {
      handleApiFormErrors(error, form);
    }
  },
  [updateProgramMutation, primaryKeys, queryClient, form],
);

  const handleCloseDrawer = React.useCallback(() => {
  form.reset(getDefaultFormValues(updateProgramPayloadValidator));
  dispatch(resetSelectedObj(PROGRAM_CONSTANTS.ENTITY_KEY));
}, [form, dispatch]);

  return (
    <Controls title={`Edit ${PROGRAM_CONSTANTS.ENTITY_NAME}`} open={showEdit} onClose={handleCloseDrawer} form={form} onSubmit={updateData} type="drawer" width={600} loading={isLoading}>
  <FormProvider {...form}>
    <ProgramUpdateForm />
  </FormProvider>
</Controls>
  );
};

export default ProgramUpdateDrawer;
