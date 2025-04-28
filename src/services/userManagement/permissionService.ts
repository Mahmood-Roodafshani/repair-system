import { axiosInstance } from '../../utils/axios';
import { PermissionDto } from '../../types/responses/userManagement/roleManagement';
import { ROUTES } from '../../constants/routes';

export const permissionService = {
  async getAll(): Promise<PermissionDto[]> {
    const response = await axiosInstance.get(ROUTES.USER.ACCESS_CONTROL.FETCH_LIST);
    return response.data;
  },

  async getById(id: string): Promise<PermissionDto> {
    const response = await axiosInstance.get(`${ROUTES.USER.ACCESS_CONTROL.FETCH_LIST}/${id}`);
    return response.data;
  },

  async create(data: Omit<PermissionDto, 'id'>): Promise<PermissionDto> {
    const response = await axiosInstance.post(ROUTES.USER.ACCESS_CONTROL.FETCH_LIST, data);
    return response.data;
  },

  async update(id: string, data: Partial<PermissionDto>): Promise<PermissionDto> {
    const response = await axiosInstance.put(`${ROUTES.USER.ACCESS_CONTROL.FETCH_LIST}/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await axiosInstance.delete(`${ROUTES.USER.ACCESS_CONTROL.FETCH_LIST}/${id}`);
  }
}; 