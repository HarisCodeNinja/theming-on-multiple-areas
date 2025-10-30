import { useQuery } from '@tanstack/react-query';
import { getSelectPayments } from '../routers/payment/service';


export function usePaymentOptions() {
  const query = useQuery({
    queryKey: [ 'payments', 'select'],
    queryFn: async () => {
      const response = await getSelectPayments(null);
      return response.data;
    }, 
  });

  return {
    payments: query.data ?? [],
    isLoadingPayments: query.isLoading,
    refetchPayments: query.refetch,
  };
}
