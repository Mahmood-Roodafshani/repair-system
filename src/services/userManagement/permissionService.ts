import axios from 'axios';
import { PermissionDto, CreatePermissionDto } from 'src/types/responses/userManagement/roleManagement/permissionDto';
import { JSonResponseEntityPermissionDto, JSonResponseEntityListPermissionDto } from 'src/types/responses/wrappers/responseWrappers';
import { ROUTES } from 'src/constants/routes';

export const permissionService = {
  getAll: async (): Promise<PermissionDto[]> => {
    const response = await axios.get<JSonResponseEntityListPermissionDto>(ROUTES.USER.PERMISSION.GET_ALL);
    return response.data.data;
  },

  getById: async (id: number): Promise<PermissionDto> => {
    const response = await axios.get<JSonResponseEntityPermissionDto>(ROUTES.USER.PERMISSION.GET_BY_ID(id));
    return response.data.data;
  },

  create: async (permission: CreatePermissionDto): Promise<PermissionDto> => {
    const response = await axios.post<JSonResponseEntityPermissionDto>(ROUTES.USER.PERMISSION.CREATE, permission);
    return response.data.data;
  },

  update: async (id: number, permission: PermissionDto): Promise<PermissionDto> => {
    const response = await axios.put<JSonResponseEntityPermissionDto>(ROUTES.USER.PERMISSION.UPDATE(id), permission);
    return response.data.data;
  },

  delete: async (id: number): Promise<void> => {
    await axios.delete(ROUTES.USER.PERMISSION.DELETE(id));
  }
}; 