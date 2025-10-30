import { createAdmissionsOfficerPayloadValidator, updateAdmissionsOfficerPayloadValidator } from './validation';
import { z } from 'zod';
import { Pager, QueryPager } from '@/interface/common';


export interface IAdmissionsOfficerPrimaryKeys {
	admissionsOfficerId: string;
}


export interface IAdmissionsOfficer {
	admissionsOfficerId: string;
	userId: string;
	department?: string;
	title?: string;
}


export interface IAdmissionsOfficerAdd extends z.infer<typeof createAdmissionsOfficerPayloadValidator> {}
export interface IAdmissionsOfficerEdit extends z.infer<typeof updateAdmissionsOfficerPayloadValidator> {}
export interface IAdmissionsOfficerIndex extends IAdmissionsOfficer {
	createdAt: Date;
	updatedAt: Date;
	admissionsOfficerLabel: string;
}

export interface IAdmissionsOfficerPager{
	data: IAdmissionsOfficerIndex[];
	meta: Pager;
}

export interface IAdmissionsOfficerQueryParams extends QueryPager {}

export interface IAdmissionsOfficerSingle extends IAdmissionsOfficer {
	createdAt: Date;
	updatedAt: Date;
}

