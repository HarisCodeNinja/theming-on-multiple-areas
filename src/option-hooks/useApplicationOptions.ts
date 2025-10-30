import { useQuery } from '@tanstack/react-query';
import { getSelectApplications } from '../routers/application/service';


export function useApplicationOptions() {
  const query = useQuery({
    queryKey: [ 'applications', 'select'],
    queryFn: async () => {
      const response = await getSelectApplications(null);
      return response.data;
    }, 
  });

  return {
    applications: query.data ?? [],
    isLoadingApplications: query.isLoading,
    refetchApplications: query.refetch,
  };
}
