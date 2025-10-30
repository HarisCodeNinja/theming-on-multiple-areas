import { IApplicationAdd, IApplicationEdit, IApplicationPager, IApplicationSingle, IApplicationQueryParams, IApplicationPrimaryKeys } from './interface';
import { MutationResponse, CommonSelect } from '@/interface/common';
import { CreateQueryParams } from '@/util/PrepareQueryParams';
import apiClient from '@/services/apiClient';

export const getApplications = async (queryParams: IApplicationQueryParams | null) => {
  const url = `/applications${queryParams !== null ? '?' + CreateQueryParams(queryParams) : ''}`;
  return await apiClient.get<IApplicationPager>(url);
};

export const getSelectApplications = async (queryParams: IApplicationQueryParams | null) => {
  const url = `/applications/select${queryParams !== null ? '?' + CreateQueryParams(queryParams) : ''}`;
  return await apiClient.get<CommonSelect[]>(url);
};

export const getApplicationDetails = async (applicationId: string) => {
  const url = `/applications/detail/${applicationId}`;
  return await apiClient.get<IApplicationSingle>(url);
};

export const getApplicationEditDetails = async (applicationId: string) => {
  const url = `/applications/${applicationId}`;
  return await apiClient.get<IApplicationEdit>(url);
};

export const deleteApplication = async (primaryKeys: Partial<IApplicationPrimaryKeys>) => {
  const { applicationId } = primaryKeys;
  const url = `/applications/${applicationId}`;
  return await apiClient.delete<MutationResponse<unknown>>(url);
};

export const updateApplication = async (data: Partial<IApplicationEdit>) => {
  const { applicationId, ...rest } = data;
  const url = `/applications/${applicationId}`;
  return await apiClient.put<MutationResponse<IApplicationEdit>>(url, { applicationId, ...rest });
};

export const addApplication = async (data: Partial<IApplicationAdd>) => {
  return await apiClient.post<MutationResponse<IApplicationAdd>>('/applications', data);
};

export const uploadApplication = async (data: FormData) => {
  return await apiClient.put<{ url: string }>('/applications/upload', data, {
    headers: {
      'Content-Type': undefined, // Let axios set the correct Content-Type for FormData
    },
  });
};

export const deleteUploadApplication = async (data: IApplicationPrimaryKeys & { property: string }) => {
  return await apiClient.delete<void>(`/applications/upload/${data.applicationId}`, { data });
};

