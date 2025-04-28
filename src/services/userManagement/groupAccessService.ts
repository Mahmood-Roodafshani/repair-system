import { timeout } from 'src/utils/helper';
import { ROUTES } from 'src/constants/routes';
import axiosInstance from '../baseService';
import { GroupAccessesMock, GroupAccessRolesMock } from 'src/mock';

export const getGroupAccesses = async ({ name }: { name?: string }) => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    return {
      statusCode: 200,
      content: []
    };
  }
  const response = await axiosInstance.get(ROUTES.USER.GROUP_ACCESS.FETCH_LIST, {
    params: { name }
  });
  return response.data;
};

export const getGroupAccessRoles = async ({ groupId }: { groupId: string | number }) => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    return {
      statusCode: 200,
      content: []
    };
  }
  const response = await axiosInstance.get(ROUTES.USER.GROUP_ACCESS.FETCH_ROLES, {
    params: { groupId }
  });
  return response.data;
};

export const removeGroupAccess = async ({ groupId }: { groupId: string | number }) => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    return {
      statusCode: 200
    };
  }
  const response = await axiosInstance.delete(ROUTES.USER.GROUP_ACCESS.REMOVE, {
    params: { groupId }
  });
  return response.data;
};

export const addGroupAccess = async ({ data }: { data: { name: string } }) => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    return {
      statusCode: 200
    };
  }
  const response = await axiosInstance.post(ROUTES.USER.GROUP_ACCESS.ADD, data);
  return response.data;
};
