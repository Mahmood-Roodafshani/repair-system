import { DateObject } from 'react-multi-date-picker';
import {
  Degree,
  Gender,
  MaritalStatus,
  Religion,
  ServiceStatus
} from 'src/models';

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
  militaryDegree?: string | number;
  address?: string;
  mobile?: string;
  religion?: Religion;
  birthLocation?: string | number;
  gender?: Gender;
};
