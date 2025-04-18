import { CommissionFixDecision } from '@/constant';
import { DateObject } from 'react-multi-date-picker';

export type CreateNewCommissionRequest = {
  staffs?: string[] | number[];
  date?: string | Date | DateObject;
  decision?: CommissionFixDecision;
  personalPay?: number;
  description?: string;
  attachFile?: Blob;
};

const createNewCommissionRequestInitialValues: CreateNewCommissionRequest = {};

export default createNewCommissionRequestInitialValues;
