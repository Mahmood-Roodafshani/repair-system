import {
  RichViewType,
  SystemResponseType,
  SystemRolesResponse
} from 'src/types';

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
    id: '0',
    label: 'سامانه تعمیرات',
    children: [
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
    ]
  }
];

export const MainSystemsMock: RichViewType[] = [
  {
    id: '1',
    label: 'سامانه تعمیرات',
    children: [
      {
        id: '11',
        label: 'درخواست تعمیر'
      },
      {
        id: '12',
        label: 'فرم کمیسیون'
      },
      {
        id: '13',
        label: 'فرم تعمیر بعثه'
      },
      {
        id: '14',
        label: 'فرم تعمیر برون سازمانی'
      },
      {
        id: '15',
        label: 'فرم تعمیر سازمان حج'
      },
      {
        id: '16',
        label: 'فرم تحویل اقلام'
      },
      {
        id: '17',
        label: 'فرم کارشناسی'
      },
      {
        id: '18',
        label: 'فرم خروج اقلام از سازمان'
      },
      {
        id: '19',
        label: 'کارتابل'
      }
    ]
  },
  {
    id: '2',
    label: 'سامانه مدیریت کاربران'
  },
  {
    id: '3',
    label: 'سامانه اطلاعات پایه'
  },
  {
    id: '4',
    label: 'سامانه مشاغل سازمانی'
  },
  {
    id: '5',
    label: 'سامانه ردیابی کاربران'
  },
  {
    id: '6',
    label: 'سامانه کدینگ'
  }
];
