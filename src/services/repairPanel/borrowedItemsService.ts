import axiosInstance from '../baseService';
import { GetBorrowedItemsRequest } from 'src/types';

interface BorrowedItem {
  id: string;
  itemName: string;
  borrowerName: string;
  borrowDate: string;
  returnDate?: string;
}

const getBorrowedItemsList = async (request: GetBorrowedItemsRequest) => {
  const response = await axiosInstance.get('/api/repair-panel/borrowed-items', {
    params: request
  });
  return response.data;
};

export { getBorrowedItemsList };
