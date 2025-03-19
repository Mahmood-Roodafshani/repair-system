import { DateObject } from 'react-multi-date-picker';

export type TrackingFilterRequestType = {
  forms?: string[];
  activity?: string;
  organizationUnits?: string[];
  from?: Date | string | DateObject;
  to?: Date | string | DateObject;
  nationalCode?: string;
};
