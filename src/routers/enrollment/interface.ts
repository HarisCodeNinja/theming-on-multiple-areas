import { createEnrollmentPayloadValidator, updateEnrollmentPayloadValidator } from './validation';
import { z } from 'zod';
import { Pager, QueryPager } from '@/interface/common';


export interface IEnrollmentPrimaryKeys {
	enrollmentId: string;
}


export interface IEnrollment {
	enrollmentId: string;
	applicationId: string;
	programId: string;
	enrollmentDate: Date;
	studentIdInSi?: string;
	status: string;
}


export interface IEnrollmentAdd extends z.infer<typeof createEnrollmentPayloadValidator> {}
export interface IEnrollmentEdit extends z.infer<typeof updateEnrollmentPayloadValidator> {}
export interface IEnrollmentIndex extends IEnrollment {
	createdAt: Date;
	updatedAt: Date;
	enrollmentLabel: string;
}

export interface IEnrollmentPager{
	data: IEnrollmentIndex[];
	meta: Pager;
}

export interface IEnrollmentQueryParams extends QueryPager {}

export interface IEnrollmentSingle extends IEnrollment {
	createdAt: Date;
	updatedAt: Date;
}

