import { Pager, QueryPager } from '@/interface/common';


export interface IAuditTrailPrimaryKeys {
	auditId: string;
}


export interface IAuditTrail {
	auditId: string;
	entityType: string;
	entityId: string;
	action: string;
	changedByUserId?: string;
	oldValue?: object;
	newValue?: object;
}


export interface IAuditTrailIndex extends IAuditTrail {
	changeTimestamp: Date;
	auditTrailLabel: string;
}

export interface IAuditTrailPager{
	data: IAuditTrailIndex[];
	meta: Pager;
}

export interface IAuditTrailQueryParams extends QueryPager {}

export interface IAuditTrailSingle extends IAuditTrail {
	changeTimestamp: Date;
}

