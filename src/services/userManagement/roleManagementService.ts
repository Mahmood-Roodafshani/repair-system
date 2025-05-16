import axiosInstance, {
  apiDelete,
  apiGet,
  apiPost,
  apiPut
} from '../baseService';
import { SystemRolesResponse } from '../../types/responses/userManagement/roleManagement';
import { ROUTES } from '../../constants/routes';
import { SystemFullRolesMock, SystemRolesMock } from 'src/mock';
import { RoleDto } from '@/types/responses/userManagement/roleManagement/roleDto';
import { CreateRoleDto, UpdateRoleDto } from '@/types';
import { Pageable } from '@/types/requests/pageableType';
import { Pageable as PageableResponse } from '@/types/responses/pageableType';

export const roleManagementService = {
  // Function to get system roles
  async getSystemRoles(systemId: number): Promise<SystemRolesResponse[]> {
    if (import.meta.env.VITE_APP_WORK_WITH_MOCK === 'true') {
      return systemId === 0 ? SystemFullRolesMock : SystemRolesMock;
    }

    const response = await axiosInstance.get(
      ROUTES.USER.ACCESS_CONTROL.FETCH_LIST
    );
    return response.data;
  },

  // Function to store a new system
  async storeNewSystem(data: { name: string }): Promise<SystemRolesResponse> {
    if (import.meta.env.VITE_APP_WORK_WITH_MOCK === 'true') {
      return {
        id: Math.floor(Math.random() * 1000),
        name: data.name,
        description: '',
        status: true,
        children: []
      };
    }

    const response = await axiosInstance.post(
      ROUTES.USER.ACCESS_CONTROL.FETCH_LIST,
      data
    );
    return response.data;
  },

  // Function to store a new role
  async storeNewRole(data: {
    name: string;
    systemId: number;
  }): Promise<SystemRolesResponse> {
    if (import.meta.env.VITE_APP_WORK_WITH_MOCK === 'true') {
      return {
        id: Math.floor(Math.random() * 1000),
        name: data.name,
        description: '',
        status: true,
        permissions: []
      };
    }

    const response = await axiosInstance.post(
      ROUTES.USER.ACCESS_CONTROL.FETCH_LIST,
      data
    );
    return response.data;
  },

  // Function to remove a system
  async removeSystem(systemId: number): Promise<void> {
    if (import.meta.env.VITE_APP_WORK_WITH_MOCK === 'true') {
      return;
    }

    await axiosInstance.delete(
      `${ROUTES.USER.ACCESS_CONTROL.FETCH_LIST}/${systemId}`
    );
  },

  // Function to remove a role
  async removeRole(roleId: number): Promise<void> {
    if (import.meta.env.VITE_APP_WORK_WITH_MOCK === 'true') {
      return;
    }

    await axiosInstance.delete(
      `${ROUTES.USER.ACCESS_CONTROL.FETCH_LIST}/${roleId}`
    );
  },

  async getAllWithPage(
    paginationArgs: Pageable<RoleDto>
  ): Promise<PageableResponse<RoleDto>> {
    const params = new URLSearchParams();
    params.append('page', paginationArgs.pageIndex.toString());
    params.append('size', paginationArgs.pageSize.toString());
    const response = await apiGet<PageableResponse<RoleDto>>(
      ROUTES.USER.ROLE.FETCH_ALL_WITH_PAGE + params.toString()
    );
    return response.content;
  },

  async getAll(): Promise<RoleDto[]> {
    const response = await apiGet<RoleDto[]>(ROUTES.USER.ROLE.FETCH_ALL);
    return response.content;
  },

  async update({
    id,
    data
  }: {
    id: number;
    data: UpdateRoleDto;
  }): Promise<RoleDto> {
    const response = await apiPut<RoleDto>(ROUTES.USER.ROLE.UPDATE(id), data);
    return response.content;
  },

  async create(data: CreateRoleDto): Promise<RoleDto> {
    const response = await apiPost<RoleDto>(ROUTES.USER.ROLE.CREATE, data);
    return response.content;
  },

  async delete(id: number): Promise<void> {
    await apiDelete<void>(ROUTES.USER.ROLE.DELETE(id));
  }
};
