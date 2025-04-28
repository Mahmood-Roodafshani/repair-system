import { timeout } from 'src/utils/helper';
import { ROUTES } from 'src/constants/routes';
import axiosInstance from '../baseService';
import {
  CreateNewCommissionRequest,
  GetCommissionListRequest,
  GetItemListInCommissionQueueRequest,
  CommisionListResponse
} from '@/types';
import { ItemsInCommissionQueueListMock } from '@/mock';
import { GetItemListInCommissionQueueResponse } from '../../types/responses/repairPanel/commission/getItemListInCommissionQueueResponse';

interface ApiResponse<T> {
  statusCode: number;
  content?: T;
}

const fetchCommissionList = async (request: GetCommissionListRequest): Promise<ApiResponse<CommisionListResponse[]>> => {
  try {
    const response = await axiosInstance.get(ROUTES.REPAIR.COMMISSION.LIST, { params: request });
    return response.data;
  } catch (error) {
    console.error('Error fetching commission list:', error);
    throw error;
  }
};

const fetchItemsInCommissionQueue = async (
  request: GetItemListInCommissionQueueRequest
): Promise<GetItemListInCommissionQueueResponse[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(ItemsInCommissionQueueListMock);
    }, 1000);
  });
};

const createNewCommission = async (data: CreateNewCommissionRequest): Promise<ApiResponse<void>> => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200
    };
  }
  const response = await axiosInstance.post(ROUTES.REPAIR.COMMISSION.CREATE, data);
  return response.data;
};

const updateCommission = async ({
  id,
  form
}: {
  id: string | number;
  form: CreateNewCommissionRequest;
}): Promise<ApiResponse<void>> => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200
    };
  }
  const response = await axiosInstance.put(ROUTES.REPAIR.COMMISSION.UPDATE(id), form);
  return response.data;
};

export class CommissionService {
  static async fetchItemsInCommissionQueue(
    request: GetItemListInCommissionQueueRequest
  ): Promise<GetItemListInCommissionQueueResponse[]> {
    return [];
  }
}

export {
  fetchCommissionList,
  createNewCommission,
  updateCommission,
  fetchItemsInCommissionQueue
};
