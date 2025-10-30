import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input, Textarea, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
import dayjs from 'dayjs';
import { DATE_FORMATE, DATE_TIME_FORMATE } from '@/config/constant';
import DatePicker from '@/components/DatePicker';
import { z } from 'zod';
import INTERVIEW_CONSTANTS from '../constants';
import { updateInterviewPayloadValidator } from '../validation';
import { FieldError } from '@/components/ErrorMessage';
import { useApplicationOptions } from '../../../option-hooks/useApplicationOptions';
import { useAdmissionsOfficerOptions } from '../../../option-hooks/useAdmissionsOfficerOptions';


interface InterviewFormProps {
}

const InterviewForm: React.FC<InterviewFormProps> = ({ }) => {
	const form = useFormContext<z.infer<typeof updateInterviewPayloadValidator>>();

const { applications: application  } = useApplicationOptions();
const { admissionsOfficers: admissionsOfficer  } = useAdmissionsOfficerOptions();

	return (
		<Form {...form}>
			<div className="grid grid-cols-1 lg:grid-cols-1 gap-6 items-start">
<FormField
                    control={form.control}
                    name="applicationId"
                    render={({ field: fieldProps }) => (
                        <FormItem>
                            <FormLabel>Application <span className="text-destructive">*</span></FormLabel>
                            <FormControl>
                                <Select onValueChange={fieldProps.onChange} value={fieldProps.value?.toString() || ''}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Application" />
                                </SelectTrigger>
                                <SelectContent>
                                    {application?.map((option) => (
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
                    name="admissionsOfficerId"
                    render={({ field: fieldProps }) => (
                        <FormItem>
                            <FormLabel>Admissions Officer <span className="text-destructive">*</span></FormLabel>
                            <FormControl>
                                <Select onValueChange={fieldProps.onChange} value={fieldProps.value?.toString() || ''}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Admissions Officer" />
                                </SelectTrigger>
                                <SelectContent>
                                    {admissionsOfficer?.map((option) => (
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
                    name="interviewDate"
                    render={({ field: fieldProps }) => (
                        <FormItem>
                            <FormLabel>Interview Date <span className="text-destructive">*</span></FormLabel>
                            <FormControl>
                                <DatePicker value={fieldProps.value || undefined } onChange={fieldProps.onChange} placeholder="Select Interview Date" />
                            </FormControl>
                            
                            <FormMessage />
                        </FormItem>
                    )}
                />
<FormField
                    control={form.control}
                    name="interviewType"
                    render={({ field: fieldProps }) => (
                        <FormItem>
                            <FormLabel>Interview Type</FormLabel>
                            <FormControl>
                                <Select onValueChange={fieldProps.onChange} value={fieldProps.value?.toString() || ''}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Interview Type" />
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
                    name="note"
                    render={({ field: fieldProps }) => (
                        <FormItem>
                            <FormLabel>Notes</FormLabel>
                            <FormControl>
                                <Textarea 
                                    placeholder="Enter Notes"                                    
                                    className="resize-none"
                                    rows={3}
                                    {...fieldProps}
                                    value={fieldProps.value?.toString() || ''}
                                />
                            </FormControl>
                            
                            <FormMessage />
                        </FormItem>
                    )}
                />
<FormField
                    control={form.control}
                    name="outcome"
                    render={({ field: fieldProps }) => (
                        <FormItem>
                            <FormLabel>Outcome</FormLabel>
                            <FormControl>
                                <Select onValueChange={fieldProps.onChange} value={fieldProps.value?.toString() || ''}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Outcome" />
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
			</div>
		</Form>
	);
};

export default InterviewForm;