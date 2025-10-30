import { IProgramPager, IProgramSingle, IProgramQueryParams, IProgramPrimaryKeys } from './interface';
import { CommonSelect } from '@/interface/common';
import { CreateQueryParams } from '@/util/PrepareQueryParams';
import apiClient from '@/services/apiClient';

export const getApplicantPortalPrograms = async (queryParams: IProgramQueryParams | null) => {
  const url = `applicantPortal/programs${queryParams !== null ? '?' + CreateQueryParams(queryParams) : ''}`;
  return await apiClient.get<IProgramPager>(url);
};

export const getSelectApplicantPortalPrograms = async (queryParams: IProgramQueryParams | null) => {
  const url = `applicantPortal/programs/select${queryParams !== null ? '?' + CreateQueryParams(queryParams) : ''}`;
  return await apiClient.get<CommonSelect[]>(url);
};

export const getApplicantPortalProgramDetails = async (programId: string) => {
  const url = `applicantPortal/programs/detail/${programId}`;
  return await apiClient.get<IProgramSingle>(url);
};

