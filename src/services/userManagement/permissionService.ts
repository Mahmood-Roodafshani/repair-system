import { apiGet, apiPost, apiPut, apiDelete } from '../baseService';
import { PermissionDto } from '../../types/responses/userManagement/roleManagement';
import { ROUTES } from '../../constants/routes';

export const permissionService = {
  async getAll(): Promise<PermissionDto[]> {
    const response = await apiGet<PermissionDto[]>(ROUTES.USER.ACCESS_CONTROL.FETCH_LIST);
    return response.content;
  },

  async getById(id: string): Promise<PermissionDto> {
    const response = await apiGet<PermissionDto>(`${ROUTES.USER.ACCESS_CONTROL.FETCH_LIST}/${id}`);
    return response.content;
  },

  async create(data: Omit<PermissionDto, 'id'>): Promise<PermissionDto> {
    const response = await apiPost<PermissionDto>(ROUTES.USER.ACCESS_CONTROL.FETCH_LIST, data);
    return response.content;
  },

  async update(id: string, data: Partial<PermissionDto>): Promise<PermissionDto> {
    const response = await apiPut<PermissionDto>(`${ROUTES.USER.ACCESS_CONTROL.FETCH_LIST}/${id}`, data);
    return response.content;
  },

  async delete(id: string): Promise<void> {
    await apiDelete<void>(`${ROUTES.USER.ACCESS_CONTROL.FETCH_LIST}/${id}`);
  }
}; 