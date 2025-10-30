import React, { useState, useMemo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { hasAccess } from '@/util/AccessControl';
import ApplicantTable from './component/applicantTable';
import APPLICANT_CONSTANTS from './constants';
import { openNewForm } from '@/store/slice/selectedObjSlice';

const ApplicantPage: React.FC = () => {
	const [applicantCount, setApplicantCount] = useState<number | null>(null);
	const [currentPageCount, setCurrentPageCount] = useState<number>(0);
	const [currentQueryParams, setCurrentQueryParams] = useState<Record<string, any>>({});
	

	const dispatch = useAppDispatch();
	const user = useAppSelector((state: RootState) => state.session.user);

	

	const canCreateApplicant = useMemo(() => {
		return user && hasAccess(user.scope, APPLICANT_CONSTANTS.PERMISSIONS.MODULE, APPLICANT_CONSTANTS.PERMISSIONS.RESOURCE, APPLICANT_CONSTANTS.PERMISSIONS.ACTIONS.EDIT);
	}, [user]);

	const canExportImport = useMemo(() => {
		return user && hasAccess(user.scope, APPLICANT_CONSTANTS.PERMISSIONS.MODULE, APPLICANT_CONSTANTS.PERMISSIONS.RESOURCE, APPLICANT_CONSTANTS.PERMISSIONS.ACTIONS.VIEW);
	}, [user]);

	const newButton = canCreateApplicant && (
		<Button onClick={() => dispatch(openNewForm({ objKey: APPLICANT_CONSTANTS.ENTITY_KEY }))}>
			<Plus className="size-6 me-2" />
			New Applicant
		</Button>
	);
	return (
		<>
			<Card>
				<CardHeader className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
					<CardTitle className="text-xl">{APPLICANT_CONSTANTS.ENTITY_NAME_PLURAL}</CardTitle>
					<div className="flex flex-col sm:flex-row gap-2">
						{newButton}
					</div>
				</CardHeader>

				<CardContent>
					
					<ApplicantTable
						setApplicantCount={setApplicantCount}
						setCurrentPageCount={setCurrentPageCount}
						setCurrentQueryParams={setCurrentQueryParams}
					/>
				</CardContent>
			</Card>
		</>
	);
};

export default ApplicantPage;