import { AccessControlListResponseType } from 'src/types';

const AccessControlListMock: AccessControlListResponseType[] = [
  {
    id: 1,
    name: 'محمود فکری',
    staffCode: '4032343123',
    status: true,
    unit: 'مدیریت مالی'
  },
  {
    id: 2,
    name: 'محمد رازی',
    staffCode: '403236553',
    status: true,
    unit: 'مدیریت فرهنگی'
  },
  {
    id: 3,
    name: 'سعید خجسته',
    staffCode: '7322343123',
    status: false,
    unit: 'مدیریت اداری'
  }
];

export { AccessControlListMock };
