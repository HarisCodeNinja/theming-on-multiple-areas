import { useQuery } from '@tanstack/react-query';
import { getSelectApplicants } from '../routers/applicant/service';


export function useApplicantOptions() {
  const query = useQuery({
    queryKey: [ 'applicants', 'select'],
    queryFn: async () => {
      const response = await getSelectApplicants(null);
      return response.data;
    }, 
  });

  return {
    applicants: query.data ?? [],
    isLoadingApplicants: query.isLoading,
    refetchApplicants: query.refetch,
  };
}
