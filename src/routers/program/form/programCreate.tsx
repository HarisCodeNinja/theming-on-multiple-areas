import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input, Textarea, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
import dayjs from 'dayjs';
import { DATE_FORMATE, DATE_TIME_FORMATE } from '@/config/constant';
import DatePicker from '@/components/DatePicker';
import { z } from 'zod';
import PROGRAM_CONSTANTS from '../constants';
import { createProgramPayloadValidator } from '../validation';
import { FieldError } from '@/components/ErrorMessage';


interface ProgramFormProps {
}

const ProgramForm: React.FC<ProgramFormProps> = ({ }) => {
	const form = useFormContext<z.infer<typeof createProgramPayloadValidator>>();


	return (
		<Form {...form}>
			<div className="grid grid-cols-1 lg:grid-cols-1 gap-6 items-start">
<FormField
                    control={form.control}
                    name="programName"
                    render={({ field: fieldProps }) => (
                        <FormItem>
                            <FormLabel>Program Name <span className="text-destructive">*</span></FormLabel>
                            <FormControl>
                                <Input 
                                    type="text"
                                    placeholder="Enter Program Name"
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
                    name="description"
                    render={({ field: fieldProps }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea 
                                    placeholder="Enter Description"                                    
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
                    name="programType"
                    render={({ field: fieldProps }) => (
                        <FormItem>
                            <FormLabel>Program Type</FormLabel>
                            <FormControl>
                                <Select onValueChange={fieldProps.onChange} value={fieldProps.value?.toString() || ''}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Program Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {["PreReq", "PostReq", "Optional"].map((option) => (
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
                    name="duration"
                    render={({ field: fieldProps }) => (
                        <FormItem>
                            <FormLabel>Duration</FormLabel>
                            <FormControl>
                                <Input 
                                    type="text"
                                    placeholder="Enter Duration"
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
                    name="fee"
                    render={({ field: fieldProps }) => (
                        <FormItem>
                            <FormLabel>Fees</FormLabel>
                            <FormControl>
                                <Input 
                                    type="number"
                                    step="0.01"
                                    placeholder="Enter Fees"
                                    {...fieldProps}
                                    value={fieldProps.value?.toString() || ''}
                                    onChange={(e) => fieldProps.onChange(parseFloat(e.target.value) || 0)}
                                />
                            </FormControl>
                            
                            <FormMessage />
                        </FormItem>
                    )}
                />
<FormField
                    control={form.control}
                    name="applicationDeadline"
                    render={({ field: fieldProps }) => (
                        <FormItem>
                            <FormLabel>Application Deadline</FormLabel>
                            <FormControl>
                                <DatePicker value={fieldProps.value || undefined } onChange={fieldProps.onChange} placeholder="Select Application Deadline" />
                            </FormControl>
                            
                            <FormMessage />
                        </FormItem>
                    )}
                />
<FormField
                    control={form.control}
                    name="isActive"
                    render={({ field: fieldProps }) => (
                        <FormItem>
                            <FormLabel>Is Active <span className="text-destructive">*</span></FormLabel>
                            <FormControl>
                                <Select onValueChange={(value) => fieldProps.onChange(value === 'true')} value={fieldProps.value?.toString() || ''}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Active/Inactive" />
                                </SelectTrigger>
                                <SelectContent>
                                    {[{"value":"true","label":"Active"},{"value":"false","label":"Inactive"}].map((option) => (
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

export default ProgramForm;