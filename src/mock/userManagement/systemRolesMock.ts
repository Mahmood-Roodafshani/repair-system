import { SystemResponseType, SystemRolesResponse } from 'src/types';

export const SystemsMock: SystemResponseType[] = [
  {
    id: '1',
    status: 'فعال',
    title: 'سامانه تعمیرات'
  }
];

export const SystemFullRolesMock: SystemRolesResponse[] = [
  {
    id: '11',
    label: 'درخواست تعمیر',
    children: [
      {
        id: '111',
        label: 'ثبت'
      },
      {
        id: '112',
        label: 'ویرایش'
      },
      {
        id: '113',
        label: 'حذف'
      },
      {
        id: '114',
        label: 'جستجو'
      },
      {
        id: '115',
        label: 'مشاهده'
      }
    ]
  },
  {
    id: '1',
    label: 'فرم کمیسیون',
    status: true
  },
  {
    id: '2',
    label: 'فرم تعمیر بعثه',
    status: true
  },
  {
    id: '3',
    label: 'کارتابل',
    children: [
      {
        id: '331',
        label: 'ثبت'
      },
      {
        id: '332',
        label: 'ویرایش'
      },
      {
        id: '333',
        label: 'حذف'
      },
      {
        id: '334',
        label: 'جستجو'
      },
      {
        id: '335',
        label: 'مشاهده'
      }
    ],
    status: false
  }
];

export const SystemRolesMock: SystemRolesResponse[] = [
  {
    id: '1',
    label: 'صفحه اصلی',
    status: true
  },
  {
    id: '2',
    label: 'گزارش عملکرد یگانی',
    status: true
  },
  {
    id: '3',
    label: 'درخواست تعمیر',
    status: false
  }
];
