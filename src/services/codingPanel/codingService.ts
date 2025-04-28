import {
  CodingMock,
  CodingAccessPage1Mock,
  CodingAccessPage2Mock
} from "src/mock";
import { timeout } from 'src/utils/helper';
import { ROUTES } from "src/constants/routes";
import axiosInstance from '../baseService';
import { CodingResponse } from '@/types/responses/codingPanel/codingResponse';
import { CodingAccessResponse } from '@/types/responses/codingPanel/codingAccessResponse';
import { ApiResponse } from 'src/types/responses/apiResponse';

interface PageableResponse<T> {
  content: T[];
  totalCount: number;
  pageIndex: number;
  pageSize: number;
}

const fetchCodingList = async (): Promise<ApiResponse<CodingResponse[]>> => {
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

const fetchCodingAccessList = async (): Promise<ApiResponse<PageableResponse<CodingAccessResponse>>> => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    return {
      statusCode: 200,
      content: {
        content: [...CodingAccessPage1Mock.content, ...CodingAccessPage2Mock.content],
        totalCount: CodingAccessPage1Mock.totalCount,
        pageIndex: CodingAccessPage1Mock.pageIndex,
        pageSize: CodingAccessPage1Mock.pageSize
      }
    };
  }
  const response = await axiosInstance.get(ROUTES.CODING.FETCH_ACCESS_LIST);
  return response.data;
};

const removeCoding = async ({ id }: { id: string | number }): Promise<ApiResponse<void>> => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200,
      content: undefined
    };
  }
  const response = await axiosInstance.delete(ROUTES.CODING.REMOVE, {
    params: { id }
  });
  return response.data;
};

const createCoding = async ({ parentId, childName, priority }: { parentId: string | number; childName: string; priority: number }): Promise<ApiResponse<CodingResponse>> => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200,
      content: {
        id: Math.random().toString(),
        parentId,
        name: childName,
        priority
      }
    };
  }
  const response = await axiosInstance.post(ROUTES.CODING.CREATE, { parentId, childName, priority });
  return response.data;
};

const createCodingAccess = async ({ data }: { data: { username: string; codingName: string } }): Promise<ApiResponse<CodingAccessResponse>> => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200,
      content: {
        id: Math.random().toString(),
        username: data.username,
        codingName: data.codingName
      }
    };
  }
  const response = await axiosInstance.post(ROUTES.CODING.CREATE_ACCESS, data);
  return response.data;
};

const updateCoding = async ({ id, data }: { id: string | number; data: { parentId: string | number; childName: string; priority: number } }): Promise<ApiResponse<CodingResponse>> => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200,
      content: {
        id,
        parentId: data.parentId,
        name: data.childName,
        priority: data.priority
      }
    };
  }
  const response = await axiosInstance.put(ROUTES.CODING.UPDATE, data, {
    params: { id }
  });
  return response.data;
};

const removeCodingAccess = async ({ id }: { id: string | number }): Promise<ApiResponse<void>> => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200,
      content: undefined
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
