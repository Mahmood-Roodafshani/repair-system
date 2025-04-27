import axiosInstance from '../baseService';
import { ROUTES } from 'src/constants/routes';
import { SystemRolesMock } from 'src/mock/userManagement/systemRolesMock';
import { timeout } from 'src/utils/helper';
import { ApiResponse } from 'src/types';

interface SystemRole {
  id: string | number;
  name: string;
  description: string;
  permissions: any[];
  status: boolean;
  children: any[];
}

interface SystemRolesApiResponse {
  statusCode: number;
  data: SystemRole[];
}

export const getSystemRoles = async (systemId: string | number): Promise<ApiResponse<SystemRole[]>> => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200,
      content: SystemRolesMock.map(role => ({
        id: role.id,
        name: role.name,
        description: role.description || '',
        permissions: role.permissions || [],
        status: role.status || false,
        children: role.children || []
      }))
    };
  }

  const response = await axiosInstance.get<SystemRolesApiResponse>(ROUTES.ROLE.GET_SYSTEM_ROLES(systemId.toString()));

  // Transform the API response to match our SystemRole type
  const transformedRoles: SystemRole[] = response.data.data.map((role: any) => ({
    id: role.id,
    name: role.name,
    description: role.description || '',
    permissions: role.permissions || [],
    status: role.status || false,
    children: role.children || []
  }));

  return {
    statusCode: response.data.statusCode,
    content: transformedRoles
  };
};

export const storeNewSystem = async (title: string): Promise<ApiResponse<void>> => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200,
      content: undefined
    };
  }
  const response = await axiosInstance.post(ROUTES.ROLE.SYSTEM.CREATE, { title });
  return response.data;
};

export const storeNewRole = async ({
  systemId,
  roleId,
  title
}: {
  systemId: string | number;
  roleId: string | number;
  title: string;
}): Promise<ApiResponse<void>> => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200,
      content: undefined
    };
  }
  const response = await axiosInstance.post(ROUTES.ROLE.SYSTEM.ADD_ROLE(systemId.toString()), {
    systemId,
    roleId,
    title
  });
  return response.data;
};

export const removeSystem = async (systemId: string | number): Promise<ApiResponse<void>> => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200,
      content: undefined
    };
  }
  const response = await axiosInstance.delete(ROUTES.ROLE.SYSTEM.REMOVE(systemId.toString()));
  return response.data;
};

export const removeRole = async (roleId: string | number): Promise<ApiResponse<void>> => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200,
      content: undefined
    };
  }
  const response = await axiosInstance.delete(ROUTES.ROLE.REMOVE(roleId.toString()));
  return response.data;
};

export const roleManagementService = {
  fetchRoles: async () => {
    const response = await axiosInstance.get(ROUTES.ROLE.FETCH_ALL);
    return response.data;
  },

  getSystemRoles,
  createSystem: storeNewSystem,
  addRoleToSystem: storeNewRole,
  removeRole,
  removeSystem
};
