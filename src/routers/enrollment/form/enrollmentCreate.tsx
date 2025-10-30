import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
import dayjs from 'dayjs';
import { DATE_FORMATE, DATE_TIME_FORMATE } from '@/config/constant';
import DatePicker from '@/components/DatePicker';
import { z } from 'zod';
import ENROLLMENT_CONSTANTS from '../constants';
import { createEnrollmentPayloadValidator } from '../validation';
import { FieldError } from '@/components/ErrorMessage';
import { useApplicationOptions } from '../../../option-hooks/useApplicationOptions';
import { useProgramOptions } from '../../../option-hooks/useProgramOptions';


interface EnrollmentFormProps {
}

const EnrollmentForm: React.FC<EnrollmentFormProps> = ({ }) => {
	const form = useFormContext<z.infer<typeof createEnrollmentPayloadValidator>>();

const { applications: application  } = useApplicationOptions();
const { programs: program  } = useProgramOptions();

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
                    name="enrollmentDate"
                    render={({ field: fieldProps }) => (
                        <FormItem>
                            <FormLabel>Enrollment Date <span className="text-destructive">*</span></FormLabel>
                            <FormControl>
                                <DatePicker value={fieldProps.value || undefined } onChange={fieldProps.onChange} placeholder="Select Enrollment Date" />
                            </FormControl>
                            
                            <FormMessage />
                        </FormItem>
                    )}
                />
<FormField
                    control={form.control}
                    name="studentIdInSi"
                    render={({ field: fieldProps }) => (
                        <FormItem>
                            <FormLabel>Student Id In Sis</FormLabel>
                            <FormControl>
                                <Input 
                                    type="text"
                                    placeholder="Enter Student Id In Sis"
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
                    name="status"
                    render={({ field: fieldProps }) => (
                        <FormItem>
                            <FormLabel>Status <span className="text-destructive">*</span></FormLabel>
                            <FormControl>
                                <Select onValueChange={fieldProps.onChange} value={fieldProps.value?.toString() || ''}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Status" />
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

export default EnrollmentForm;