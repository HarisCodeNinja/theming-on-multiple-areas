import { z } from "zod";

export const createDecisionPayloadValidator = z.object({
	applicationId: z.uuid("Invalid UUID format"),
	decisionType: z.string({error: "Decision Type is required"}),
	decisionDate: z.date({error: "Decision Date is required"}),
	communicatedDate: z.date().nullish(),
	communicatedByUserId: z.uuid("Invalid UUID format").nullish(),
	note: z.string().nullish().or(z.literal('')),
});


export const updateDecisionPayloadValidator = z.object({
	applicationId: z.uuid("Invalid UUID format"),
	decisionType: z.string({error: "Decision Type is required"}),
	decisionDate: z.date({error: "Decision Date is required"}),
	communicatedDate: z.date().nullish(),
	communicatedByUserId: z.uuid("Invalid UUID format").nullish(),
	note: z.string().nullish().or(z.literal('')),
});


