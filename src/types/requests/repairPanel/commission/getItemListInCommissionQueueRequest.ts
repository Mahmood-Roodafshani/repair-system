import { DateObject } from 'react-multi-date-picker';

export interface GetItemListInCommissionQueueRequest {
  assetNumber?: string;
  submitNumber?: string;
  submitAt?: string;
  date?: string;
  submitter?: string;
  submitterUnit?: string;
  description?: string;
  category?: string;
  status?: string;
  page?: number;
  size?: number;
  sort?: string;
}
