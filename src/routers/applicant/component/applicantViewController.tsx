import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj } from '@/store/slice/selectedObjSlice';
import Controls from '@/components/Wrapper/controls';
import { Spinner } from '@/components/ui/spinner';
import { Label } from '@/components/ui';
import { getApplicantDetails } from '../service';
import APPLICANT_CONSTANTS from '../constants';

interface ViewProps {}

const ApplicantViewController: React.FC<ViewProps> = ({}) => {
  const { [APPLICANT_CONSTANTS.ENTITY_KEY]: { showView, primaryKeys } = {} } = useAppSelector((state: RootState) => state.selectedObj);
  const dispatch = useAppDispatch();

  const { data: applicant, isLoading } = useQuery({
    queryKey: [APPLICANT_CONSTANTS.QUERY_KEY, primaryKeys, primaryKeys?.applicantId, showView],
    queryFn: () => getApplicantDetails(primaryKeys?.applicantId || 0),
    enabled: Boolean(showView && primaryKeys?.applicantId),
  });

  const handleClose = React.useCallback(() => {
    dispatch(resetSelectedObj(APPLICANT_CONSTANTS.ENTITY_KEY));
  }, [dispatch]);

  const Content = () => (
    <>
      {isLoading && (
        <div className="flex items-center justify-center py-10 h-1/2">
          <Spinner />
        </div>
      )}
      {!isLoading && applicant && (
        <div className="grid grid-cols-1 gap-6 items-start">
        <div className="space-y-2">
          <Label>Applicant Id</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{applicant?.data?.applicantId ?? '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>User Id</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{applicant?.data?.userId ?? '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>First Name</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{applicant?.data?.firstName ?? '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Last Name</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{applicant?.data?.lastName ?? '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Date Of Birth</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{applicant?.data?.dateOfBirth ? new Date(applicant?.data?.dateOfBirth).toLocaleDateString() : '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Gender</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{applicant?.data?.gender ?? '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Nationality</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{applicant?.data?.nationality ?? '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Address</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{applicant?.data?.address ?? '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Phone Number</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{applicant?.data?.phoneNumber ?? '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Status</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{applicant?.data?.status ?? '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Created At</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{applicant?.data?.createdAt ? new Date(applicant?.data?.createdAt).toLocaleDateString() : '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Updated At</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{applicant?.data?.updatedAt ? new Date(applicant?.data?.updatedAt).toLocaleDateString() : '-'}</div>
        </div>
        </div>
      )}
    </>
  );

  return (
    <Controls
      title={`${APPLICANT_CONSTANTS.ENTITY_NAME} Details`}
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

export default ApplicantViewController;