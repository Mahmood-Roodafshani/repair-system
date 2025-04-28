import {
  CodingMock,
  CodingAccessPage1Mock,
  CodingAccessPage2Mock
} from "src/mock";
import { CodingAccessRequest, CodingRequest, PageableRequest } from 'src/types';
import { timeout } from 'src/utils/helper';
import { ROUTES } from "src/constants/routes";
import axiosInstance from '../baseService';

const fetchCodingList = async () => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200,
      content: CodingMock
    };
  }
  const response = await axiosInstance.get(ROUTES.CODING.FETCH_LIST);
  return response.data;
};

const fetchCodingAccessList = async () => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    return {
      statusCode: 200,
      content: [...CodingAccessPage1Mock, ...CodingAccessPage2Mock]
    };
  }
  const response = await axiosInstance.get(ROUTES.CODING.FETCH_ACCESS_LIST);
  return response.data;
};

const removeCoding = async ({ id }: { id: string | number }) => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200
    };
  }
  const response = await axiosInstance.delete(ROUTES.CODING.REMOVE, {
    params: { id }
  });
  return response.data;
};

const createCoding = async ({ data }: { data: { name: string } }) => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200
    };
  }
  const response = await axiosInstance.post(ROUTES.CODING.CREATE, data);
  return response.data;
};

const createCodingAccess = async ({ data }: { data: { name: string } }) => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200
    };
  }
  const response = await axiosInstance.post(ROUTES.CODING.CREATE_ACCESS, data);
  return response.data;
};

const updateCoding = async ({ id, data }: { id: string | number; data: { name: string } }) => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200
    };
  }
  const response = await axiosInstance.put(ROUTES.CODING.UPDATE, data, {
    params: { id }
  });
  return response.data;
};

const removeCodingAccess = async ({ id }: { id: string | number }) => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200
    };
  }
  const response = await axiosInstance.delete(ROUTES.CODING.REMOVE_ACCESS, {
    params: { id }
  });
  return response.data;
};

export {
  fetchCodingList,
  fetchCodingAccessList,
  removeCoding,
  createCoding,
  createCodingAccess,
  updateCoding,
  removeCodingAccess
};
