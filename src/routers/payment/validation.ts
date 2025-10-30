import { z } from "zod";

export const createPaymentPayloadValidator = z.object({
	applicationId: z.uuid("Invalid UUID format"),
	amount: z.number({error: "Amount is required"}),
	paymentDate: z.date({error: "Payment Date is required"}),
	transactionId: z.string({error: "Transaction Id is required"}),
	paymentMethod: z.string().nullish().or(z.literal('')),
	status: z.string({error: "Status is required"}),
});


export const updatePaymentPayloadValidator = z.object({
	applicationId: z.uuid("Invalid UUID format"),
	amount: z.number({error: "Amount is required"}),
	transactionId: z.string({error: "Transaction Id is required"}),
	paymentMethod: z.string().nullish().or(z.literal('')),
	status: z.string({error: "Status is required"}),
});


