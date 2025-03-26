export type BorrowedItemsResponse = {
  id: string | number;
  receiver?: string;
  deliverer?: string;
  deliverAt?: string;
  receiveAt?: string;
  assetNumber: string;
  category: string;
  submitAt: string;
  submitter: string;
};
