import {
  CodingMock,
  CodingAccessPage1Mock,
  CodingAccessPage2Mock
} from "src/mock";
import { timeout } from 'src/utils/helper';
import { ROUTES } from "src/constants/routes";
import axiosInstance from '../baseService';

interface CodingResponse {
  statusCode: number;
  content?: any[];
}

const fetchCodingList = async (): Promise<CodingResponse> => {
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

const fetchCodingAccessList = async (): Promise<CodingResponse> => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    return {
      statusCode: 200,
      content: [...CodingAccessPage1Mock.content, ...CodingAccessPage2Mock.content]
    };
  }
  const response = await axiosInstance.get(ROUTES.CODING.FETCH_ACCESS_LIST);
  return response.data;
};

const removeCoding = async ({ id }: { id: string | number }): Promise<CodingResponse> => {
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

const createCoding = async ({ data }: { data: { name: string } }): Promise<CodingResponse> => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200
    };
  }
  const response = await axiosInstance.post(ROUTES.CODING.CREATE, data);
  return response.data;
};

const createCodingAccess = async ({ data }: { data: { name: string } }): Promise<CodingResponse> => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200
    };
  }
  const response = await axiosInstance.post(ROUTES.CODING.CREATE_ACCESS, data);
  return response.data;
};

const updateCoding = async ({ id, data }: { id: string | number; data: { name: string } }): Promise<CodingResponse> => {
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

const removeCodingAccess = async ({ id }: { id: string | number }): Promise<CodingResponse> => {
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
