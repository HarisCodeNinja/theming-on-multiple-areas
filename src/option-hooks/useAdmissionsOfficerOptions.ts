import { useQuery } from '@tanstack/react-query';
import { getSelectAdmissionsOfficers } from '../routers/admissions-officer/service';


export function useAdmissionsOfficerOptions() {
  const query = useQuery({
    queryKey: [ 'admissionsOfficers', 'select'],
    queryFn: async () => {
      const response = await getSelectAdmissionsOfficers(null);
      return response.data;
    }, 
  });

  return {
    admissionsOfficers: query.data ?? [],
    isLoadingAdmissionsOfficers: query.isLoading,
    refetchAdmissionsOfficers: query.refetch,
  };
}
