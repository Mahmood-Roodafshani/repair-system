import { TrackingResponseType } from 'src/types';

const TrackingListMock: TrackingResponseType[] = [
  {
    username: 'محمود فکری',
    formName: 'فرم کمیسیون',
    time: '11:30',
    date: '1403/01/08',
    ip: '172.16.11.21',
    action: 'ویرایش'
  },
  {
    username: 'سعید خجسته',
    formName: 'فرم کمیسیون',
    time: '15:30',
    date: '1403/01/09',
    ip: '172.16.11.25',
    action: 'ویرایش'
  },
  {
    username: 'نعیم خسروی',
    formName: 'فرم کمیسیون',
    time: '18:30',
    date: '1403/01/11',
    ip: '172.16.11.29',
    action: 'ویرایش'
  }
];

export { TrackingListMock };
