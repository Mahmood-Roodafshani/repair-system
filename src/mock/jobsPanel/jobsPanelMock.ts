import { JobLevel, JobStatus } from 'src/constants';
import { JobResponseType } from 'src/types';

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

export { JobsFullInfoMock };
