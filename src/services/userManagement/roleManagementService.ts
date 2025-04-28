import axiosInstance from '../baseService';
import { SystemRolesResponse } from '../../types/responses/userManagement/roleManagement';
import { ROUTES } from '../../constants/routes';
import { SystemFullRolesMock, SystemRolesMock } from 'src/mock';

// Function to get system roles
export const getSystemRoles = async (systemId: number): Promise<SystemRolesResponse[]> => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK === 'true') {
    return systemId === 0 ? SystemFullRolesMock : SystemRolesMock;
  }

  const response = await axiosInstance.get(ROUTES.USER.ACCESS_CONTROL.FETCH_LIST);
  return response.data;
};

// Function to store a new system
export const storeNewSystem = async (data: { name: string }): Promise<SystemRolesResponse> => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK === 'true') {
    return {
      id: Math.floor(Math.random() * 1000),
      name: data.name,
      description: '',
      status: true,
      children: []
    };
  }

  const response = await axiosInstance.post(ROUTES.USER.ACCESS_CONTROL.FETCH_LIST, data);
  return response.data;
};

// Function to store a new role
export const storeNewRole = async (data: { name: string; systemId: number }): Promise<SystemRolesResponse> => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK === 'true') {
    return {
      id: Math.floor(Math.random() * 1000),
      name: data.name,
      description: '',
      status: true,
      permissions: []
    };
  }

  const response = await axiosInstance.post(ROUTES.USER.ACCESS_CONTROL.FETCH_LIST, data);
  return response.data;
};

// Function to remove a system
export const removeSystem = async (systemId: number): Promise<void> => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK === 'true') {
    return;
  }

  await axiosInstance.delete(`${ROUTES.USER.ACCESS_CONTROL.FETCH_LIST}/${systemId}`);
};

// Function to remove a role
export const removeRole = async (roleId: number): Promise<void> => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK === 'true') {
    return;
  }

  await axiosInstance.delete(`${ROUTES.USER.ACCESS_CONTROL.FETCH_LIST}/${roleId}`);
};

// Export all functions as part of the service object
export const roleManagementService = {
  getSystemRoles,
  storeNewSystem,
  storeNewRole,
  removeSystem,
  removeRole
};
