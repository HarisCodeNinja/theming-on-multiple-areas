import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
import dayjs from 'dayjs';
import { DATE_FORMATE, DATE_TIME_FORMATE } from '@/config/constant';
import DatePicker from '@/components/DatePicker';
import { z } from 'zod';
import APPLICATION_CONSTANTS from '../constants';
import { createApplicationPayloadValidator } from '../validation';
import { FieldError } from '@/components/ErrorMessage';
import { useApplicantOptions } from '../../../option-hooks/useApplicantOptions';
import { useProgramOptions } from '../../../option-hooks/useProgramOptions';
import { usePaymentOptions } from '../../../option-hooks/usePaymentOptions';
import { useDecisionOptions } from '../../../option-hooks/useDecisionOptions';


interface ApplicationFormProps {
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({ }) => {
	const form = useFormContext<z.infer<typeof createApplicationPayloadValidator>>();

const { applicants: applicant  } = useApplicantOptions();
const { programs: program  } = useProgramOptions();
const { payments: payment  } = usePaymentOptions();
const { decisions: currentDecision  } = useDecisionOptions();

	return (
		<Form {...form}>
			<div className="grid grid-cols-1 lg:grid-cols-1 gap-6 items-start">
<FormField
                    control={form.control}
                    name="applicantId"
                    render={({ field: fieldProps }) => (
                        <FormItem>
                            <FormLabel>Applicant <span className="text-destructive">*</span></FormLabel>
                            <FormControl>
                                <Select onValueChange={fieldProps.onChange} value={fieldProps.value?.toString() || ''}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Applicant" />
                                </SelectTrigger>
                                <SelectContent>
                                    {applicant?.map((option) => (
                                        <SelectItem key={option.value} value={option.value.toString()}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            </FormControl>
                            
                            <FormMessage />
                        </FormItem>
                    )}
                />
<FormField
                    control={form.control}
                    name="programId"
                    render={({ field: fieldProps }) => (
                        <FormItem>
                            <FormLabel>Program <span className="text-destructive">*</span></FormLabel>
                            <FormControl>
                                <Select onValueChange={fieldProps.onChange} value={fieldProps.value?.toString() || ''}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Program" />
                                </SelectTrigger>
                                <SelectContent>
                                    {program?.map((option) => (
                                        <SelectItem key={option.value} value={option.value.toString()}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            </FormControl>
                            
                            <FormMessage />
                        </FormItem>
                    )}
                />
<FormField
                    control={form.control}
                    name="applicationDate"
                    render={({ field: fieldProps }) => (
                        <FormItem>
                            <FormLabel>Application Date <span className="text-destructive">*</span></FormLabel>
                            <FormControl>
                                <DatePicker value={fieldProps.value || undefined } onChange={fieldProps.onChange} placeholder="Select Application Date" />
                            </FormControl>
                            
                            <FormMessage />
                        </FormItem>
                    )}
                />
<FormField
                    control={form.control}
                    name="submissionStatus"
                    render={({ field: fieldProps }) => (
                        <FormItem>
                            <FormLabel>Submission Status <span className="text-destructive">*</span></FormLabel>
                            <FormControl>
                                <Select onValueChange={fieldProps.onChange} value={fieldProps.value?.toString() || ''}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Submission Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    {[].map((option) => (
                                            <SelectItem key={option} value={option}>
                                                {option}
                                            </SelectItem>
                                        ))}
                                </SelectContent>
                            </Select>
                            </FormControl>
                            
                            <FormMessage />
                        </FormItem>
                    )}
                />
<FormField
                    control={form.control}
                    name="applicationFeePaid"
                    render={({ field: fieldProps }) => (
                        <FormItem>
                            <FormLabel>Application Fee Paid <span className="text-destructive">*</span></FormLabel>
                            <FormControl>
                                <Select onValueChange={(value) => fieldProps.onChange(value === 'true')} value={fieldProps.value?.toString() || ''}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Yes/No" />
                                </SelectTrigger>
                                <SelectContent>
                                    {[{"value":"true","label":"Yes"},{"value":"false","label":"No"}].map((option) => (
                                            <SelectItem key={option.value} value={option.value.toString()}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                </SelectContent>
                            </Select>
                            </FormControl>
                            
                            <FormMessage />
                        </FormItem>
                    )}
                />
<FormField
                    control={form.control}
                    name="paymentId"
                    render={({ field: fieldProps }) => (
                        <FormItem>
                            <FormLabel>Payment</FormLabel>
                            <FormControl>
                                <Select onValueChange={fieldProps.onChange} value={fieldProps.value?.toString() || ''}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Payment" />
                                </SelectTrigger>
                                <SelectContent>
                                    {payment?.map((option) => (
                                        <SelectItem key={option.value} value={option.value.toString()}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            </FormControl>
                            
                            <FormMessage />
                        </FormItem>
                    )}
                />
<FormField
                    control={form.control}
                    name="currentDecisionId"
                    render={({ field: fieldProps }) => (
                        <FormItem>
                            <FormLabel>Current Decision</FormLabel>
                            <FormControl>
                                <Select onValueChange={fieldProps.onChange} value={fieldProps.value?.toString() || ''}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Current Decision" />
                                </SelectTrigger>
                                <SelectContent>
                                    {currentDecision?.map((option) => (
                                        <SelectItem key={option.value} value={option.value.toString()}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            </FormControl>
                            
                            <FormMessage />
                        </FormItem>
                    )}
                />
			</div>
		</Form>
	);
};

export default ApplicationForm;