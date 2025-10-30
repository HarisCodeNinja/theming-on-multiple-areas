import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj } from '@/store/slice/selectedObjSlice';
import Controls from '@/components/Wrapper/controls';
import { Spinner } from '@/components/ui/spinner';
import { Label } from '@/components/ui';
import { getProgramDetails } from '../service';
import PROGRAM_CONSTANTS from '../constants';

interface ViewProps {}

const ProgramViewController: React.FC<ViewProps> = ({}) => {
  const { [PROGRAM_CONSTANTS.ENTITY_KEY]: { showView, primaryKeys } = {} } = useAppSelector((state: RootState) => state.selectedObj);
  const dispatch = useAppDispatch();

  const { data: program, isLoading } = useQuery({
    queryKey: [PROGRAM_CONSTANTS.QUERY_KEY, primaryKeys, primaryKeys?.programId, showView],
    queryFn: () => getProgramDetails(primaryKeys?.programId || 0),
    enabled: Boolean(showView && primaryKeys?.programId),
  });

  const handleClose = React.useCallback(() => {
    dispatch(resetSelectedObj(PROGRAM_CONSTANTS.ENTITY_KEY));
  }, [dispatch]);

  const Content = () => (
    <>
      {isLoading && (
        <div className="flex items-center justify-center py-10 h-1/2">
          <Spinner />
        </div>
      )}
      {!isLoading && program && (
        <div className="grid grid-cols-1 gap-6 items-start">
        <div className="space-y-2">
          <Label>Program Id</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{program?.data?.programId ?? '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Program Name</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{program?.data?.programName ?? '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Description</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{program?.data?.description ?? '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Program Type</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{program?.data?.programType ?? '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Duration</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{program?.data?.duration ?? '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Fee</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{program?.data?.fee ?? '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Application Deadline</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{program?.data?.applicationDeadline ? new Date(program?.data?.applicationDeadline).toLocaleDateString() : '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Is Active</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{program?.data?.isActive ? 'Yes' : 'No'}</div>
        </div>
        <div className="space-y-2">
          <Label>Created At</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{program?.data?.createdAt ? new Date(program?.data?.createdAt).toLocaleDateString() : '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Updated At</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{program?.data?.updatedAt ? new Date(program?.data?.updatedAt).toLocaleDateString() : '-'}</div>
        </div>
        </div>
      )}
    </>
  );

  return (
    <Controls
      title={`${PROGRAM_CONSTANTS.ENTITY_NAME} Details`}
      open={showView}
      onClose={handleClose}
      type="modal"
      width={800}
      loading={isLoading}
    >
      <Content />
    </Controls>
  );
};

export default ProgramViewController;