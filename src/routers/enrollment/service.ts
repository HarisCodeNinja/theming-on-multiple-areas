import { IEnrollmentAdd, IEnrollmentEdit, IEnrollmentPager, IEnrollmentSingle, IEnrollmentQueryParams, IEnrollmentPrimaryKeys } from './interface';
import { MutationResponse, CommonSelect } from '@/interface/common';
import { CreateQueryParams } from '@/util/PrepareQueryParams';
import apiClient from '@/services/apiClient';

export const getEnrollments = async (queryParams: IEnrollmentQueryParams | null) => {
  const url = `/enrollments${queryParams !== null ? '?' + CreateQueryParams(queryParams) : ''}`;
  return await apiClient.get<IEnrollmentPager>(url);
};

export const getSelectEnrollments = async (queryParams: IEnrollmentQueryParams | null) => {
  const url = `/enrollments/select${queryParams !== null ? '?' + CreateQueryParams(queryParams) : ''}`;
  return await apiClient.get<CommonSelect[]>(url);
};

export const getEnrollmentDetails = async (enrollmentId: string) => {
  const url = `/enrollments/detail/${enrollmentId}`;
  return await apiClient.get<IEnrollmentSingle>(url);
};

export const getEnrollmentEditDetails = async (enrollmentId: string) => {
  const url = `/enrollments/${enrollmentId}`;
  return await apiClient.get<IEnrollmentEdit>(url);
};

export const deleteEnrollment = async (primaryKeys: Partial<IEnrollmentPrimaryKeys>) => {
  const { enrollmentId } = primaryKeys;
  const url = `/enrollments/${enrollmentId}`;
  return await apiClient.delete<MutationResponse<unknown>>(url);
};

export const updateEnrollment = async (data: Partial<IEnrollmentEdit>) => {
  const { enrollmentId, ...rest } = data;
  const url = `/enrollments/${enrollmentId}`;
  return await apiClient.put<MutationResponse<IEnrollmentEdit>>(url, { enrollmentId, ...rest });
};

export const addEnrollment = async (data: Partial<IEnrollmentAdd>) => {
  return await apiClient.post<MutationResponse<IEnrollmentAdd>>('/enrollments', data);
};

export const uploadEnrollment = async (data: FormData) => {
  return await apiClient.put<{ url: string }>('/enrollments/upload', data, {
    headers: {
      'Content-Type': undefined, // Let axios set the correct Content-Type for FormData
    },
  });
};

export const deleteUploadEnrollment = async (data: IEnrollmentPrimaryKeys & { property: string }) => {
  return await apiClient.delete<void>(`/enrollments/upload/${data.enrollmentId}`, { data });
};

