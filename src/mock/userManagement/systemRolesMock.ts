import {
  RichViewType,
  SystemResponseType,
  SystemRolesResponse
} from 'src/types';
import { SystemRolesResponse as NewSystemRolesResponse } from 'src/types/responses/userManagement/roleManagement/systemRolesResponse';

export const SystemsMock: SystemResponseType[] = [
  {
    id: 1,
    status: 'فعال',
    title: 'سامانه تعمیرات'
  }
];

export const SystemFullRolesMock: SystemRolesResponse[] = [
  {
    id: 11,
    name: 'درخواست تعمیر',
    children: [
      {
        id: 111,
        name: 'ثبت'
      },
      {
        id: 112,
        name: 'ویرایش'
      },
      {
        id: 113,
        name: 'حذف'
      },
      {
        id: 114,
        name: 'جستجو'
      },
      {
        id: 115,
        name: 'مشاهده'
      }
    ]
  },
  {
    id: 1,
    name: 'فرم کمیسیون',
    status: true
  },
  {
    id: 2,
    name: 'فرم تعمیر بعثه',
    status: true
  },
  {
    id: 3,
    name: 'کارتابل',
    children: [
      {
        id: 331,
        name: 'ثبت'
      },
      {
        id: 332,
        name: 'ویرایش'
      },
      {
        id: 333,
        name: 'حذف'
      },
      {
        id: 334,
        name: 'جستجو'
      },
      {
        id: 335,
        name: 'مشاهده'
      }
    ],
    status: false
  }
];

export const SystemRolesMock: NewSystemRolesResponse[] = [
  {
    id: 1,
    name: 'Admin',
    description: 'System Administrator',
    permissions: [
      {
        id: 1,
        name: 'user_management',
        description: 'User Management'
      },
      {
        id: 2,
        name: 'role_management',
        description: 'Role Management'
      }
    ]
  },
  {
    id: 2,
    name: 'User',
    description: 'Regular User',
    permissions: [
      {
        id: 3,
        name: 'view_profile',
        description: 'View Profile'
      }
    ]
  },
  {
    id: 3,
    name: 'Manager',
    description: 'Department Manager',
    permissions: [
      {
        id: 4,
        name: 'manage_department',
        description: 'Manage Department'
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
