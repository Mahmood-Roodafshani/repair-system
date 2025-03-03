import { DateObject } from 'react-multi-date-picker';

export type StaffInfoResponseType = {
  id: string | number;
  name: string;
  fatherName: string;
  nationalCode: string;
  idNumber: string;
  staffCode: string;
  workLocation: string;
  hireDate: string | Date | DateObject;
  degree: string;
  mobile?: string;
  address?: string;
  religion?: string;
  gender?: string | boolean;
  birthLocation?: string | number;
  serviceStatus?: string;
  militaryDegree?: string;
  maritalStatus?: string;
  supervisorNationalCode?: string;
  familyRelation?: string;
  educationalField?: string;
};
