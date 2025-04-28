import axiosInstance from '../baseService';
import { ROUTES } from 'src/constants/routes';
import { AccessControlFilterType, AccessControlListResponseType } from 'src/types';
import { timeout } from 'src/utils/helper';

interface ApiResponse<T> {
  statusCode: number;
  content?: T;
}

export const accessControlFetchList = async ({
  filter
}: {
  filter: AccessControlFilterType;
}): Promise<AccessControlListResponseType[]> => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return [];
  }
  const response = await axiosInstance.post(ROUTES.USER.ACCESS_CONTROL.FETCH_LIST, { filter });
  return response.data;
};

export const findStaffByCode = async ({ staffCode }: { staffCode: string }): Promise<ApiResponse<{ id: string; name: string; granted_jobs: string[] }>> => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200,
      content: {
        id: '1',
        name: 'Test Staff',
        granted_jobs: ['1', '2']
      }
    };
  }
  const response = await axiosInstance.post(ROUTES.USER.ACCESS_CONTROL.FETCH_LIST, { staffCode });
  return response.data;
};

export const createNewAccessControl = async ({
  staffCode,
  grants
}: {
  staffCode: string;
  grants: string[];
}): Promise<ApiResponse<void>> => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    return {
      statusCode: 200
    };
  }
  const response = await axiosInstance.post(ROUTES.USER.ACCESS_CONTROL.FETCH_LIST, {
    staffCode,
    grants
  });
  return response.data;
};

export const fetchGrantsByAccess = async ({
  access
}: {
  access: string;
}): Promise<{ id: string; name: string }[]> => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return [
      { id: 'FARAJA', name: 'FARAJA' },
      { id: 'HEFAZAT', name: 'HEFAZAT' },
      { id: 'JOBS', name: 'JOBS' }
    ];
  }
  const response = await axiosInstance.get(ROUTES.USER.ACCESS_CONTROL.FETCH_LIST, {
    params: { access }
  });
  return response.data;
};

export const fetchUserGrantsByAccess = async ({
  userId,
  access
}: {
  userId: string;
  access: string;
}): Promise<{ id: string; name: string }[]> => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return [
      { id: 'FARAJA', name: 'FARAJA' },
      { id: 'HEFAZAT', name: 'HEFAZAT' },
      { id: 'JOBS', name: 'JOBS' },
      { id: 'GROUP_ACCESS', name: 'GROUP_ACCESS' }
    ];
  }
  const response = await axiosInstance.get(ROUTES.USER.ACCESS_CONTROL.FETCH_LIST, {
    params: { userId, access }
  });
  return response.data;
};

export const getRolesWithGrants = async (): Promise<{ id: string; name: string }[]> => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return [
      { id: '1', name: 'Role 1' },
      { id: '2', name: 'Role 2' }
    ];
  }
  const response = await axiosInstance.get(ROUTES.USER.ACCESS_CONTROL.FETCH_LIST);
  return response.data;
};
