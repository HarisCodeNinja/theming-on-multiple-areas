import { z } from "zod";

export const createInterviewPayloadValidator = z.object({
	applicationId: z.uuid("Invalid UUID format"),
	admissionsOfficerId: z.uuid("Invalid UUID format"),
	interviewDate: z.date({error: "Interview Date is required"}),
	interviewType: z.string().nullish(),
	note: z.string().nullish().or(z.literal('')),
	outcome: z.string().nullish(),
});


export const updateInterviewPayloadValidator = z.object({
	applicationId: z.uuid("Invalid UUID format"),
	admissionsOfficerId: z.uuid("Invalid UUID format"),
	interviewDate: z.date({error: "Interview Date is required"}),
	interviewType: z.string().nullish(),
	note: z.string().nullish().or(z.literal('')),
	outcome: z.string().nullish(),
});


