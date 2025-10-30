import { IAdmissionsOfficerAdd, IAdmissionsOfficerEdit, IAdmissionsOfficerPager, IAdmissionsOfficerSingle, IAdmissionsOfficerQueryParams, IAdmissionsOfficerPrimaryKeys } from './interface';
import { MutationResponse, CommonSelect } from '@/interface/common';
import { CreateQueryParams } from '@/util/PrepareQueryParams';
import apiClient from '@/services/apiClient';

export const getAdmissionsOfficers = async (queryParams: IAdmissionsOfficerQueryParams | null) => {
  const url = `/admissions-officers${queryParams !== null ? '?' + CreateQueryParams(queryParams) : ''}`;
  return await apiClient.get<IAdmissionsOfficerPager>(url);
};

export const getSelectAdmissionsOfficers = async (queryParams: IAdmissionsOfficerQueryParams | null) => {
  const url = `/admissions-officers/select${queryParams !== null ? '?' + CreateQueryParams(queryParams) : ''}`;
  return await apiClient.get<CommonSelect[]>(url);
};

export const getAdmissionsOfficerDetails = async (admissionsOfficerId: string) => {
  const url = `/admissions-officers/detail/${admissionsOfficerId}`;
  return await apiClient.get<IAdmissionsOfficerSingle>(url);
};

export const getAdmissionsOfficerEditDetails = async (admissionsOfficerId: string) => {
  const url = `/admissions-officers/${admissionsOfficerId}`;
  return await apiClient.get<IAdmissionsOfficerEdit>(url);
};

export const deleteAdmissionsOfficer = async (primaryKeys: Partial<IAdmissionsOfficerPrimaryKeys>) => {
  const { admissionsOfficerId } = primaryKeys;
  const url = `/admissions-officers/${admissionsOfficerId}`;
  return await apiClient.delete<MutationResponse<unknown>>(url);
};

export const updateAdmissionsOfficer = async (data: Partial<IAdmissionsOfficerEdit>) => {
  const { admissionsOfficerId, ...rest } = data;
  const url = `/admissions-officers/${admissionsOfficerId}`;
  return await apiClient.put<MutationResponse<IAdmissionsOfficerEdit>>(url, { admissionsOfficerId, ...rest });
};

export const addAdmissionsOfficer = async (data: Partial<IAdmissionsOfficerAdd>) => {
  return await apiClient.post<MutationResponse<IAdmissionsOfficerAdd>>('/admissions-officers', data);
};

export const uploadAdmissionsOfficer = async (data: FormData) => {
  return await apiClient.put<{ url: string }>('/admissions-officers/upload', data, {
    headers: {
      'Content-Type': undefined, // Let axios set the correct Content-Type for FormData
    },
  });
};

export const deleteUploadAdmissionsOfficer = async (data: IAdmissionsOfficerPrimaryKeys & { property: string }) => {
  return await apiClient.delete<void>(`/admissions-officers/upload/${data.admissionsOfficerId}`, { data });
};

