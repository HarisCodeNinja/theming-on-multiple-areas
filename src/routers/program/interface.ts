import { createProgramPayloadValidator, updateProgramPayloadValidator, searchProgramSchema } from './validation';
import { z } from 'zod';
import { Pager, QueryPager } from '@/interface/common';


export interface IProgramPrimaryKeys {
	programId: string;
}


export interface IProgram {
	programId: string;
	programName: string;
	description?: string;
	programType?: string;
	duration?: string;
	fee?: number;
	applicationDeadline?: Date;
	isActive: boolean;
}


export interface IProgramAdd extends z.infer<typeof createProgramPayloadValidator> {}
export interface IProgramEdit extends z.infer<typeof updateProgramPayloadValidator> {}
export interface IProgramIndex extends IProgram {
	createdAt: Date;
	updatedAt: Date;
	programLabel: string;
}

export interface IProgramPager{
	data: IProgramIndex[];
	meta: Pager;
}

export interface IProgramSearch extends z.infer<typeof searchProgramSchema> {}
export interface IProgramFilters {
	programName?: string;
	programType?: string;
	page?: number;
	pageSize?: number;
	sort?: string;
	sortDirection?: 'asc' | 'desc';
}
export interface IProgramQueryParams extends IProgramFilters {}

export interface IProgramSingle extends IProgram {
	createdAt: Date;
	updatedAt: Date;
}

