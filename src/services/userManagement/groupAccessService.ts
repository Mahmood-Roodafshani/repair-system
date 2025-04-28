import { ROUTES } from 'src/constants/routes';
import axiosInstance from '../baseService';

interface ApiResponse<T> {
  statusCode: number;
  content?: T;
}

interface GroupAccess {
  id: string | number;
  name: string;
}

export const getGroupAccesses = async ({ name }: { name?: string }): Promise<ApiResponse<GroupAccess[]>> => {
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

export const getGroupAccessRoles = async ({ groupId }: { groupId: string | number }): Promise<ApiResponse<{ id: string; name: string }[]>> => {
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

export const removeGroupAccess = async ({ groupId }: { groupId: string | number }): Promise<ApiResponse<void>> => {
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

export const addGroupAccess = async ({ data }: { data: { name: string } }): Promise<ApiResponse<void>> => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    return {
      statusCode: 200
    };
  }
  const response = await axiosInstance.post(ROUTES.USER.GROUP_ACCESS.ADD, data);
  return response.data;
};
