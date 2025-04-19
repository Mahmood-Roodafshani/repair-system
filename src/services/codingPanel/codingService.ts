import {
  CodingAccessPage1Mock,
  CodingAccessPage2Mock,
  CodingMock
} from 'src/mock';
import { CodingAccessRequest, CodingRequest, PageableRequest } from 'src/types';
import { timeout } from 'src/utils/helper';
import ROUTES from '../routes';
import axiosInstance from '../baseService';

const fetchCodingList = async () => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200,
      content: CodingMock
    };
  }
  const response = await axiosInstance.get(ROUTES.ACCESS_CONTROL_FETCH_LIST);
  return response;
};

const fetchCodingAccessList = async (request: PageableRequest<unknown>) => {
  console.log('service call');

  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200,
      content:
        request.pageIndex === 0 ? CodingAccessPage1Mock : CodingAccessPage2Mock
    };
  }
  const response = await axiosInstance.get(ROUTES.ACCESS_CONTROL_FETCH_LIST);
  return response;
};

const removeCoding = async ({ codingId }: { codingId: string | number }) => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200
    };
  }

  const response = await axiosInstance.delete(ROUTES.ACCESS_CONTROL_FETCH_LIST + codingId);
  return response;
};

const createCoding = async (data: CodingRequest) => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200
    };
  }

  const response = await axiosInstance.post(ROUTES.ACCESS_CONTROL_FETCH_LIST, data);
  return response;
};

const createCodingAccess = async (data: CodingAccessRequest) => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200
    };
  }

  const response = await axiosInstance.post(ROUTES.ACCESS_CONTROL_FETCH_LIST, data);
  return response;
};

const updateCoding = async ({
  id,
  data
}: {
  id: string | number;
  data: CodingRequest;
}) => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200
    };
  }

  const response = await axiosInstance.put(ROUTES.ACCESS_CONTROL_FETCH_LIST + id, data);
  return response;
};

const removeCodingAccess = async ({
  accessId
}: {
  accessId: string | number;
}) => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200
    };
  }

  const response = await axiosInstance.delete(ROUTES.ACCESS_CONTROL_FETCH_LIST + accessId);
  return response;
};

export {
  createCoding,
  fetchCodingList,
  removeCoding,
  removeCodingAccess,
  updateCoding,
  fetchCodingAccessList,
  createCodingAccess
};
