import { BorrowedItemsResponse, ItemsResponse } from 'src/types';

const ItemsMock: ItemsResponse[] = [
  {
    id: 1,
    title: 'صندلی',
    refCode: '235654654',
    category: 'غیرفناوری - اداری'
  },
  {
    id: 2,
    title: 'میز',
    refCode: '656456546',
    category: 'فناوری - رایانه'
  }
];

const BorrowedItemsMock: BorrowedItemsResponse[] = [
  {
    id: 1,
    itemName: 'صندلی',
    borrowerName: 'میلاد رستمی',
    borrowDate: '1401/12/15',
    returnDate: '1401/12/16',
    organizationUnit: 'واحد فناوری اطلاعات',
    itemCategory: 'غیرفناوری - اداری'
  },
  {
    id: 2,
    itemName: 'میز',
    borrowerName: 'محمد بابایی',
    borrowDate: '1401/12/15',
    returnDate: '1401/12/16',
    organizationUnit: 'واحد فناوری اطلاعات',
    itemCategory: 'فناوری - رایانه'
  }
];

export { ItemsMock, BorrowedItemsMock };
