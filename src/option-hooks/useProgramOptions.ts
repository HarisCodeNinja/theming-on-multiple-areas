import { useQuery } from '@tanstack/react-query';
import { getSelectPrograms } from '../routers/program/service';
import { IProgramSearch } from '../routers/program/interface';

export function useProgramOptions(queryParams: IProgramSearch | null = null, enabled: boolean = true) {
  const query = useQuery({
    queryKey: [ 'programs', 'select', queryParams],
    queryFn: async () => {
      const response = await getSelectPrograms(queryParams);
      return response.data;
    }, 
    enabled: enabled,
  });

  return {
    programs: query.data ?? [],
    isLoadingPrograms: query.isLoading && enabled,
    refetchPrograms: query.refetch,
  };
}
