import { IAuditTrailPager, IAuditTrailSingle, IAuditTrailQueryParams, IAuditTrailPrimaryKeys } from './interface';
import { CommonSelect } from '@/interface/common';
import { CreateQueryParams } from '@/util/PrepareQueryParams';
import apiClient from '@/services/apiClient';

export const getAuditTrails = async (queryParams: IAuditTrailQueryParams | null) => {
  const url = `/audit-trails${queryParams !== null ? '?' + CreateQueryParams(queryParams) : ''}`;
  return await apiClient.get<IAuditTrailPager>(url);
};

export const getSelectAuditTrails = async (queryParams: IAuditTrailQueryParams | null) => {
  const url = `/audit-trails/select${queryParams !== null ? '?' + CreateQueryParams(queryParams) : ''}`;
  return await apiClient.get<CommonSelect[]>(url);
};

export const getAuditTrailDetails = async (auditId: string) => {
  const url = `/audit-trails/detail/${auditId}`;
  return await apiClient.get<IAuditTrailSingle>(url);
};

