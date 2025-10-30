import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj } from '@/store/slice/selectedObjSlice';
import Controls from '@/components/Wrapper/controls';
import { Spinner } from '@/components/ui/spinner';
import { Label } from '@/components/ui';
import { getApplicationDetails } from '../service';
import APPLICATION_CONSTANTS from '../constants';

interface ViewProps {}

const ApplicationViewController: React.FC<ViewProps> = ({}) => {
  const { [APPLICATION_CONSTANTS.ENTITY_KEY]: { showView, primaryKeys } = {} } = useAppSelector((state: RootState) => state.selectedObj);
  const dispatch = useAppDispatch();

  const { data: application, isLoading } = useQuery({
    queryKey: [APPLICATION_CONSTANTS.QUERY_KEY, primaryKeys, primaryKeys?.applicationId, showView],
    queryFn: () => getApplicationDetails(primaryKeys?.applicationId || 0),
    enabled: Boolean(showView && primaryKeys?.applicationId),
  });

  const handleClose = React.useCallback(() => {
    dispatch(resetSelectedObj(APPLICATION_CONSTANTS.ENTITY_KEY));
  }, [dispatch]);

  const Content = () => (
    <>
      {isLoading && (
        <div className="flex items-center justify-center py-10 h-1/2">
          <Spinner />
        </div>
      )}
      {!isLoading && application && (
        <div className="grid grid-cols-1 gap-6 items-start">
        <div className="space-y-2">
          <Label>Application Id</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{application?.data?.applicationId ?? '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Applicant Id</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{application?.data?.applicantId ?? '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Program Id</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{application?.data?.programId ?? '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Application Date</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{application?.data?.applicationDate ? new Date(application?.data?.applicationDate).toLocaleDateString() : '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Submission Status</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{application?.data?.submissionStatus ?? '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Application Fee Paid</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{application?.data?.applicationFeePaid ? 'Yes' : 'No'}</div>
        </div>
        <div className="space-y-2">
          <Label>Payment Id</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{application?.data?.paymentId ?? '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Current Decision Id</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{application?.data?.currentDecisionId ?? '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Created At</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{application?.data?.createdAt ? new Date(application?.data?.createdAt).toLocaleDateString() : '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Updated At</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{application?.data?.updatedAt ? new Date(application?.data?.updatedAt).toLocaleDateString() : '-'}</div>
        </div>
        </div>
      )}
    </>
  );

  return (
    <Controls
      title={`${APPLICATION_CONSTANTS.ENTITY_NAME} Details`}
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

export default ApplicationViewController;