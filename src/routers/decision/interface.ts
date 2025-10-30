import { createDecisionPayloadValidator, updateDecisionPayloadValidator } from './validation';
import { z } from 'zod';
import { Pager, QueryPager } from '@/interface/common';


export interface IDecisionPrimaryKeys {
	decisionId: string;
}


export interface IDecision {
	decisionId: string;
	applicationId: string;
	decisionType: string;
	decisionDate: Date;
	communicatedDate?: Date;
	communicatedByUserId?: string;
	note?: string;
}


export interface IDecisionAdd extends z.infer<typeof createDecisionPayloadValidator> {}
export interface IDecisionEdit extends z.infer<typeof updateDecisionPayloadValidator> {}
export interface IDecisionIndex extends IDecision {
	createdAt: Date;
	updatedAt: Date;
	decisionLabel: string;
}

export interface IDecisionPager{
	data: IDecisionIndex[];
	meta: Pager;
}

export interface IDecisionQueryParams extends QueryPager {}

export interface IDecisionSingle extends IDecision {
	createdAt: Date;
	updatedAt: Date;
}

