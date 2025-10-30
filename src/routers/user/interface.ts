import { createUserPayloadValidator, updateUserPayloadValidator } from './validation';
import { z } from 'zod';
import { Pager, QueryPager } from '@/interface/common';


export interface IUserPrimaryKeys {
	userId: string;
}


export interface IUser {
	userId: string;
	email: string;
	username: string;
	password: string;
	role: string;
}


export interface IUserAdd extends z.infer<typeof createUserPayloadValidator> {}
export interface IUserEdit extends z.infer<typeof updateUserPayloadValidator> {}
export interface IUserIndex extends Omit<IUser, 'password'> {
	createdAt: Date;
	updatedAt: Date;
	userLabel: string;
}

export interface IUserPager{
	data: IUserIndex[];
	meta: Pager;
}

export interface IUserQueryParams extends QueryPager {}

export interface IUserSingle extends Omit<IUser, 'password'> {
	createdAt: Date;
	updatedAt: Date;
}

