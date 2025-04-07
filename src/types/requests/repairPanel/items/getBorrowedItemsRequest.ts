import { DateObject } from 'react-multi-date-picker';

export type GetBorrowedItemsRequest = {
  deliverer?: string;
  receiver?: string;
  assetNumber?: string;
  deliverAt?: string | Date | DateObject;
  receiveAt?: string | Date | DateObject;
  itemCategories?: string[];
};
