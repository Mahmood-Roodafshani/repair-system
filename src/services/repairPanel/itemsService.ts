import axiosInstance from '../baseService';

interface GetItemsRequest {
  page?: number;
  size?: number;
  sort?: string;
  search?: string;
  categoryId?: string;
}

interface Item {
  id: string;
  name: string;
  categoryId: string;
  serialNumber: string;
  status: string;
}

const getItemsList = async (request: GetItemsRequest) => {
  const response = await axiosInstance.get('/api/repair-panel/items', {
    params: request
  });
  return response.data;
};

const getItemsListFromCentralAssetPanel = async (request: GetItemsRequest) => {
  const response = await axiosInstance.get('/api/central-asset-panel/items', {
    params: request
  });
  return response.data;
};

export { getItemsList, getItemsListFromCentralAssetPanel }; 