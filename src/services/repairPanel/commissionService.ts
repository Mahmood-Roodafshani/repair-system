import { timeout } from 'src/utils/helper';
import { ROUTES } from 'src/constants/routes';
import axiosInstance from '../baseService';
import {
  CreateNewCommissionRequest,
  GetCommissionListRequest,
  GetItemListInCommissionQueueRequest
} from '@/types';
import { CommissionListMock, ItemsInCommissionQueueListMock } from '@/mock';

const fetchCommissionList = async (request: GetCommissionListRequest) => {
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
) => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200,
      content: ItemsInCommissionQueueListMock
    };
  }
  //todo: build query params from filter
  const response = await axiosInstance.get(ROUTES.REPAIR.COMMISSION.ITEMS_IN_QUEUE, { params: request });
  return response.data;
};

const createNewCommission = async (data: CreateNewCommissionRequest) => {
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
}) => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200
    };
  }
  const response = await axiosInstance.put(ROUTES.REPAIR.COMMISSION.UPDATE(id), form);
  return response.data;
};

export {
  fetchCommissionList,
  createNewCommission,
  updateCommission,
  fetchItemsInCommissionQueue
};
