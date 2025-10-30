import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { RootState, useAppSelector } from '@/store';
import { CleanError } from '@/util/CleanError';
import { zodResolver } from '@hookform/resolvers/zod';
import { Spinner } from '@/components/ui/spinner';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { z } from 'zod';
import { getUserProfile, updateUserProfile } from '../service';
import { profileUserPayloadValidator } from '../validation';
import UserChangePasswordPage from './components/change-password';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input, Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';


type ProfileFormData = z.infer<typeof profileUserPayloadValidator>;

const UserProfilePage: React.FC = () => {
  const session = useAppSelector((state: RootState) => state.session);
  const { user, isLoggedIn } = session;
  const queryClient = useQueryClient();

  const { data: profileData } = useQuery({
    queryKey: ['userProfile'],
    queryFn: () => getUserProfile(session.token),
    enabled: isLoggedIn,
  });

  const updateProfileMutation = useMutation({
    mutationFn: ({ profileData, userId }: { profileData: ProfileFormData; userId: string }) => updateUserProfile(profileData, userId),
  });

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileUserPayloadValidator),
    defaultValues: profileData?.data || {},
  });

  useEffect(() => {
    if (profileData) {
      form.reset(profileData?.data);
    }
  }, [profileData, form]);

  const handleFormSubmit = async (values: ProfileFormData) => {
    try {
      await updateProfileMutation.mutateAsync({ profileData: values, userId: user?.userId || '' });
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error(CleanError(error));
    }
  };

  return (
    <div className="space-y-5">
      <Card>
        <CardHeader className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
          <CardTitle className="text-xl">Profile</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2"></div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
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
              <div className="flex justify-end gap-2">
                <Button className="flex items-center gap-2" disabled={updateProfileMutation.isPending}>
                  {updateProfileMutation.isPending && <Spinner />}
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <UserChangePasswordPage />
    </div>
  );
};

export default UserProfilePage;
