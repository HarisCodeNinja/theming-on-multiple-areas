import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input, Textarea, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
import dayjs from 'dayjs';
import { DATE_FORMATE, DATE_TIME_FORMATE } from '@/config/constant';
import DatePicker from '@/components/DatePicker';
import { z } from 'zod';
import DECISION_CONSTANTS from '../constants';
import { createDecisionPayloadValidator } from '../validation';
import { FieldError } from '@/components/ErrorMessage';
import { useApplicationOptions } from '../../../option-hooks/useApplicationOptions';
import { useUserOptions } from '../../../option-hooks/useUserOptions';


interface DecisionFormProps {
}

const DecisionForm: React.FC<DecisionFormProps> = ({ }) => {
	const form = useFormContext<z.infer<typeof createDecisionPayloadValidator>>();

const { applications: application  } = useApplicationOptions();
const { users: communicatedByUser  } = useUserOptions();

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
                    name="decisionType"
                    render={({ field: fieldProps }) => (
                        <FormItem>
                            <FormLabel>Decision Type <span className="text-destructive">*</span></FormLabel>
                            <FormControl>
                                <Select onValueChange={fieldProps.onChange} value={fieldProps.value?.toString() || ''}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Decision Type" />
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
                    name="decisionDate"
                    render={({ field: fieldProps }) => (
                        <FormItem>
                            <FormLabel>Decision Date <span className="text-destructive">*</span></FormLabel>
                            <FormControl>
                                <DatePicker value={fieldProps.value || undefined } onChange={fieldProps.onChange} placeholder="Select Decision Date" />
                            </FormControl>
                            
                            <FormMessage />
                        </FormItem>
                    )}
                />
<FormField
                    control={form.control}
                    name="communicatedDate"
                    render={({ field: fieldProps }) => (
                        <FormItem>
                            <FormLabel>Communicated Date</FormLabel>
                            <FormControl>
                                <DatePicker value={fieldProps.value || undefined } onChange={fieldProps.onChange} placeholder="Select Communicated Date" />
                            </FormControl>
                            
                            <FormMessage />
                        </FormItem>
                    )}
                />
<FormField
                    control={form.control}
                    name="communicatedByUserId"
                    render={({ field: fieldProps }) => (
                        <FormItem>
                            <FormLabel>Communicated By User</FormLabel>
                            <FormControl>
                                <Select onValueChange={fieldProps.onChange} value={fieldProps.value?.toString() || ''}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Communicated By User" />
                                </SelectTrigger>
                                <SelectContent>
                                    {communicatedByUser?.map((option) => (
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
			</div>
		</Form>
	);
};

export default DecisionForm;