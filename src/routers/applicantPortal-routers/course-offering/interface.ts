import { Pager, QueryPager } from '@/interface/common';


export interface ICourseOfferingPrimaryKeys {
	courseOfferingId: string;
}


export interface ICourseOffering {
	courseOfferingId: string;
	programId: string;
	courseName: string;
	description?: string;
	startDate?: Date;
	endDate?: Date;
	maxCapacity?: number;
	currentEnrollment: number;
	isActive: boolean;
}


export interface ICourseOfferingIndex extends ICourseOffering {
	createdAt: Date;
	updatedAt: Date;
	courseOfferingLabel: string;
}

export interface ICourseOfferingPager{
	data: ICourseOfferingIndex[];
	meta: Pager;
}

export interface ICourseOfferingQueryParams extends QueryPager {}

export interface ICourseOfferingSingle extends ICourseOffering {
	createdAt: Date;
	updatedAt: Date;
}

