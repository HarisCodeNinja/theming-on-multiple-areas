import { useQuery } from '@tanstack/react-query';
import { getSelectDecisions } from '../routers/decision/service';


export function useDecisionOptions() {
  const query = useQuery({
    queryKey: [ 'decisions', 'select'],
    queryFn: async () => {
      const response = await getSelectDecisions(null);
      return response.data;
    }, 
  });

  return {
    decisions: query.data ?? [],
    isLoadingDecisions: query.isLoading,
    refetchDecisions: query.refetch,
  };
}
