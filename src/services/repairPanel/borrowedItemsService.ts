import axiosInstance from '../baseService';
import { GetBorrowedItemsRequest } from 'src/types';
import { ROUTES } from 'src/constants/routes';
import { ApiResponse } from 'src/types/responses/apiResponse';
import { BorrowedItemsResponse } from 'src/types/responses/repairPanel/borrowedItemsResponse';

const getBorrowedItemsList = async (request: GetBorrowedItemsRequest): Promise<ApiResponse<BorrowedItemsResponse[]>> => {
  const response = await axiosInstance.get(ROUTES.REPAIR.BORROWED_ITEMS.LIST, {
    params: request
  });
  return response.data;
};

const removeBorrowedItem = async ({ id }: { id: string | number }): Promise<ApiResponse<void>> => {
  const response = await axiosInstance.delete(`${ROUTES.REPAIR.BORROWED_ITEMS.LIST}/${id}`);
  return response.data;
};

export { getBorrowedItemsList, removeBorrowedItem };
