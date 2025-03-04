import { DateObject } from 'react-multi-date-picker';
import {
  Degree,
  FamilyRelation,
  Gender,
  MaritalStatus,
  Religion,
  ServiceStatus
} from 'src/constants';

export type StaffInfoRequestType = {
  id?: string | number;
  firstname?: string;
  lastname?: string;
  fatherName?: string;
  idNumber?: string;
  nationalCode?: string;
  staffCode?: string;
  hireDate?: string | DateObject | Date;
  degree?: Degree;
  serviceStatus?: ServiceStatus;
  martialStatus?: MaritalStatus;
  educationalField?: string | number;
  workLocation?: string | number;
  positionDegree?: string | number;
  address?: string;
  mobile?: string;
  religion?: Religion;
  birthLocation?: string | number;
  gender?: Gender;
  supervisorNationalCode?: string;
  familyRelation?: FamilyRelation;
};
