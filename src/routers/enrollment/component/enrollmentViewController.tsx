import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj } from '@/store/slice/selectedObjSlice';
import Controls from '@/components/Wrapper/controls';
import { Spinner } from '@/components/ui/spinner';
import { Label } from '@/components/ui';
import { getEnrollmentDetails } from '../service';
import ENROLLMENT_CONSTANTS from '../constants';

interface ViewProps {}

const EnrollmentViewController: React.FC<ViewProps> = ({}) => {
  const { [ENROLLMENT_CONSTANTS.ENTITY_KEY]: { showView, primaryKeys } = {} } = useAppSelector((state: RootState) => state.selectedObj);
  const dispatch = useAppDispatch();

  const { data: enrollment, isLoading } = useQuery({
    queryKey: [ENROLLMENT_CONSTANTS.QUERY_KEY, primaryKeys, primaryKeys?.enrollmentId, showView],
    queryFn: () => getEnrollmentDetails(primaryKeys?.enrollmentId || 0),
    enabled: Boolean(showView && primaryKeys?.enrollmentId),
  });

  const handleClose = React.useCallback(() => {
    dispatch(resetSelectedObj(ENROLLMENT_CONSTANTS.ENTITY_KEY));
  }, [dispatch]);

  const Content = () => (
    <>
      {isLoading && (
        <div className="flex items-center justify-center py-10 h-1/2">
          <Spinner />
        </div>
      )}
      {!isLoading && enrollment && (
        <div className="grid grid-cols-1 gap-6 items-start">
        <div className="space-y-2">
          <Label>Enrollment Id</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{enrollment?.data?.enrollmentId ?? '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Application Id</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{enrollment?.data?.applicationId ?? '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Program Id</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{enrollment?.data?.programId ?? '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Enrollment Date</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{enrollment?.data?.enrollmentDate ? new Date(enrollment?.data?.enrollmentDate).toLocaleDateString() : '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Student Id In Si</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{enrollment?.data?.studentIdInSi ?? '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Status</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{enrollment?.data?.status ?? '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Created At</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{enrollment?.data?.createdAt ? new Date(enrollment?.data?.createdAt).toLocaleDateString() : '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Updated At</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{enrollment?.data?.updatedAt ? new Date(enrollment?.data?.updatedAt).toLocaleDateString() : '-'}</div>
        </div>
        </div>
      )}
    </>
  );

  return (
    <Controls
      title={`${ENROLLMENT_CONSTANTS.ENTITY_NAME} Details`}
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

export default EnrollmentViewController;