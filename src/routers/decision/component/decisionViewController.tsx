import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { resetSelectedObj } from '@/store/slice/selectedObjSlice';
import Controls from '@/components/Wrapper/controls';
import { Spinner } from '@/components/ui/spinner';
import { Label } from '@/components/ui';
import { getDecisionDetails } from '../service';
import DECISION_CONSTANTS from '../constants';

interface ViewProps {}

const DecisionViewController: React.FC<ViewProps> = ({}) => {
  const { [DECISION_CONSTANTS.ENTITY_KEY]: { showView, primaryKeys } = {} } = useAppSelector((state: RootState) => state.selectedObj);
  const dispatch = useAppDispatch();

  const { data: decision, isLoading } = useQuery({
    queryKey: [DECISION_CONSTANTS.QUERY_KEY, primaryKeys, primaryKeys?.decisionId, showView],
    queryFn: () => getDecisionDetails(primaryKeys?.decisionId || 0),
    enabled: Boolean(showView && primaryKeys?.decisionId),
  });

  const handleClose = React.useCallback(() => {
    dispatch(resetSelectedObj(DECISION_CONSTANTS.ENTITY_KEY));
  }, [dispatch]);

  const Content = () => (
    <>
      {isLoading && (
        <div className="flex items-center justify-center py-10 h-1/2">
          <Spinner />
        </div>
      )}
      {!isLoading && decision && (
        <div className="grid grid-cols-1 gap-6 items-start">
        <div className="space-y-2">
          <Label>Decision Id</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{decision?.data?.decisionId ?? '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Application Id</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{decision?.data?.applicationId ?? '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Decision Type</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{decision?.data?.decisionType ?? '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Decision Date</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{decision?.data?.decisionDate ? new Date(decision?.data?.decisionDate).toLocaleDateString() : '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Communicated Date</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{decision?.data?.communicatedDate ? new Date(decision?.data?.communicatedDate).toLocaleDateString() : '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Communicated By User Id</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{decision?.data?.communicatedByUserId ?? '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Note</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{decision?.data?.note ?? '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Created At</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{decision?.data?.createdAt ? new Date(decision?.data?.createdAt).toLocaleDateString() : '-'}</div>
        </div>
        <div className="space-y-2">
          <Label>Updated At</Label>
          <div className="flex items-center text-sm bg-muted p-3 rounded-md">{decision?.data?.updatedAt ? new Date(decision?.data?.updatedAt).toLocaleDateString() : '-'}</div>
        </div>
        </div>
      )}
    </>
  );

  return (
    <Controls
      title={`${DECISION_CONSTANTS.ENTITY_NAME} Details`}
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

export default DecisionViewController;