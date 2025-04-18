import { DateObject } from 'react-multi-date-picker';

export type GetItemListInCommissionQueueRequest = {
  assetNumber?: string | number;
  submitNumber?: string | number;
  referFrom?: string | DateObject | Date;
  referTo?: string | DateObject | Date;
  submitFrom?: string | DateObject | Date;
  submitTo?: string | DateObject | Date;
  organizationUnits?: string[];
};
