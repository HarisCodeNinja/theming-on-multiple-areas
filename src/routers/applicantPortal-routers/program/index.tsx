import React, { useState, useMemo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { hasAccess } from '@/util/AccessControl';
import ProgramTable from './component/programTable';
import SearchContainer from './component/programSearchContainer';
import { IProgramFilters } from './interface';
import PROGRAM_CONSTANTS from './constants';
import { openNewForm } from '@/store/slice/selectedObjSlice';

const ProgramPage: React.FC = () => {
	const [programCount, setProgramCount] = useState<number | null>(null);
	const [currentPageCount, setCurrentPageCount] = useState<number>(0);
	const [currentQueryParams, setCurrentQueryParams] = useState<Record<string, any>>({});
	
	const [filterKeys, setFilterKeys] = useState<IProgramFilters>({});

	const dispatch = useAppDispatch();
	const user = useAppSelector((state: RootState) => state.session.user);

	const handleFiltersChange = useCallback((filters: IProgramFilters) => {
		setFilterKeys(filters);
	}, []);

	const canCreateProgram = useMemo(() => {
		return user && hasAccess(user.scope, PROGRAM_CONSTANTS.PERMISSIONS.MODULE, PROGRAM_CONSTANTS.PERMISSIONS.RESOURCE, PROGRAM_CONSTANTS.PERMISSIONS.ACTIONS.EDIT);
	}, [user]);

	const canExportImport = useMemo(() => {
		return user && hasAccess(user.scope, PROGRAM_CONSTANTS.PERMISSIONS.MODULE, PROGRAM_CONSTANTS.PERMISSIONS.RESOURCE, PROGRAM_CONSTANTS.PERMISSIONS.ACTIONS.VIEW);
	}, [user]);

	const newButton = canCreateProgram && (
		<Button onClick={() => dispatch(openNewForm({ objKey: PROGRAM_CONSTANTS.ENTITY_KEY }))}>
			<Plus className="size-6 me-2" />
			New Program
		</Button>
	);
	return (
		<>
			<Card>
				<CardHeader className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
					<CardTitle className="text-xl">{PROGRAM_CONSTANTS.ENTITY_NAME_PLURAL}</CardTitle>
					<div className="flex flex-col sm:flex-row gap-2">
						{newButton}
					</div>
				</CardHeader>

				<CardContent>
					<div className="border-t py-5">
						<SearchContainer onFiltersChange={handleFiltersChange} />
					</div>
					<ProgramTable
						setProgramCount={setProgramCount}
						setCurrentPageCount={setCurrentPageCount}
						setCurrentQueryParams={setCurrentQueryParams}
						filterKeys={filterKeys}
					/>
				</CardContent>
			</Card>
		</>
	);
};

export default ProgramPage;