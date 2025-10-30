import { createApplicantPayloadValidator, updateApplicantPayloadValidator } from './validation';
import { z } from 'zod';
import { Pager, QueryPager } from '@/interface/common';


export interface IApplicantPrimaryKeys {
	applicantId: string;
}


export interface IApplicant {
	applicantId: string;
	userId: string;
	firstName: string;
	lastName: string;
	dateOfBirth?: Date;
	gender?: string;
	nationality?: string;
	address?: string;
	phoneNumber?: string;
	status: string;
}


export interface IApplicantAdd extends z.infer<typeof createApplicantPayloadValidator> {}
export interface IApplicantEdit extends z.infer<typeof updateApplicantPayloadValidator> {}
export interface IApplicantIndex extends IApplicant {
	createdAt: Date;
	updatedAt: Date;
	applicantLabel: string;
}

export interface IApplicantPager{
	data: IApplicantIndex[];
	meta: Pager;
}

export interface IApplicantQueryParams extends QueryPager {}

export interface IApplicantSingle extends IApplicant {
	createdAt: Date;
	updatedAt: Date;
}

