import { IProgramAdd, IProgramEdit, IProgramPager, IProgramSingle, IProgramQueryParams, IProgramPrimaryKeys } from './interface';
import { MutationResponse, CommonSelect } from '@/interface/common';
import { CreateQueryParams } from '@/util/PrepareQueryParams';
import apiClient from '@/services/apiClient';

export const getPrograms = async (queryParams: IProgramQueryParams | null) => {
  const url = `/programs${queryParams !== null ? '?' + CreateQueryParams(queryParams) : ''}`;
  return await apiClient.get<IProgramPager>(url);
};

export const getSelectPrograms = async (queryParams: IProgramQueryParams | null) => {
  const url = `/programs/select${queryParams !== null ? '?' + CreateQueryParams(queryParams) : ''}`;
  return await apiClient.get<CommonSelect[]>(url);
};

export const getProgramDetails = async (programId: string) => {
  const url = `/programs/detail/${programId}`;
  return await apiClient.get<IProgramSingle>(url);
};

export const getProgramEditDetails = async (programId: string) => {
  const url = `/programs/${programId}`;
  return await apiClient.get<IProgramEdit>(url);
};

export const deleteProgram = async (primaryKeys: Partial<IProgramPrimaryKeys>) => {
  const { programId } = primaryKeys;
  const url = `/programs/${programId}`;
  return await apiClient.delete<MutationResponse<unknown>>(url);
};

export const updateProgram = async (data: Partial<IProgramEdit>) => {
  const { programId, ...rest } = data;
  const url = `/programs/${programId}`;
  return await apiClient.put<MutationResponse<IProgramEdit>>(url, { programId, ...rest });
};

export const addProgram = async (data: Partial<IProgramAdd>) => {
  return await apiClient.post<MutationResponse<IProgramAdd>>('/programs', data);
};

export const uploadProgram = async (data: FormData) => {
  return await apiClient.put<{ url: string }>('/programs/upload', data, {
    headers: {
      'Content-Type': undefined, // Let axios set the correct Content-Type for FormData
    },
  });
};

export const deleteUploadProgram = async (data: IProgramPrimaryKeys & { property: string }) => {
  return await apiClient.delete<void>(`/programs/upload/${data.programId}`, { data });
};

