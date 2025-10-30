import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
import { z } from 'zod';
import ADMISSIONSOFFICER_CONSTANTS from '../constants';
import { createAdmissionsOfficerPayloadValidator } from '../validation';
import { FieldError } from '@/components/ErrorMessage';
import { useUserOptions } from '../../../option-hooks/useUserOptions';


interface AdmissionsOfficerFormProps {
}

const AdmissionsOfficerForm: React.FC<AdmissionsOfficerFormProps> = ({ }) => {
	const form = useFormContext<z.infer<typeof createAdmissionsOfficerPayloadValidator>>();

const { users: user  } = useUserOptions();

	return (
		<Form {...form}>
			<div className="grid grid-cols-1 lg:grid-cols-1 gap-6 items-start">
<FormField
                    control={form.control}
                    name="userId"
                    render={({ field: fieldProps }) => (
                        <FormItem>
                            <FormLabel>User <span className="text-destructive">*</span></FormLabel>
                            <FormControl>
                                <Select onValueChange={fieldProps.onChange} value={fieldProps.value?.toString() || ''}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select User" />
                                </SelectTrigger>
                                <SelectContent>
                                    {user?.map((option) => (
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
                    name="department"
                    render={({ field: fieldProps }) => (
                        <FormItem>
                            <FormLabel>Department</FormLabel>
                            <FormControl>
                                <Input 
                                    type="text"
                                    placeholder="Enter Department"
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
                    name="title"
                    render={({ field: fieldProps }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input 
                                    type="text"
                                    placeholder="Enter Title"
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

export default AdmissionsOfficerForm;