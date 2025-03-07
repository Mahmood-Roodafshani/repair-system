import { JobLevel, JobStatus } from 'src/constants';
import { JobResponseType, RichViewType } from 'src/types';

const JobsFullInfoMock: JobResponseType[] = [
  {
    id: '1',
    title: 'مدیر بانک اطلاعاتی',
    organizationUnit: '2',
    jobLevel: JobLevel.BOSS,
    jobStatus: JobStatus.ACTIVE,
    neededCourses: ['1112', '1121'],
    neededFields: ['111'],
    jobDescription: 'تست',
    code: '31312',
    positionDegree: '20',
    responsibilityDescription: 'تست جدید من'
  }
];

const JobsTreeMock: RichViewType[] = [
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
            label: 'مدیر فناوری - دکتر جهانی'
          },
          {
            id: '112',
            label: 'اداره شبکه',
            children: [
              {
                id: '1121',
                label: 'رئیس اداره شبکه - مهدی دانشخواه'
              },
              {
                id: '1122',
                label: 'کارشناس ارشد اداره شبکه - محسن شبستری'
              }
            ]
          },
          {
            id: '113',
            label: 'اداره رایانه',
            children: [
              {
                id: '1131',
                label: 'دایره بانک اطلاعاتی',
                children: [
                  {
                    id: '11311',
                    label: 'مدیر بانک اطلاعاتی - میلاد حیدری'
                  },
                  {
                    id: '11312',
                    label: 'کارشناس ارشد بانک اطلاعاتی - محمد نظری'
                  },
                  {
                    id: '11313',
                    label: 'کارشناس بانک اطلاعاتی'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: '2',
    label: 'مدیریت امور اداری و پشتیبانی'
  },
  {
    id: '3',
    label: 'حوزه ریاست'
  }
];

export { JobsFullInfoMock, JobsTreeMock };
