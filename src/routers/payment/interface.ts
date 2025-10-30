import { createPaymentPayloadValidator, updatePaymentPayloadValidator } from './validation';
import { z } from 'zod';
import { Pager, QueryPager } from '@/interface/common';


export interface IPaymentPrimaryKeys {
	paymentId: string;
}


export interface IPayment {
	paymentId: string;
	applicationId: string;
	amount: number;
	paymentDate: Date;
	transactionId: string;
	paymentMethod?: string;
	status: string;
}


export interface IPaymentAdd extends z.infer<typeof createPaymentPayloadValidator> {}
export interface IPaymentEdit extends z.infer<typeof updatePaymentPayloadValidator> {}
export interface IPaymentIndex extends IPayment {
	createdAt: Date;
	updatedAt: Date;
	paymentLabel: string;
}

export interface IPaymentPager{
	data: IPaymentIndex[];
	meta: Pager;
}

export interface IPaymentQueryParams extends QueryPager {}

export interface IPaymentSingle extends IPayment {
	createdAt: Date;
	updatedAt: Date;
}

