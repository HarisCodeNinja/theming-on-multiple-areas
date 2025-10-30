import { z } from "zod";

export const createCourseOfferingPayloadValidator = z.object({
	programId: z.uuid("Invalid UUID format"),
	courseName: z.string({error: "Course Name is required"}),
	description: z.string().nullish().or(z.literal('')),
	startDate: z.date().nullish(),
	endDate: z.date().nullish(),
	maxCapacity: z.number().int().nullish(),
	currentEnrollment: z.number().int({error: "Current Enrollment is required"}),
	isActive: z.boolean().refine(val => val === true || val === false, "Must be active or inactive"),
});


export const updateCourseOfferingPayloadValidator = z.object({
	programId: z.uuid("Invalid UUID format"),
	courseName: z.string({error: "Course Name is required"}),
	description: z.string().nullish().or(z.literal('')),
	startDate: z.date().nullish(),
	endDate: z.date().nullish(),
	maxCapacity: z.number().int().nullish(),
	currentEnrollment: z.number().int({error: "Current Enrollment is required"}),
	isActive: z.boolean().refine(val => val === true || val === false, "Must be active or inactive"),
});


