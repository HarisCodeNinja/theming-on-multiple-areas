import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
import { z } from 'zod';
import PAYMENT_CONSTANTS from '../constants';
import { updatePaymentPayloadValidator } from '../validation';
import { FieldError } from '@/components/ErrorMessage';
import { useApplicationOptions } from '../../../option-hooks/useApplicationOptions';


interface PaymentFormProps {
}

const PaymentForm: React.FC<PaymentFormProps> = ({ }) => {
	const form = useFormContext<z.infer<typeof updatePaymentPayloadValidator>>();

const { applications: application  } = useApplicationOptions();

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
                    name="amount"
                    render={({ field: fieldProps }) => (
                        <FormItem>
                            <FormLabel>Amount <span className="text-destructive">*</span></FormLabel>
                            <FormControl>
                                <Input 
                                    type="number"
                                    step="0.01"
                                    placeholder="Enter Amount"
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
                    name="transactionId"
                    render={({ field: fieldProps }) => (
                        <FormItem>
                            <FormLabel>Transaction Id <span className="text-destructive">*</span></FormLabel>
                            <FormControl>
                                <Input 
                                    type="text"
                                    placeholder="Enter Transaction Id"
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
                    name="paymentMethod"
                    render={({ field: fieldProps }) => (
                        <FormItem>
                            <FormLabel>Payment Method</FormLabel>
                            <FormControl>
                                <Input 
                                    type="text"
                                    placeholder="Enter Payment Method"
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

export default PaymentForm;