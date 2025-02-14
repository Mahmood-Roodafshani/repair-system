import { OrganizationUnitResponseType, RoleResponseType } from 'src/types';

const RolesMock: RoleResponseType[] = [
  {
    id: 1,
    name: 'سامانه تعمیرات',
    childs: [
      {
        id: 11,
        name: 'مدیر'
      },
      {
        id: 12,
        name: 'کاربران عمومی'
      },
      {
        id: 13,
        name: 'کارشناس تعمیر'
      }
    ]
  },
  {
    id: 2,
    name: 'سامانه مدیریت کاربران'
  }
];

const OrganizationUnitsMock: OrganizationUnitResponseType[] = [
  {
    id: 1,
    name: 'مدیریت فناوری',
    childs: [
      {
        id: 11,
        name: 'اداره شبکه',
        childs: [
          {
            id: 111,
            name: 'اداره رایانه'
          }
        ]
      }
    ]
  },
  {
    id: 2,
    name: 'حوزه ریاست'
  }
];

export { RolesMock, OrganizationUnitsMock };
