import {
  SystemRolesMock,
  SystemsMock
} from 'src/mock/userManagement/systemRolesMock';
import ROUTES from '../routes';
import axiosInstance from '../baseService';
import { timeout } from 'src/utils/helper';

const searchRoleBySystemTitle = async ({ title }: { title: string }) => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200,
      content: SystemsMock
    };
  }
  const response = await axiosInstance.get(ROUTES.SEARCH_ROLE_BY_SYSTEM_TITLE);
  return response;
};

const getSystemRoles = async ({ systemId }: { systemId: string | number }) => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200,
      content: SystemRolesMock
    };
  }
  const response = await axiosInstance.get(ROUTES.STORE_NEW_SYSTEM + systemId);
  return response;
};

const storeNewSystem = async ({ title }: { title: string }) => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200
    };
  }
  const response = await axiosInstance.post(ROUTES.STORE_NEW_SYSTEM, {
    title: title
  });
  return response;
};

const storeNewRole = async ({
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
  const response = await axiosInstance.post(ROUTES.STORE_NEW_ROLE, {
    systemId,
    roleId,
    title
  });
  return response;
};

const removeSystem = async ({ systemId }: { systemId: string | number }) => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200
    };
  }
  const response = await axiosInstance.delete(ROUTES.STORE_NEW_SYSTEM + systemId);
  return response;
};

const removeRole = async ({ roleId }: { roleId: string | number }) => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200
    };
  }
  const response = await axiosInstance.delete(ROUTES.STORE_NEW_ROLE + roleId);
  return response;
};

export {
  searchRoleBySystemTitle,
  getSystemRoles,
  storeNewSystem,
  storeNewRole,
  removeSystem,
  removeRole
};
