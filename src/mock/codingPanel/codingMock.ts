import { CodingResponse } from 'src/types';

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

export { CodingMock };
