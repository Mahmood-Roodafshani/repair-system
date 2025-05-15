import { apiGet, apiPost, apiPut, apiDelete } from '../baseService';
import { ROUTES } from '../../constants/routes';
import { PermissionManagementDto } from '@/types';

export const permissionManagementService = {
  async getAll(): Promise<PermissionManagementDto[]> {
    const response = await apiGet<PermissionManagementDto[]>(
      ROUTES.USER.ACCESS_CONTROL.FETCH_LIST
    );
    return response.content;
  },

  async getById(id: string): Promise<PermissionManagementDto> {
    const response = await apiGet<PermissionManagementDto>(
      `${ROUTES.USER.ACCESS_CONTROL.FETCH_LIST}/${id}`
    );
    return response.content;
  },

  async create(
    data: Omit<PermissionManagementDto, 'id'>
  ): Promise<PermissionManagementDto> {
    const response = await apiPost<PermissionManagementDto>(
      ROUTES.USER.ACCESS_CONTROL.FETCH_LIST,
      data
    );
    return response.content;
  },

  async update(
    id: string,
    data: Partial<PermissionManagementDto>
  ): Promise<PermissionManagementDto> {
    const response = await apiPut<PermissionManagementDto>(
      `${ROUTES.USER.ACCESS_CONTROL.FETCH_LIST}/${id}`,
      data
    );
    return response.content;
  },

  async delete(id: string): Promise<void> {
    await apiDelete<void>(`${ROUTES.USER.ACCESS_CONTROL.FETCH_LIST}/${id}`);
  }
};
