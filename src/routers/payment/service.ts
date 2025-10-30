import { IPaymentAdd, IPaymentEdit, IPaymentPager, IPaymentSingle, IPaymentQueryParams, IPaymentPrimaryKeys } from './interface';
import { MutationResponse, CommonSelect } from '@/interface/common';
import { CreateQueryParams } from '@/util/PrepareQueryParams';
import apiClient from '@/services/apiClient';

export const getPayments = async (queryParams: IPaymentQueryParams | null) => {
  const url = `/payments${queryParams !== null ? '?' + CreateQueryParams(queryParams) : ''}`;
  return await apiClient.get<IPaymentPager>(url);
};

export const getSelectPayments = async (queryParams: IPaymentQueryParams | null) => {
  const url = `/payments/select${queryParams !== null ? '?' + CreateQueryParams(queryParams) : ''}`;
  return await apiClient.get<CommonSelect[]>(url);
};

export const getPaymentDetails = async (paymentId: string) => {
  const url = `/payments/detail/${paymentId}`;
  return await apiClient.get<IPaymentSingle>(url);
};

export const getPaymentEditDetails = async (paymentId: string) => {
  const url = `/payments/${paymentId}`;
  return await apiClient.get<IPaymentEdit>(url);
};

export const deletePayment = async (primaryKeys: Partial<IPaymentPrimaryKeys>) => {
  const { paymentId } = primaryKeys;
  const url = `/payments/${paymentId}`;
  return await apiClient.delete<MutationResponse<unknown>>(url);
};

export const updatePayment = async (data: Partial<IPaymentEdit>) => {
  const { paymentId, ...rest } = data;
  const url = `/payments/${paymentId}`;
  return await apiClient.put<MutationResponse<IPaymentEdit>>(url, { paymentId, ...rest });
};

export const addPayment = async (data: Partial<IPaymentAdd>) => {
  return await apiClient.post<MutationResponse<IPaymentAdd>>('/payments', data);
};

export const uploadPayment = async (data: FormData) => {
  return await apiClient.put<{ url: string }>('/payments/upload', data, {
    headers: {
      'Content-Type': undefined, // Let axios set the correct Content-Type for FormData
    },
  });
};

export const deleteUploadPayment = async (data: IPaymentPrimaryKeys & { property: string }) => {
  return await apiClient.delete<void>(`/payments/upload/${data.paymentId}`, { data });
};

