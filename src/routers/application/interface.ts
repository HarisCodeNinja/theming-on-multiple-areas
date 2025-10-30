import { createApplicationPayloadValidator, updateApplicationPayloadValidator } from './validation';
import { z } from 'zod';
import { Pager, QueryPager } from '@/interface/common';


export interface IApplicationPrimaryKeys {
	applicationId: string;
}


export interface IApplication {
	applicationId: string;
	applicantId: string;
	programId: string;
	applicationDate: Date;
	submissionStatus: string;
	applicationFeePaid: boolean;
	paymentId?: string;
	currentDecisionId?: string;
}


export interface IApplicationAdd extends z.infer<typeof createApplicationPayloadValidator> {}
export interface IApplicationEdit extends z.infer<typeof updateApplicationPayloadValidator> {}
export interface IApplicationIndex extends IApplication {
	createdAt: Date;
	updatedAt: Date;
	applicationLabel: string;
}

export interface IApplicationPager{
	data: IApplicationIndex[];
	meta: Pager;
}

export interface IApplicationQueryParams extends QueryPager {}

export interface IApplicationSingle extends IApplication {
	createdAt: Date;
	updatedAt: Date;
}

