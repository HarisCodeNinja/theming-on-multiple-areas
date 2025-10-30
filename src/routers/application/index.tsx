import React, { useState, useMemo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { hasAccess } from '@/util/AccessControl';
import ApplicationTable from './component/applicationTable';
import APPLICATION_CONSTANTS from './constants';
import { openNewForm } from '@/store/slice/selectedObjSlice';

const ApplicationPage: React.FC = () => {
	const [applicationCount, setApplicationCount] = useState<number | null>(null);
	const [currentPageCount, setCurrentPageCount] = useState<number>(0);
	const [currentQueryParams, setCurrentQueryParams] = useState<Record<string, any>>({});
	

	const dispatch = useAppDispatch();
	const user = useAppSelector((state: RootState) => state.session.user);

	

	const canCreateApplication = useMemo(() => {
		return user && hasAccess(user.scope, APPLICATION_CONSTANTS.PERMISSIONS.MODULE, APPLICATION_CONSTANTS.PERMISSIONS.RESOURCE, APPLICATION_CONSTANTS.PERMISSIONS.ACTIONS.EDIT);
	}, [user]);

	const canExportImport = useMemo(() => {
		return user && hasAccess(user.scope, APPLICATION_CONSTANTS.PERMISSIONS.MODULE, APPLICATION_CONSTANTS.PERMISSIONS.RESOURCE, APPLICATION_CONSTANTS.PERMISSIONS.ACTIONS.VIEW);
	}, [user]);

	const newButton = canCreateApplication && (
		<Button onClick={() => dispatch(openNewForm({ objKey: APPLICATION_CONSTANTS.ENTITY_KEY }))}>
			<Plus className="size-6 me-2" />
			New Application
		</Button>
	);
	return (
		<>
			<Card>
				<CardHeader className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
					<CardTitle className="text-xl">{APPLICATION_CONSTANTS.ENTITY_NAME_PLURAL}</CardTitle>
					<div className="flex flex-col sm:flex-row gap-2">
						{newButton}
					</div>
				</CardHeader>

				<CardContent>
					
					<ApplicationTable
						setApplicationCount={setApplicationCount}
						setCurrentPageCount={setCurrentPageCount}
						setCurrentQueryParams={setCurrentQueryParams}
					/>
				</CardContent>
			</Card>
		</>
	);
};

export default ApplicationPage;