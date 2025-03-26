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
    receiver: 'میلاد رستمی',
    deliverer: 'محمد بابایی',
    deliverAt: '1401/12/15',
    assetNumber: '14789654',
    category: 'فناوری/رایانه/کیس',
    submitter: 'حسین مهدوی فر',
    submitAt: '1401/12/16',
    receiveAt: '-'
  },
  {
    id: 2,
    receiver: 'میلاد رستمی',
    deliverer: 'محمد بابایی',
    deliverAt: '1401/12/15',
    assetNumber: '14789654',
    category: 'فناوری/رایانه/کیس',
    submitter: 'حسین مهدوی فر',
    submitAt: '1401/12/16',
    receiveAt: '-'
  }
];

export { ItemsMock, BorrowedItemsMock };
