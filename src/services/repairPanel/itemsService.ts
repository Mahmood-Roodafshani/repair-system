import { timeout } from 'src/utils/helper';
import { get } from '../service';
import ROUTES from '../routes';
import { ItemsMock } from 'src/mock';
import { GetItemsRequest } from 'src/types';

const fetchItemsList = async (request: GetItemsRequest) => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200,
      content: ItemsMock
    };
  }
  //todo: build query params from filter
  const response = await get({
    url: ROUTES.ACCESS_CONTROL_FETCH_LIST
  });
  return response;
};

const fetchItemsListFromCentralAssetPanel = async (
  request: GetItemsRequest
) => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200,
      content: ItemsMock
    };
  }
  //todo: build query params from filter
  const response = await get({
    url: ROUTES.ACCESS_CONTROL_FETCH_LIST
  });
  return response;
};

export { fetchItemsList, fetchItemsListFromCentralAssetPanel };
