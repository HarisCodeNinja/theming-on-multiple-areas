import { createInterviewPayloadValidator, updateInterviewPayloadValidator } from './validation';
import { z } from 'zod';
import { Pager, QueryPager } from '@/interface/common';


export interface IInterviewPrimaryKeys {
	interviewId: string;
}


export interface IInterview {
	interviewId: string;
	applicationId: string;
	admissionsOfficerId: string;
	interviewDate: Date;
	interviewType?: string;
	note?: string;
	outcome?: string;
}


export interface IInterviewAdd extends z.infer<typeof createInterviewPayloadValidator> {}
export interface IInterviewEdit extends z.infer<typeof updateInterviewPayloadValidator> {}
export interface IInterviewIndex extends IInterview {
	createdAt: Date;
	updatedAt: Date;
	interviewLabel: string;
}

export interface IInterviewPager{
	data: IInterviewIndex[];
	meta: Pager;
}

export interface IInterviewQueryParams extends QueryPager {}

export interface IInterviewSingle extends IInterview {
	createdAt: Date;
	updatedAt: Date;
}

