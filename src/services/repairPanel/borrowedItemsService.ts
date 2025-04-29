import axiosInstance from '../baseService';
import { GetBorrowedItemsRequest } from 'src/types';
import { ROUTES } from 'src/constants/routes';
import { ApiResponse } from 'src/types/responses/apiResponse';

const getBorrowedItemsList = async (request: GetBorrowedItemsRequest): Promise<ApiResponse<{
  id: string;
  itemName: string;
  borrowerName: string;
  borrowDate: string;
  returnDate?: string;
}[]>> => {
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
