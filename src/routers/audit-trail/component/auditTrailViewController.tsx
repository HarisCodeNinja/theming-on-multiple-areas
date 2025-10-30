import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj } from '@/store/slice/selectedObjSlice';
import Controls from '@/components/Wrapper/controls';
import { Spinner } from '@/components/ui/spinner';
import { Label } from '@/components/ui';
import { getAuditTrailDetails } from '../service';
import AUDITTRAIL_CONSTANTS from '../constants';

interface ViewProps {}

const AuditTrailViewController: React.FC<ViewProps> = ({}) => {
  const { [AUDITTRAIL_CONSTANTS.ENTITY_KEY]: { showView, primaryKeys } = {} } = useAppSelector((state: RootState) => state.selectedObj);
  const dispatch = useAppDispatch();

  const { data: auditTrail, isLoading } = useQuery({
    queryKey: [AUDITTRAIL_CONSTANTS.QUERY_KEY, primaryKeys, primaryKeys?.auditTrailId, showView],
    queryFn: () => getAuditTrailDetails(primaryKeys?.auditTrailId || 0),
    enabled: Boolean(showView && primaryKeys?.auditTrailId),
  });

  const handleClose = React.useCallback(() => {
    dispatch(resetSelectedObj(AUDITTRAIL_CONSTANTS.ENTITY_KEY));
  }, [dispatch]);

  const Content = () => (
    <>
      {isLoading && (
        <div className="flex items-center justify-center py-10 h-1/2">
          <Spinner />
        </div>
      )}
      {!isLoading && auditTrail && (
        <div className="grid grid-cols-1 gap-6 items-start">
        <div className="space-y-2">
          <Label>Audit Id</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{auditTrail?.data?.auditId ?? '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Entity Type</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{auditTrail?.data?.entityType ?? '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Entity Id</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{auditTrail?.data?.entityId ?? '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Action</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{auditTrail?.data?.action ?? '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Changed By User Id</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{auditTrail?.data?.changedByUserId ?? '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Old Value</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{auditTrail?.data?.oldValue ?? '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>New Value</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{auditTrail?.data?.newValue ?? '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Change Timestamp</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{auditTrail?.data?.changeTimestamp ? new Date(auditTrail?.data?.changeTimestamp).toLocaleDateString() : '-'}</div>
        </div>
        </div>
      )}
    </>
  );

  return (
    <Controls
      title={`${AUDITTRAIL_CONSTANTS.ENTITY_NAME} Details`}
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

export default AuditTrailViewController;