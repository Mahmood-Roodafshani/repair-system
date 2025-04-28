import { CommisionListResponse, CompaniesResponse } from 'src/types';
import { GetItemListInCommissionQueueResponse } from 'src/types/responses/repairPanel/commission/getItemListInCommissionQueueResponse';

const CompaniesMock: CompaniesResponse[] = [
  {
    id: '1',
    name: 'فناوران شریف',
    activityField: 'هوش مصنوعی',
    tel: '021-66088252',
    address: 'تهران - خ آزادی - نبش دانشگاه شریف'
  },
  {
    id: '2',
    name: 'فراسنج شریف',
    activityField: 'آلتراسونیک',
    tel: '021-66088252',
    address: 'تهران - م تیموری - نبش دانشگاه شریف'
  }
];

const CompanyMock: CompaniesResponse = {
  id: '1',
  name: 'فناوران شریف',
  activityFieldId: '13',
  activityField: 'هوش مصنوعی',
  tel: '021-66088252',
  address: 'تهران - خ آزادی - نبش دانشگاه شریف',
  canBePartner: true,
  ceo: 'بابک محمدی',
  email: '@test_test'
};

const CommissionListMock: CommisionListResponse[] = [
  {
    id: '1',
    date: '1401/12/15',
    decision: 'با پرداخت هزینه اداری تعمیر شود',
    description: 'آسیب به علت نوسان برق',
    assetNumber: '14786592',
    category: 'فناوری/رایانه/کیس',
    submitAt: '1401/12/18',
    submitter: 'حسین مهدوی فر'
  }
];

const ItemsInCommissionQueueListMock: GetItemListInCommissionQueueResponse[] = [
  {
    id: '1',
    description: 'آسیب به علت نوسان برق',
    assetNumber: '14786592',
    category: 'فناوری/رایانه/کیس',
    submitAt: '1401/12/18',
    submitter: 'حسین مهدوی فر',
    submitNumber: '12345',
    referAt: '1401/12/19',
    organizationUnit: 'واحد فناوری اطلاعات'
  }
];

export {
  CompaniesMock,
  CompanyMock,
  CommissionListMock,
  ItemsInCommissionQueueListMock
};
