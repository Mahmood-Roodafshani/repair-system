import { StaffInfoMock } from 'src/mock';
import { StaffInfoRequestType } from 'src/types';
import { timeout } from 'src/utils/helper';
import { ROUTES } from 'src/constants/routes';
import axiosInstance from '../baseService';

const fetchNonStaffInfoList = async ({
  filter
}: {
  filter: StaffInfoRequestType;
}) => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200,
      content: StaffInfoMock
    };
  }
  //todo: build query params from filter
  const response = await axiosInstance.get(ROUTES.USER.ACCESS_CONTROL.FETCH_LIST);
  return response;
};

const removeNonStaff = async ({ staffId }: { staffId: string | number }) => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200
    };
  }
  const response = await axiosInstance.delete(ROUTES.USER.ACCESS_CONTROL.FETCH_LIST + staffId);
  return response;
};

const updateNonStaff = async ({
  staffId,
  staffInfo
}: {
  staffId: string | number;
  staffInfo: StaffInfoRequestType;
}) => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200
    };
  }
  const response = await axiosInstance.put(ROUTES.USER.ACCESS_CONTROL.FETCH_LIST + staffId, staffInfo);
  return response;
};

const createNonStaff = async ({
  staffInfo
}: {
  staffInfo: StaffInfoRequestType;
}) => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200
    };
  }
  const response = await axiosInstance.post(ROUTES.USER.ACCESS_CONTROL.FETCH_LIST, staffInfo);
  return response;
};

export {
  createNonStaff,
  fetchNonStaffInfoList,
  removeNonStaff,
  updateNonStaff
};
