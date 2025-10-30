import { z } from "zod";

export const createApplicationPayloadValidator = z.object({
	applicantId: z.uuid("Invalid UUID format"),
	programId: z.uuid("Invalid UUID format"),
	applicationDate: z.date({error: "Application Date is required"}),
	submissionStatus: z.string({error: "Submission Status is required"}),
	applicationFeePaid: z.boolean().refine(val => val === true || val === false, "Must be yes or no"),
	paymentId: z.uuid("Invalid UUID format").nullish(),
	currentDecisionId: z.uuid("Invalid UUID format").nullish(),
});


export const updateApplicationPayloadValidator = z.object({
	applicantId: z.uuid("Invalid UUID format"),
	programId: z.uuid("Invalid UUID format"),
	submissionStatus: z.string({error: "Submission Status is required"}),
	applicationFeePaid: z.boolean().refine(val => val === true || val === false, "Must be yes or no"),
	paymentId: z.uuid("Invalid UUID format").nullish(),
	currentDecisionId: z.uuid("Invalid UUID format").nullish(),
});


