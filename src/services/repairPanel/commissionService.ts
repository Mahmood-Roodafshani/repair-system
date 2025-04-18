import { timeout } from 'src/utils/helper';
import ROUTES from '../routes';
import { get, post, put } from '../service';
import {
  CreateNewCommissionRequest,
  GetCommissionListRequest,
  GetItemListInCommissionQueueRequest
} from '@/types';
import { CommissionListMock, ItemsInCommissionQueueListMock } from '@/mock';

const fetchCommissionList = async (request: GetCommissionListRequest) => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200,
      content: CommissionListMock
    };
  }
  //todo: build query params from filter
  const response = await get({
    url: ROUTES.ACCESS_CONTROL_FETCH_LIST
  });
  return response;
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
  const response = await get({
    url: ROUTES.ACCESS_CONTROL_FETCH_LIST
  });
  return response;
};

const createNewCommission = async (data: CreateNewCommissionRequest) => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200
    };
  }
  const response = await post({
    url: ROUTES.ACCESS_CONTROL_FETCH_LIST,
    data: data
  });
  return response;
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
  const response = await put({
    url: ROUTES.ACCESS_CONTROL_FETCH_LIST + id,
    data: form
  });
  return response;
};

export {
  fetchCommissionList,
  createNewCommission,
  updateCommission,
  fetchItemsInCommissionQueue
};
