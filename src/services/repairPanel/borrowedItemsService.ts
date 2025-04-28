import axiosInstance from '../baseService';
import { GetBorrowedItemsRequest } from 'src/types';
import { ROUTES } from 'src/constants/routes';

interface BorrowedItem {
  id: string;
  itemName: string;
  borrowerName: string;
  borrowDate: string;
  returnDate?: string;
}

const getBorrowedItemsList = async (request: GetBorrowedItemsRequest) => {
  const response = await axiosInstance.get(ROUTES.REPAIR.BORROWED_ITEMS.LIST, {
    params: request
  });
  return response.data;
};

export { getBorrowedItemsList };
