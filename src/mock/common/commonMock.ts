import { OrganizationUnitResponseType, RoleResponseType } from 'src/types';

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

const OrganizationUnitsMock: OrganizationUnitResponseType[] = [
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

export { RolesMock, OrganizationUnitsMock };
