import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
import { z } from 'zod';
import USER_CONSTANTS from '../constants';
import { createUserPayloadValidator } from '../validation';
import { FieldError } from '@/components/ErrorMessage';


interface UserFormProps {
}

const UserForm: React.FC<UserFormProps> = ({ }) => {
	const form = useFormContext<z.infer<typeof createUserPayloadValidator>>();


	return (
		<Form {...form}>
			<div className="grid grid-cols-1 lg:grid-cols-1 gap-6 items-start">
<FormField
                    control={form.control}
                    name="email"
                    render={({ field: fieldProps }) => (
                        <FormItem>
                            <FormLabel>Email <span className="text-destructive">*</span></FormLabel>
                            <FormControl>
                                <Input 
                                    type="email"
                                    placeholder="Enter Email"
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
                    name="username"
                    render={({ field: fieldProps }) => (
                        <FormItem>
                            <FormLabel>Username <span className="text-destructive">*</span></FormLabel>
                            <FormControl>
                                <Input 
                                    type="text"
                                    placeholder="Enter Username"
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
                    name="password"
                    render={({ field: fieldProps }) => (
                        <FormItem>
                            <FormLabel>Password <span className="text-destructive">*</span></FormLabel>
                            <FormControl>
                                <Input 
                                    type="password"
                                    placeholder="Enter Password"
                                    {...fieldProps}
									 autoComplete="new-password"                                    
                                    value={fieldProps.value?.toString() || ''}
                                />
                            </FormControl>
                            
                            <FormMessage />
                        </FormItem>
                    )}
                />
<FormField
                    control={form.control}
                    name="role"
                    render={({ field: fieldProps }) => (
                        <FormItem>
                            <FormLabel>Role <span className="text-destructive">*</span></FormLabel>
                            <FormControl>
                                <Select onValueChange={fieldProps.onChange} value={fieldProps.value?.toString() || ''}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Role" />
                                </SelectTrigger>
                                <SelectContent>
                                    {["admin", "applicant", "admissionsOfficer"].map((option) => (
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

export default UserForm;