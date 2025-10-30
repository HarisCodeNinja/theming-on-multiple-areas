import { z } from "zod";

export const createEnrollmentPayloadValidator = z.object({
	applicationId: z.uuid("Invalid UUID format"),
	programId: z.uuid("Invalid UUID format"),
	enrollmentDate: z.date({error: "Enrollment Date is required"}),
	studentIdInSi: z.string().nullish().or(z.literal('')),
	status: z.string({error: "Status is required"}),
});


export const updateEnrollmentPayloadValidator = z.object({
	applicationId: z.uuid("Invalid UUID format"),
	programId: z.uuid("Invalid UUID format"),
	enrollmentDate: z.date({error: "Enrollment Date is required"}),
	studentIdInSi: z.string().nullish().or(z.literal('')),
	status: z.string({error: "Status is required"}),
});


