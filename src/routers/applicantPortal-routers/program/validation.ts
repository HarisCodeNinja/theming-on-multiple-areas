import { z } from "zod";

export const createProgramPayloadValidator = z.object({
	programName: z.string({error: "Program Name is required"}),
	description: z.string().nullish().or(z.literal('')),
	programType: z.string().nullish(),
	duration: z.string().nullish().or(z.literal('')),
	fee: z.number().nullish(),
	applicationDeadline: z.date().nullish(),
	isActive: z.boolean().refine(val => val === true || val === false, "Must be active or inactive"),
});


export const updateProgramPayloadValidator = z.object({
	programName: z.string({error: "Program Name is required"}),
	description: z.string().nullish().or(z.literal('')),
	programType: z.string().nullish(),
	duration: z.string().nullish().or(z.literal('')),
	fee: z.number().nullish(),
	applicationDeadline: z.date().nullish(),
	isActive: z.boolean().refine(val => val === true || val === false, "Must be active or inactive"),
});


export const searchProgramSchema = z.object({
	programName: z.string().nullish().or(z.literal('')),
	programType: z.string().nullish(),
});


