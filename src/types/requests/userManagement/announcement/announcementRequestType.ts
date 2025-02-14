import { DateObject } from 'react-multi-date-picker';

export type AnnouncementRequestType = {
  from?: Date | string | DateObject;
  to?: Date | string | DateObject;
  title?: string;
  message?: string;
};
