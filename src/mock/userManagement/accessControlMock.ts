import { AccessControlListResponseType, RichViewType } from 'src/types';

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

const HefazatGrantsMock: RichViewType[] = [
  {
    id: '1',
    label: 'سازمانی',
    children: [
      {
        id: '12',
        label: 'حفاظت اطلاعات ناجا',
        children: [
          {
            id: '121',
            label: 'حفاظت اطلاعات فرماندهی استان کردستان'
          },
          {
            id: '122',
            label: 'حفاظت اطلاعات فرماندهی استان آ.ش'
          },
          {
            id: '123',
            label: 'حفاظت اطلاعات فرماندهی استان آ.غ'
          },
          {
            id: '124',
            label: 'حفاظت اطلاعات فرماندهی فاتب'
          }
        ]
      }
    ]
  }
];

const HefazatUserGrantsMock = [
  {
    id: '1',
    name: 'سازمانی'
  }
];

const FarajaGrantsMock: RichViewType[] = [
  {
    id: '1',
    label: 'حفاظت اطلاعات ناجا',
    children: [
      {
        id: '11',
        label: 'عقیدتی سیاسی ناجا'
      },
      {
        id: '12',
        label: 'ناجا'
      }
    ]
  }
];

const FarajaUserGrantsMock = [
  {
    id: '1',
    name: 'عقیدتی سیاسی ناجا'
  },
  {
    id: '11',
    name: 'حفاظت اطلاعات ناجا'
  },
  {
    id: '12',
    name: 'ناجا'
  }
];

const JobsGrantsMock: RichViewType[] = [
  {
    id: '1',
    label: 'حفاظت اطلاعات ناجا',
    children: [
      {
        id: '11',
        label: 'هیئت رئیسه'
      },
      {
        id: '12',
        label: 'معاونت عملیات'
      },
      {
        id: '13',
        label: 'معاونت حفاظت و پیشگیری'
      },
      {
        id: '14',
        label: 'معاونت نیروی انسانی'
      }
    ]
  }
];

const JobsUserGrantsMock = [
  {
    id: '1',
    name: 'حفاظت اطلاعات ناجا'
  }
];

const GroupAccessUserGrantsMock = [
  {
    id: '1'
  }
];

const RolesWithGrantsMock: object[] = [
  {
    id: '1',
    name: 'سامانه تعمیرات',
    grants: [
      {
        name: 'سامانه تعمیرات کاربران عمومی',
        id: '11',
        hasAccess: true
      },
      {
        name: 'سامانه تعمیرات مدیر',
        id: '12',
        hasAccess: false
      },
      {
        name: 'سامانه تعمیرات مدیران فناوری و امور اداری',
        id: '13',
        hasAccess: false
      },
      {
        name: 'سامانه تعمیرات کارشناس تعمیرات',
        id: '14',
        hasAccess: true
      }
    ]
  },
  {
    id: '2',
    name: 'سامانه هادی',
    grants: [
      {
        name: 'تست 1',
        id: '15',
        hasAccess: false
      },
      {
        name: 'تست 2',
        id: '16',
        hasAccess: true
      }
    ]
  },
  {
    id: '3',
    name: 'سامانه بصیر',
    grants: [
      {
        name: 'دسترسی 1',
        id: '17',
        hasAccess: false
      },
      {
        name: 'دسترسی 2',
        id: '18',
        hasAccess: false
      },
      {
        name: 'دسترسی 3',
        id: '19',
        hasAccess: true
      }
    ]
  }
];

export {
  AccessControlListMock,
  HefazatGrantsMock,
  HefazatUserGrantsMock,
  FarajaGrantsMock,
  FarajaUserGrantsMock,
  JobsGrantsMock,
  JobsUserGrantsMock,
  GroupAccessUserGrantsMock,
  RolesWithGrantsMock
};
