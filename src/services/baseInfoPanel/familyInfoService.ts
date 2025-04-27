import { StaffInfoMock } from 'src/mock';
import { StaffInfoRequestType } from 'src/types';
import { timeout } from 'src/utils/helper';
import { ROUTES } from 'src/constants/routes';
import axiosInstance from '../baseService';

const fetchFamilyInfoList = async ({
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

const removeFamilyInfo = async ({
  memberId
}: {
  memberId: string | number;
}) => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200
    };
  }
  const response = await axiosInstance.delete(ROUTES.USER.ACCESS_CONTROL.FETCH_LIST + memberId);
  return response;
};

const updateFamilyInfo = async ({
  memberId,
  memberInfo
}: {
  memberId: string | number;
  memberInfo: StaffInfoRequestType;
}) => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200
    };
  }
  const response = await axiosInstance.put(ROUTES.USER.ACCESS_CONTROL.FETCH_LIST + memberId, memberInfo);
  return response;
};

const createFamilyInfo = async ({
  memberInfo
}: {
  memberInfo: StaffInfoRequestType;
}) => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200
    };
  }
  const response = await axiosInstance.post(ROUTES.USER.ACCESS_CONTROL.FETCH_LIST, memberInfo);
  return response;
};

export {
  createFamilyInfo,
  fetchFamilyInfoList,
  removeFamilyInfo,
  updateFamilyInfo
};
