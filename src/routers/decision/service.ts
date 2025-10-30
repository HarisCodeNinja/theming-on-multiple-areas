import { IDecisionAdd, IDecisionEdit, IDecisionPager, IDecisionSingle, IDecisionQueryParams, IDecisionPrimaryKeys } from './interface';
import { MutationResponse, CommonSelect } from '@/interface/common';
import { CreateQueryParams } from '@/util/PrepareQueryParams';
import apiClient from '@/services/apiClient';

export const getDecisions = async (queryParams: IDecisionQueryParams | null) => {
  const url = `/decisions${queryParams !== null ? '?' + CreateQueryParams(queryParams) : ''}`;
  return await apiClient.get<IDecisionPager>(url);
};

export const getSelectDecisions = async (queryParams: IDecisionQueryParams | null) => {
  const url = `/decisions/select${queryParams !== null ? '?' + CreateQueryParams(queryParams) : ''}`;
  return await apiClient.get<CommonSelect[]>(url);
};

export const getDecisionDetails = async (decisionId: string) => {
  const url = `/decisions/detail/${decisionId}`;
  return await apiClient.get<IDecisionSingle>(url);
};

export const getDecisionEditDetails = async (decisionId: string) => {
  const url = `/decisions/${decisionId}`;
  return await apiClient.get<IDecisionEdit>(url);
};

export const deleteDecision = async (primaryKeys: Partial<IDecisionPrimaryKeys>) => {
  const { decisionId } = primaryKeys;
  const url = `/decisions/${decisionId}`;
  return await apiClient.delete<MutationResponse<unknown>>(url);
};

export const updateDecision = async (data: Partial<IDecisionEdit>) => {
  const { decisionId, ...rest } = data;
  const url = `/decisions/${decisionId}`;
  return await apiClient.put<MutationResponse<IDecisionEdit>>(url, { decisionId, ...rest });
};

export const addDecision = async (data: Partial<IDecisionAdd>) => {
  return await apiClient.post<MutationResponse<IDecisionAdd>>('/decisions', data);
};

export const uploadDecision = async (data: FormData) => {
  return await apiClient.put<{ url: string }>('/decisions/upload', data, {
    headers: {
      'Content-Type': undefined, // Let axios set the correct Content-Type for FormData
    },
  });
};

export const deleteUploadDecision = async (data: IDecisionPrimaryKeys & { property: string }) => {
  return await apiClient.delete<void>(`/decisions/upload/${data.decisionId}`, { data });
};

