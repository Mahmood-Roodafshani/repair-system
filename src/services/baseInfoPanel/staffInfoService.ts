import { StaffInfoMock } from 'src/mock';
import { StaffInfoRequestType } from 'src/types';
import { timeout } from 'src/utils/helper';
import { ROUTES } from 'src/constants/routes';
import axiosInstance from '../baseService';

const fetchStaffInfoList = async ({
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
  const response = await axiosInstance.get(ROUTES.BASE_INFO.STAFF.FETCH_LIST);
  return response;
};

const removeStaff = async ({ staffId }: { staffId: string | number }) => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200
    };
  }
  const response = await axiosInstance.delete(ROUTES.BASE_INFO.STAFF.REMOVE(staffId));
  return response;
};

const updateStaff = async ({
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
  const response = await axiosInstance.put(ROUTES.BASE_INFO.STAFF.UPDATE(staffId), staffInfo);
  return response;
};

const createStaff = async ({
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
  const response = await axiosInstance.post(ROUTES.BASE_INFO.STAFF.CREATE, staffInfo);
  return response;
};

export { createStaff, fetchStaffInfoList, removeStaff, updateStaff };
