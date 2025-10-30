import React, { useState, useMemo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { hasAccess } from '@/util/AccessControl';
import DecisionTable from './component/decisionTable';
import DECISION_CONSTANTS from './constants';
import { openNewForm } from '@/store/slice/selectedObjSlice';

const DecisionPage: React.FC = () => {
	const [decisionCount, setDecisionCount] = useState<number | null>(null);
	const [currentPageCount, setCurrentPageCount] = useState<number>(0);
	const [currentQueryParams, setCurrentQueryParams] = useState<Record<string, any>>({});
	

	const dispatch = useAppDispatch();
	const user = useAppSelector((state: RootState) => state.session.user);

	

	const canCreateDecision = useMemo(() => {
		return user && hasAccess(user.scope, DECISION_CONSTANTS.PERMISSIONS.MODULE, DECISION_CONSTANTS.PERMISSIONS.RESOURCE, DECISION_CONSTANTS.PERMISSIONS.ACTIONS.EDIT);
	}, [user]);

	const canExportImport = useMemo(() => {
		return user && hasAccess(user.scope, DECISION_CONSTANTS.PERMISSIONS.MODULE, DECISION_CONSTANTS.PERMISSIONS.RESOURCE, DECISION_CONSTANTS.PERMISSIONS.ACTIONS.VIEW);
	}, [user]);

	const newButton = canCreateDecision && (
		<Button onClick={() => dispatch(openNewForm({ objKey: DECISION_CONSTANTS.ENTITY_KEY }))}>
			<Plus className="size-6 me-2" />
			New Decision
		</Button>
	);
	return (
		<>
			<Card>
				<CardHeader className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
					<CardTitle className="text-xl">{DECISION_CONSTANTS.ENTITY_NAME_PLURAL}</CardTitle>
					<div className="flex flex-col sm:flex-row gap-2">
						{newButton}
					</div>
				</CardHeader>

				<CardContent>
					
					<DecisionTable
						setDecisionCount={setDecisionCount}
						setCurrentPageCount={setCurrentPageCount}
						setCurrentQueryParams={setCurrentQueryParams}
					/>
				</CardContent>
			</Card>
		</>
	);
};

export default DecisionPage;