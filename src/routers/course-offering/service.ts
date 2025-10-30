import { ICourseOfferingAdd, ICourseOfferingEdit, ICourseOfferingPager, ICourseOfferingSingle, ICourseOfferingQueryParams, ICourseOfferingPrimaryKeys } from './interface';
import { MutationResponse, CommonSelect } from '@/interface/common';
import { CreateQueryParams } from '@/util/PrepareQueryParams';
import apiClient from '@/services/apiClient';

export const getCourseOfferings = async (queryParams: ICourseOfferingQueryParams | null) => {
  const url = `/course-offerings${queryParams !== null ? '?' + CreateQueryParams(queryParams) : ''}`;
  return await apiClient.get<ICourseOfferingPager>(url);
};

export const getSelectCourseOfferings = async (queryParams: ICourseOfferingQueryParams | null) => {
  const url = `/course-offerings/select${queryParams !== null ? '?' + CreateQueryParams(queryParams) : ''}`;
  return await apiClient.get<CommonSelect[]>(url);
};

export const getCourseOfferingDetails = async (courseOfferingId: string) => {
  const url = `/course-offerings/detail/${courseOfferingId}`;
  return await apiClient.get<ICourseOfferingSingle>(url);
};

export const getCourseOfferingEditDetails = async (courseOfferingId: string) => {
  const url = `/course-offerings/${courseOfferingId}`;
  return await apiClient.get<ICourseOfferingEdit>(url);
};

export const deleteCourseOffering = async (primaryKeys: Partial<ICourseOfferingPrimaryKeys>) => {
  const { courseOfferingId } = primaryKeys;
  const url = `/course-offerings/${courseOfferingId}`;
  return await apiClient.delete<MutationResponse<unknown>>(url);
};

export const updateCourseOffering = async (data: Partial<ICourseOfferingEdit>) => {
  const { courseOfferingId, ...rest } = data;
  const url = `/course-offerings/${courseOfferingId}`;
  return await apiClient.put<MutationResponse<ICourseOfferingEdit>>(url, { courseOfferingId, ...rest });
};

export const addCourseOffering = async (data: Partial<ICourseOfferingAdd>) => {
  return await apiClient.post<MutationResponse<ICourseOfferingAdd>>('/course-offerings', data);
};

export const uploadCourseOffering = async (data: FormData) => {
  return await apiClient.put<{ url: string }>('/course-offerings/upload', data, {
    headers: {
      'Content-Type': undefined, // Let axios set the correct Content-Type for FormData
    },
  });
};

export const deleteUploadCourseOffering = async (data: ICourseOfferingPrimaryKeys & { property: string }) => {
  return await apiClient.delete<void>(`/course-offerings/upload/${data.courseOfferingId}`, { data });
};

