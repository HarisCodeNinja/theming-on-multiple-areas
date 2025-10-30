import React, { useState, useMemo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import { hasAccess } from '@/util/AccessControl';
import PaymentTable from './component/paymentTable';
import PAYMENT_CONSTANTS from './constants';
import { openNewForm } from '@/store/slice/selectedObjSlice';

const PaymentPage: React.FC = () => {
	const [paymentCount, setPaymentCount] = useState<number | null>(null);
	const [currentPageCount, setCurrentPageCount] = useState<number>(0);
	const [currentQueryParams, setCurrentQueryParams] = useState<Record<string, any>>({});
	

	const dispatch = useAppDispatch();
	const user = useAppSelector((state: RootState) => state.session.user);

	

	const canCreatePayment = useMemo(() => {
		return user && hasAccess(user.scope, PAYMENT_CONSTANTS.PERMISSIONS.MODULE, PAYMENT_CONSTANTS.PERMISSIONS.RESOURCE, PAYMENT_CONSTANTS.PERMISSIONS.ACTIONS.EDIT);
	}, [user]);

	const canExportImport = useMemo(() => {
		return user && hasAccess(user.scope, PAYMENT_CONSTANTS.PERMISSIONS.MODULE, PAYMENT_CONSTANTS.PERMISSIONS.RESOURCE, PAYMENT_CONSTANTS.PERMISSIONS.ACTIONS.VIEW);
	}, [user]);

	const newButton = canCreatePayment && (
		<Button onClick={() => dispatch(openNewForm({ objKey: PAYMENT_CONSTANTS.ENTITY_KEY }))}>
			<Plus className="size-6 me-2" />
			New Payment
		</Button>
	);
	return (
		<>
			<Card>
				<CardHeader className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
					<CardTitle className="text-xl">{PAYMENT_CONSTANTS.ENTITY_NAME_PLURAL}</CardTitle>
					<div className="flex flex-col sm:flex-row gap-2">
						{newButton}
					</div>
				</CardHeader>

				<CardContent>
					
					<PaymentTable
						setPaymentCount={setPaymentCount}
						setCurrentPageCount={setCurrentPageCount}
						setCurrentQueryParams={setCurrentQueryParams}
					/>
				</CardContent>
			</Card>
		</>
	);
};

export default PaymentPage;