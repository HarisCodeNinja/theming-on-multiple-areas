import { z } from "zod";

export const createApplicantPayloadValidator = z.object({
	userId: z.uuid("Invalid UUID format"),
	firstName: z.string({error: "First Name is required"}),
	lastName: z.string({error: "Last Name is required"}),
	dateOfBirth: z.date().nullish(),
	gender: z.string().nullish(),
	nationality: z.string().nullish().or(z.literal('')),
	address: z.string().nullish().or(z.literal('')),
	phoneNumber: z.string().nullish().or(z.literal('')),
	status: z.string({error: "Status is required"}),
});


export const updateApplicantPayloadValidator = z.object({
	userId: z.uuid("Invalid UUID format"),
	firstName: z.string({error: "First Name is required"}),
	lastName: z.string({error: "Last Name is required"}),
	dateOfBirth: z.date().nullish(),
	gender: z.string().nullish(),
	nationality: z.string().nullish().or(z.literal('')),
	address: z.string().nullish().or(z.literal('')),
	phoneNumber: z.string().nullish().or(z.literal('')),
	status: z.string({error: "Status is required"}),
});


