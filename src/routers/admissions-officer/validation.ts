import { z } from "zod";

export const createAdmissionsOfficerPayloadValidator = z.object({
	userId: z.uuid("Invalid UUID format"),
	department: z.string().nullish().or(z.literal('')),
	title: z.string().nullish().or(z.literal('')),
});


export const updateAdmissionsOfficerPayloadValidator = z.object({
	userId: z.uuid("Invalid UUID format"),
	department: z.string().nullish().or(z.literal('')),
	title: z.string().nullish().or(z.literal('')),
});


