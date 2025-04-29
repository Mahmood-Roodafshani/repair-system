import axiosInstance from '../baseService';
import { ROUTES } from 'src/constants/routes';

interface GetItemsRequest {
  page?: number;
  size?: number;
  sort?: string;
  search?: string;
  categoryId?: string;
}

const getItemsList = async (request: GetItemsRequest) => {
  const response = await axiosInstance.get(ROUTES.REPAIR.ITEMS.LIST, {
    params: request
  });
  return response.data;
};

const getItemsListFromCentralAssetPanel = async (request: GetItemsRequest) => {
  const response = await axiosInstance.get(ROUTES.REPAIR.ITEMS.CENTRAL_ASSET_LIST, {
    params: request
  });
  return response.data;
};

export { getItemsList, getItemsListFromCentralAssetPanel }; 