import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj } from '@/store/slice/selectedObjSlice';
import Controls from '@/components/Wrapper/controls';
import { Spinner } from '@/components/ui/spinner';
import { Label } from '@/components/ui';
import { getApplicantPortalCourseOfferingDetails } from '../service';
import COURSEOFFERING_CONSTANTS from '../constants';

interface ViewProps {}

const CourseOfferingViewController: React.FC<ViewProps> = ({}) => {
  const { [COURSEOFFERING_CONSTANTS.ENTITY_KEY]: { showView, primaryKeys } = {} } = useAppSelector((state: RootState) => state.selectedObj);
  const dispatch = useAppDispatch();

  const { data: courseOffering, isLoading } = useQuery({
    queryKey: [COURSEOFFERING_CONSTANTS.QUERY_KEY, primaryKeys, primaryKeys?.courseOfferingId, showView],
    queryFn: () => getApplicantPortalCourseOfferingDetails(primaryKeys?.courseOfferingId || 0),
    enabled: Boolean(showView && primaryKeys?.courseOfferingId),
  });

  const handleClose = React.useCallback(() => {
    dispatch(resetSelectedObj(COURSEOFFERING_CONSTANTS.ENTITY_KEY));
  }, [dispatch]);

  const Content = () => (
    <>
      {isLoading && (
        <div className="flex items-center justify-center py-10 h-1/2">
          <Spinner />
        </div>
      )}
      {!isLoading && courseOffering && (
        <div className="grid grid-cols-1 gap-6 items-start">
        <div className="space-y-2">
          <Label>Course Offering Id</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{courseOffering?.data?.courseOfferingId ?? '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Program Id</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{courseOffering?.data?.programId ?? '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Course Name</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{courseOffering?.data?.courseName ?? '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Description</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{courseOffering?.data?.description ?? '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Start Date</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{courseOffering?.data?.startDate ? new Date(courseOffering?.data?.startDate).toLocaleDateString() : '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>End Date</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{courseOffering?.data?.endDate ? new Date(courseOffering?.data?.endDate).toLocaleDateString() : '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Max Capacity</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{courseOffering?.data?.maxCapacity ?? '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Current Enrollment</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{courseOffering?.data?.currentEnrollment ?? '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Is Active</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{courseOffering?.data?.isActive ? 'Yes' : 'No'}</div>
        </div>
        <div className="space-y-2">
          <Label>Created At</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{courseOffering?.data?.createdAt ? new Date(courseOffering?.data?.createdAt).toLocaleDateString() : '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Updated At</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{courseOffering?.data?.updatedAt ? new Date(courseOffering?.data?.updatedAt).toLocaleDateString() : '-'}</div>
        </div>
        </div>
      )}
    </>
  );

  return (
    <Controls
      title={`${COURSEOFFERING_CONSTANTS.ENTITY_NAME} Details`}
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

export default CourseOfferingViewController;