import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input, Textarea, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
import dayjs from 'dayjs';
import { DATE_FORMATE, DATE_TIME_FORMATE } from '@/config/constant';
import DatePicker from '@/components/DatePicker';
import { z } from 'zod';
import APPLICANT_CONSTANTS from '../constants';
import { createApplicantPayloadValidator } from '../validation';
import { FieldError } from '@/components/ErrorMessage';
import { useUserOptions } from '../../../option-hooks/useUserOptions';


interface ApplicantFormProps {
}

const ApplicantForm: React.FC<ApplicantFormProps> = ({ }) => {
	const form = useFormContext<z.infer<typeof createApplicantPayloadValidator>>();

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
                    name="firstName"
                    render={({ field: fieldProps }) => (
                        <FormItem>
                            <FormLabel>First Name <span className="text-destructive">*</span></FormLabel>
                            <FormControl>
                                <Input 
                                    type="text"
                                    placeholder="Enter First Name"
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
                    name="lastName"
                    render={({ field: fieldProps }) => (
                        <FormItem>
                            <FormLabel>Last Name <span className="text-destructive">*</span></FormLabel>
                            <FormControl>
                                <Input 
                                    type="text"
                                    placeholder="Enter Last Name"
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
                    name="dateOfBirth"
                    render={({ field: fieldProps }) => (
                        <FormItem>
                            <FormLabel>Date Of Birth</FormLabel>
                            <FormControl>
                                <DatePicker value={fieldProps.value || undefined } onChange={fieldProps.onChange} placeholder="Select Date Of Birth" />
                            </FormControl>
                            
                            <FormMessage />
                        </FormItem>
                    )}
                />
<FormField
                    control={form.control}
                    name="gender"
                    render={({ field: fieldProps }) => (
                        <FormItem>
                            <FormLabel>Gender</FormLabel>
                            <FormControl>
                                <Select onValueChange={fieldProps.onChange} value={fieldProps.value?.toString() || ''}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Gender" />
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
                    name="nationality"
                    render={({ field: fieldProps }) => (
                        <FormItem>
                            <FormLabel>Nationality</FormLabel>
                            <FormControl>
                                <Input 
                                    type="text"
                                    placeholder="Enter Nationality"
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
                    name="address"
                    render={({ field: fieldProps }) => (
                        <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                                <Textarea 
                                    placeholder="Enter Address"                                    
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
                    name="phoneNumber"
                    render={({ field: fieldProps }) => (
                        <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                                <Input 
                                    type="text"
                                    placeholder="Enter Phone Number"
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

export default ApplicantForm;