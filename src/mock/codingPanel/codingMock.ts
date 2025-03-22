import { CodingAccessResponse, CodingResponse } from 'src/types';

const CodingMock: CodingResponse[] = [
  {
    id: '1',
    name: 'ساختار سازمانی حفا',
    parentId: '112',
    priority: 1
  },
  {
    id: '2',
    name: 'مدرک تحصیلی',
    parentId: '1121',
    priority: 2
  },
  {
    id: '3',
    name: 'اقلام و تجهیزات',
    parentId: '12',
    priority: 13
  },
  {
    id: '4',
    name: 'رشته تحصیلی',
    parentId: '13',
    priority: 4
  },
  {
    id: '5',
    name: 'رتبه سازمانی',
    parentId: '111',
    priority: 8
  },
  {
    id: '6',
    name: 'اقدامات اجرایی',
    parentId: '1121',
    priority: 2
  }
];

const CodingAccessMock: CodingAccessResponse[] = [
  {
    id: 1,
    username: 'حسین مهدوی فر',
    codingName: 'ساختار سازمانی حفا'
  },
  {
    id: 2,
    username: 'مهدی دارابی',
    codingName: 'مدرک تحصیلی'
  },
  {
    id: 3,
    username: 'محمد بابایی',
    codingName: 'اقلام و تجهیزات'
  },
  {
    id: 4,
    username: 'مهدی بهادر',
    codingName: 'رشته تحصیلی'
  },
  {
    id: 5,
    username: 'محمد ون دار',
    codingName: 'رتبه سازمانی'
  },
  {
    id: 6,
    username: 'حمید لرستانی',
    codingName: 'اقدامات اجرایی'
  }
];

export { CodingMock, CodingAccessMock };
