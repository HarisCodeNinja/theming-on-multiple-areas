import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj } from '@/store/slice/selectedObjSlice';
import Controls from '@/components/Wrapper/controls';
import { Spinner } from '@/components/ui/spinner';
import { Label } from '@/components/ui';
import { getAdmissionsOfficerDetails } from '../service';
import ADMISSIONSOFFICER_CONSTANTS from '../constants';

interface ViewProps {}

const AdmissionsOfficerViewController: React.FC<ViewProps> = ({}) => {
  const { [ADMISSIONSOFFICER_CONSTANTS.ENTITY_KEY]: { showView, primaryKeys } = {} } = useAppSelector((state: RootState) => state.selectedObj);
  const dispatch = useAppDispatch();

  const { data: admissionsOfficer, isLoading } = useQuery({
    queryKey: [ADMISSIONSOFFICER_CONSTANTS.QUERY_KEY, primaryKeys, primaryKeys?.admissionsOfficerId, showView],
    queryFn: () => getAdmissionsOfficerDetails(primaryKeys?.admissionsOfficerId || 0),
    enabled: Boolean(showView && primaryKeys?.admissionsOfficerId),
  });

  const handleClose = React.useCallback(() => {
    dispatch(resetSelectedObj(ADMISSIONSOFFICER_CONSTANTS.ENTITY_KEY));
  }, [dispatch]);

  const Content = () => (
    <>
      {isLoading && (
        <div className="flex items-center justify-center py-10 h-1/2">
          <Spinner />
        </div>
      )}
      {!isLoading && admissionsOfficer && (
        <div className="grid grid-cols-1 gap-6 items-start">
        <div className="space-y-2">
          <Label>Admissions Officer Id</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{admissionsOfficer?.data?.admissionsOfficerId ?? '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>User Id</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{admissionsOfficer?.data?.userId ?? '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Department</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{admissionsOfficer?.data?.department ?? '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Title</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{admissionsOfficer?.data?.title ?? '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Created At</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{admissionsOfficer?.data?.createdAt ? new Date(admissionsOfficer?.data?.createdAt).toLocaleDateString() : '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Updated At</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{admissionsOfficer?.data?.updatedAt ? new Date(admissionsOfficer?.data?.updatedAt).toLocaleDateString() : '-'}</div>
        </div>
        </div>
      )}
    </>
  );

  return (
    <Controls
      title={`${ADMISSIONSOFFICER_CONSTANTS.ENTITY_NAME} Details`}
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

export default AdmissionsOfficerViewController;