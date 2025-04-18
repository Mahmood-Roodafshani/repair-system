import { DateObject } from 'react-multi-date-picker';

export type GetCommissionListRequest = {
  assetNumber?: string | number;
  submitAt?: string | DateObject | Date;
  date?: string | DateObject | Date;
};
