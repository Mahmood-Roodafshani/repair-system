import {
  OptionType
} from 'src/constant/options';
import { RichViewType, StaffInfoResponseType } from 'src/types';
import {Gender,  Degree,
  FamilyRelation,
  MaritalStatus,
  Religion,
  ServiceStatus} from "@/constant";

const PositionDegreeMock: OptionType[] = [
  {
    id: '20',
    label: 'رتبه 20'
  },
  {
    id: '18',
    label: 'رتبه 18'
  }
];

const EducationalFieldMock: RichViewType[] = [
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
  },
  {
    id: '2',
    label: 'معدن'
  },
  {
    id: '3',
    label: 'پزشکی'
  }
];

const WorkLocationsMock: RichViewType[] = [
  {
    id: '1',
    label: 'سازمان',
    children: [
      {
        id: '11',
        label: 'مدیریت فناوری',
        children: [
          {
            id: '111',
            label: 'اداره شبکه'
          },
          {
            id: '112',
            label: 'اداره رایانه',
            children: [
              {
                id: '1121',
                label: 'دایره بانک اطلاعاتی'
              }
            ]
          }
        ]
      },
      {
        id: '12',
        label: 'مدیریت امور اداری و پشتیبانی'
      },
      {
        id: '13',
        label: 'حوزه ریاست'
      }
    ]
  }
];

const StaffInfoMock: StaffInfoResponseType[] = [
  {
    id: 1,
    name: 'محمد رحمانی',
    fatherName: 'سعید',
    nationalCode: '4433221100',
    idNumber: '12321',
    staffCode: '02312321',
    workLocation: 'مدیریت فناوری',
    hireDate: '1400/02/03',
    degree: Degree.BACHELOR,
    serviceStatus: ServiceStatus.RETRIED,
    address: 'آدرس جدید من',
    mobile: '09111234567',
    birthLocation: '12',
    gender: Gender.MALE,
    religion: Religion.SHIA,
    maritalStatus: MaritalStatus.SINGLE,
    positionDegree: '20',
    supervisorNationalCode: '4400231132',
    familyRelation: FamilyRelation.FATHER
  },
  {
    id: 2,
    name: 'علی اصغری',
    fatherName: 'جعفر',
    hireDate: '1400/02/03',
    nationalCode: '992023100',
    idNumber: '543',
    staffCode: '546773',
    workLocation: 'مدیریت اسناد',
    degree: 'کارشناسی ارشد'
  }
];

export {
  PositionDegreeMock,
  EducationalFieldMock,
  WorkLocationsMock,
  StaffInfoMock
};
