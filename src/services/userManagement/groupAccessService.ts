import { timeout } from 'src/utils/helper';
import { ROUTES } from 'src/constants/routes';
import axiosInstance from '../baseService';
import { GroupAccessesMock, GroupAccessRolesMock } from 'src/mock';

const getGroupAccesses = async ({ name }: { name?: string }) => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200,
      content: GroupAccessesMock
    };
  }
  //todo: build query params from filter
  const response = await axiosInstance.get(ROUTES.USER.ACCESS_CONTROL.FETCH_LIST);
  return response;
};

const getGroupAccessRoles = async () => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200,
      content: GroupAccessRolesMock
    };
  }
  //todo: build query params from filter
  const response = await axiosInstance.get(ROUTES.USER.ACCESS_CONTROL.FETCH_LIST);
  return response;
};

const removeGroupAccess = async ({ groupId }: { groupId: string | number }) => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200
    };
  }
  //todo: build query params from filter
  const response = await axiosInstance.delete(ROUTES.USER.ACCESS_CONTROL.FETCH_LIST);
  return response;
};

const addGroupAccess = async ({ data }: { data: any }) => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200
    };
  }
  //todo: build query params from filter
  const response = await axiosInstance.post(ROUTES.USER.ACCESS_CONTROL.FETCH_LIST, data);
  return response;
};

export {
  getGroupAccesses,
  removeGroupAccess,
  addGroupAccess,
  getGroupAccessRoles
};
