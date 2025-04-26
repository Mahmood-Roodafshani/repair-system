import { SystemRolesMock } from 'src/mock/userManagement/systemRolesMock';
import ROUTES from '../routes';
import { apiDelete, apiGet, apiPost } from '../baseService';
import { timeout } from 'src/utils/helper';
import { ApiResponse } from 'src/types';
import { SystemRolesResponse } from 'src/types/responses/userManagement/roleManagement/systemRolesResponse';
import { SystemRolesApiResponse } from 'src/types/responses/userManagement/roleManagement/systemRolesApiResponse';

export const getSystemRoles = async ({ systemId }: {
  systemId: string | number
}): Promise<ApiResponse<SystemRolesResponse[]>> => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200,
      content: SystemRolesMock
    };
  }

  const response = await apiGet<SystemRolesApiResponse>(ROUTES.GET_SYSTEM_ROLES + systemId);

  // Transform the API response to match our SystemRolesResponse type
  const transformedRoles: SystemRolesResponse[] = response.content.data.map(role => ({
    id: role.id,
    name: role.name,
    description: role.description,
    status: true, // Default status
    permissions: role.permissions?.map(permission => ({
      id: permission.id,
      name: permission.name,
      description: permission.description
    })),
    children: role.permissions?.map(permission => ({
      id: permission.id,
      name: permission.name,
      description: permission.description,
      status: true
    }))
  }));

  return {
    statusCode: response.statusCode,
    content: transformedRoles
  };
};

export const storeNewSystem = async ({ title }: { title: string }) => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200
    };
  }
  return apiPost(ROUTES.STORE_NEW_SYSTEM, { title });
};

export const storeNewRole = async ({
                                     systemId,
                                     roleId,
                                     title
                                   }: {
  systemId: string | number;
  roleId: string | number;
  title: string;
}) => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200
    };
  }
  return apiPost(ROUTES.STORE_NEW_ROLE, {
    systemId,
    roleId,
    title
  });
};

export const removeSystem = async ({ systemId }: { systemId: string | number }) => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200
    };
  }
  return apiDelete(ROUTES.REMOVE_SYSTEM + systemId);
};

export const removeRole = async ({ roleId }: { roleId: string | number }) => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200
    };
  }
  return apiDelete(ROUTES.REMOVE_ROLE + roleId);
};

export const roleManagementService = {
  getSystemRoles,
  storeNewSystem,
  storeNewRole,
  removeSystem,
  removeRole
};
