import { useQuery } from '@tanstack/react-query';
import { getSelectApplicantPortalPrograms } from '../routers/applicantPortal-routers/program/service';
import { IProgramSearch } from '../routers/applicantPortal-routers/program/interface';

export function useProgramOptions(queryParams: IProgramSearch | null = null, enabled: boolean = true) {
  const query = useQuery({
    queryKey: ['admin', 'programs', 'select', queryParams],
    queryFn: async () => {
      const response = await getSelectApplicantPortalPrograms(queryParams);
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
