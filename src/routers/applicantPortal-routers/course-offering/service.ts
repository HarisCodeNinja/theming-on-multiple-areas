import { ICourseOfferingPager, ICourseOfferingSingle, ICourseOfferingQueryParams, ICourseOfferingPrimaryKeys } from './interface';
import { CommonSelect } from '@/interface/common';
import { CreateQueryParams } from '@/util/PrepareQueryParams';
import apiClient from '@/services/apiClient';

export const getApplicantPortalCourseOfferings = async (queryParams: ICourseOfferingQueryParams | null) => {
  const url = `applicantPortal/course-offerings${queryParams !== null ? '?' + CreateQueryParams(queryParams) : ''}`;
  return await apiClient.get<ICourseOfferingPager>(url);
};

export const getSelectApplicantPortalCourseOfferings = async (queryParams: ICourseOfferingQueryParams | null) => {
  const url = `applicantPortal/course-offerings/select${queryParams !== null ? '?' + CreateQueryParams(queryParams) : ''}`;
  return await apiClient.get<CommonSelect[]>(url);
};

export const getApplicantPortalCourseOfferingDetails = async (courseOfferingId: string) => {
  const url = `applicantPortal/course-offerings/detail/${courseOfferingId}`;
  return await apiClient.get<ICourseOfferingSingle>(url);
};

