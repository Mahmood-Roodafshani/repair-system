export type BorrowedItemsResponse = {
  id: string | number;
  itemName: string;
  borrowerName: string;
  borrowDate: string;
  returnDate?: string;
  organizationUnit: string;
  itemCategory: string;
};
