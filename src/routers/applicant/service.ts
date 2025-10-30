import { IApplicantAdd, IApplicantEdit, IApplicantPager, IApplicantSingle, IApplicantQueryParams, IApplicantPrimaryKeys } from './interface';
import { MutationResponse, CommonSelect } from '@/interface/common';
import { CreateQueryParams } from '@/util/PrepareQueryParams';
import apiClient from '@/services/apiClient';

export const getApplicants = async (queryParams: IApplicantQueryParams | null) => {
  const url = `/applicants${queryParams !== null ? '?' + CreateQueryParams(queryParams) : ''}`;
  return await apiClient.get<IApplicantPager>(url);
};

export const getSelectApplicants = async (queryParams: IApplicantQueryParams | null) => {
  const url = `/applicants/select${queryParams !== null ? '?' + CreateQueryParams(queryParams) : ''}`;
  return await apiClient.get<CommonSelect[]>(url);
};

export const getApplicantDetails = async (applicantId: string) => {
  const url = `/applicants/detail/${applicantId}`;
  return await apiClient.get<IApplicantSingle>(url);
};

export const getApplicantEditDetails = async (applicantId: string) => {
  const url = `/applicants/${applicantId}`;
  return await apiClient.get<IApplicantEdit>(url);
};

export const deleteApplicant = async (primaryKeys: Partial<IApplicantPrimaryKeys>) => {
  const { applicantId } = primaryKeys;
  const url = `/applicants/${applicantId}`;
  return await apiClient.delete<MutationResponse<unknown>>(url);
};

export const updateApplicant = async (data: Partial<IApplicantEdit>) => {
  const { applicantId, ...rest } = data;
  const url = `/applicants/${applicantId}`;
  return await apiClient.put<MutationResponse<IApplicantEdit>>(url, { applicantId, ...rest });
};

export const addApplicant = async (data: Partial<IApplicantAdd>) => {
  return await apiClient.post<MutationResponse<IApplicantAdd>>('/applicants', data);
};

export const uploadApplicant = async (data: FormData) => {
  return await apiClient.put<{ url: string }>('/applicants/upload', data, {
    headers: {
      'Content-Type': undefined, // Let axios set the correct Content-Type for FormData
    },
  });
};

export const deleteUploadApplicant = async (data: IApplicantPrimaryKeys & { property: string }) => {
  return await apiClient.delete<void>(`/applicants/upload/${data.applicantId}`, { data });
};

