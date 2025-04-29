import { ROUTES } from 'src/constants/routes';
import axiosInstance from '../baseService';
import { ApiResponse } from 'src/types/responses/apiResponse';

interface GroupAccess {
  id: string | number;
  name: string;
}

export const getGroupAccessList = async ({ name }: { name?: string }): Promise<ApiResponse<GroupAccess[]>> => {
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
      statusCode: 200,
      content: undefined
    };
  }
  const response = await axiosInstance.post(ROUTES.USER.GROUP_ACCESS.REMOVE, { groupId });
  return {
    statusCode: response.status,
    content: undefined
  };
};

export const createGroupAccess = async (data: GroupAccess): Promise<ApiResponse<void>> => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    return {
      statusCode: 200,
      content: undefined
    };
  }
  const response = await axiosInstance.post(ROUTES.USER.GROUP_ACCESS.ADD, data);
  return {
    statusCode: response.status,
    content: undefined
  };
};

export const updateGroupAccess = async (id: string, data: GroupAccess): Promise<ApiResponse<void>> => {
  const response = await axiosInstance.post(ROUTES.USER.GROUP_ACCESS.ADD, { ...data, id });
  return {
    statusCode: response.status,
    content: undefined
  };
};

export const deleteGroupAccess = async (id: string): Promise<ApiResponse<void>> => {
  const response = await axiosInstance.delete(`${ROUTES.USER.GROUP_ACCESS.REMOVE}/${id}`);
  return {
    statusCode: response.status,
    content: undefined
  };
};
