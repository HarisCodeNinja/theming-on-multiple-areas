import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj } from '@/store/slice/selectedObjSlice';
import Controls from '@/components/Wrapper/controls';
import { Spinner } from '@/components/ui/spinner';
import { Label } from '@/components/ui';
import { getInterviewDetails } from '../service';
import INTERVIEW_CONSTANTS from '../constants';

interface ViewProps {}

const InterviewViewController: React.FC<ViewProps> = ({}) => {
  const { [INTERVIEW_CONSTANTS.ENTITY_KEY]: { showView, primaryKeys } = {} } = useAppSelector((state: RootState) => state.selectedObj);
  const dispatch = useAppDispatch();

  const { data: interview, isLoading } = useQuery({
    queryKey: [INTERVIEW_CONSTANTS.QUERY_KEY, primaryKeys, primaryKeys?.interviewId, showView],
    queryFn: () => getInterviewDetails(primaryKeys?.interviewId || 0),
    enabled: Boolean(showView && primaryKeys?.interviewId),
  });

  const handleClose = React.useCallback(() => {
    dispatch(resetSelectedObj(INTERVIEW_CONSTANTS.ENTITY_KEY));
  }, [dispatch]);

  const Content = () => (
    <>
      {isLoading && (
        <div className="flex items-center justify-center py-10 h-1/2">
          <Spinner />
        </div>
      )}
      {!isLoading && interview && (
        <div className="grid grid-cols-1 gap-6 items-start">
        <div className="space-y-2">
          <Label>Interview Id</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{interview?.data?.interviewId ?? '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Application Id</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{interview?.data?.applicationId ?? '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Admissions Officer Id</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{interview?.data?.admissionsOfficerId ?? '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Interview Date</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{interview?.data?.interviewDate ? new Date(interview?.data?.interviewDate).toLocaleDateString() : '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Interview Type</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{interview?.data?.interviewType ?? '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Note</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{interview?.data?.note ?? '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Outcome</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{interview?.data?.outcome ?? '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Created At</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{interview?.data?.createdAt ? new Date(interview?.data?.createdAt).toLocaleDateString() : '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Updated At</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{interview?.data?.updatedAt ? new Date(interview?.data?.updatedAt).toLocaleDateString() : '-'}</div>
        </div>
        </div>
      )}
    </>
  );

  return (
    <Controls
      title={`${INTERVIEW_CONSTANTS.ENTITY_NAME} Details`}
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

export default InterviewViewController;