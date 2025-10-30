import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input, Textarea, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
import dayjs from 'dayjs';
import { DATE_FORMATE, DATE_TIME_FORMATE } from '@/config/constant';
import DatePicker from '@/components/DatePicker';
import { z } from 'zod';
import COURSEOFFERING_CONSTANTS from '../constants';
import { createCourseOfferingPayloadValidator } from '../validation';
import { FieldError } from '@/components/ErrorMessage';
import { useProgramOptions } from '../../../option-hooks/useProgramOptions';


interface CourseOfferingFormProps {
}

const CourseOfferingForm: React.FC<CourseOfferingFormProps> = ({ }) => {
	const form = useFormContext<z.infer<typeof createCourseOfferingPayloadValidator>>();

const { programs: program  } = useProgramOptions();

	return (
		<Form {...form}>
			<div className="grid grid-cols-1 lg:grid-cols-1 gap-6 items-start">
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
                    name="courseName"
                    render={({ field: fieldProps }) => (
                        <FormItem>
                            <FormLabel>Course Name <span className="text-destructive">*</span></FormLabel>
                            <FormControl>
                                <Input 
                                    type="text"
                                    placeholder="Enter Course Name"
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
                    name="startDate"
                    render={({ field: fieldProps }) => (
                        <FormItem>
                            <FormLabel>Start Date</FormLabel>
                            <FormControl>
                                <DatePicker value={fieldProps.value || undefined } onChange={fieldProps.onChange} placeholder="Select Start Date" />
                            </FormControl>
                            
                            <FormMessage />
                        </FormItem>
                    )}
                />
<FormField
                    control={form.control}
                    name="endDate"
                    render={({ field: fieldProps }) => (
                        <FormItem>
                            <FormLabel>End Date</FormLabel>
                            <FormControl>
                                <DatePicker value={fieldProps.value || undefined } onChange={fieldProps.onChange} placeholder="Select End Date" />
                            </FormControl>
                            
                            <FormMessage />
                        </FormItem>
                    )}
                />
<FormField
                    control={form.control}
                    name="maxCapacity"
                    render={({ field: fieldProps }) => (
                        <FormItem>
                            <FormLabel>Max Capacity</FormLabel>
                            <FormControl>
                                <Input 
                                    type="number"
                                    
                                    placeholder="Enter Max Capacity"
                                    {...fieldProps}
                                    value={fieldProps.value?.toString() || ''}
                                    onChange={(e) => fieldProps.onChange(parseInt(e.target.value) || 0)}
                                />
                            </FormControl>
                            
                            <FormMessage />
                        </FormItem>
                    )}
                />
<FormField
                    control={form.control}
                    name="currentEnrollment"
                    render={({ field: fieldProps }) => (
                        <FormItem>
                            <FormLabel>Current Enrollment <span className="text-destructive">*</span></FormLabel>
                            <FormControl>
                                <Input 
                                    type="number"
                                    
                                    placeholder="Enter Current Enrollment"
                                    {...fieldProps}
                                    value={fieldProps.value?.toString() || ''}
                                    onChange={(e) => fieldProps.onChange(parseInt(e.target.value) || 0)}
                                />
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

export default CourseOfferingForm;