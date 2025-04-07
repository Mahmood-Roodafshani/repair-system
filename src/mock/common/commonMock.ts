import { OptionType } from 'src/constants';
import {
  OrganizationUnitResponseType,
  RichViewType,
  RoleResponseType
} from 'src/types';

const RolesMock: RoleResponseType[] = [
  {
    id: '1',
    label: 'سامانه تعمیرات',
    children: [
      {
        id: '11',
        label: 'مدیر'
      },
      {
        id: '12',
        label: 'کاربران عمومی'
      },
      {
        id: '13',
        label: 'کارشناس تعمیر'
      }
    ]
  },
  {
    id: '2',
    label: 'سامانه مدیریت کاربران'
  }
];

const OrganizationUnitsMock: RichViewType[] = [
  {
    id: '1',
    label: 'مدیریت فناوری',
    children: [
      {
        id: '11',
        label: 'اداره شبکه',
        children: [
          {
            id: '111',
            label: 'اداره رایانه',
            children: [
              {
                id: '1111',
                label: 'اداره بانک اطلاعاتی'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: '2',
    label: 'حوزه ریاست'
  }
];

const FieldsMock: RichViewType[] = [
  {
    id: '1',
    label: 'مهندسی',
    children: [
      {
        id: '11',
        label: 'فناوری اطلاعات',
        children: [
          {
            id: '111',
            label: 'رایانه'
          },
          {
            id: '112',
            label: 'شبکه'
          }
        ]
      }
    ]
  },
  {
    id: '2',
    label: 'معدن'
  },
  {
    id: '3',
    label: 'پزشکی',
    children: [
      {
        id: '31',
        label: 'پرستاری'
      }
    ]
  }
];

const CoursesMock: RichViewType[] = [
  {
    id: '1',
    label: 'مهندسی',
    children: [
      {
        id: '11',
        label: 'فناوری اطلاعات',
        children: [
          {
            id: '111',
            label: 'برنامه نویسی',
            children: [
              {
                id: '1111',
                label: 'JAVA SE'
              },
              {
                id: '1112',
                label: 'J2E'
              }
            ]
          },
          {
            id: '112',
            label: 'شبکه',
            children: [
              {
                id: '1121',
                label: 'امنیت شبکه'
              }
            ]
          }
        ]
      }
    ]
  }
];

const CitiesMock: RichViewType[] = [
  {
    id: '2',
    label: 'تهران'
  },
  {
    id: '1',
    label: 'زنجان',
    children: [
      {
        id: '11',
        label: 'طارم'
      },
      {
        id: '12',
        label: 'ابهر'
      }
    ]
  },
  {
    id: '3',
    label: 'اصفهان'
  }
];

const ActivityMock: OptionType[] = [
  {
    id: '1',
    label: 'همه'
  },
  {
    id: '2',
    label: 'ثبت'
  },
  {
    id: '3',
    label: 'ویرایش'
  },
  {
    id: '4',
    label: 'حذف'
  },
  {
    id: '5',
    label: 'مشاهده'
  },
  {
    id: '6',
    label: 'جستجو'
  },
  {
    id: '7',
    label: 'ورود'
  },
  {
    id: '8',
    label: 'خروج'
  },
  {
    id: '9',
    label: 'رمزعبور نادرست'
  }
];

const ActivityFieldsMock: RichViewType[] = [
  {
    id: '1',
    label: 'خودرویی',
    children: [
      {
        id: '12',
        label: 'فناوری'
      },
      {
        id: '13',
        label: 'غیرفناوری'
      },
      {
        id: '14',
        label: 'ساختمان'
      }
    ]
  }
];

const ItemCategoryFieldsMock: RichViewType[] = [
  {
    id: '1',
    label: 'خودرویی',
    children: [
      {
        id: '12',
        label: 'فناوری',
        children: [
          {
            id: '121',
            label: 'شبکه'
          },
          {
            id: '122',
            label: 'رایانه',
            children: [
              {
                id: '1221',
                label: 'کیس'
              }
            ]
          }
        ]
      },
      {
        id: '13',
        label: 'غیرفناوری'
      },
      {
        id: '14',
        label: 'ساختمان'
      }
    ]
  }
];

export {
  RolesMock,
  OrganizationUnitsMock,
  CitiesMock,
  CoursesMock,
  FieldsMock,
  ActivityMock,
  ActivityFieldsMock,
  ItemCategoryFieldsMock
};
