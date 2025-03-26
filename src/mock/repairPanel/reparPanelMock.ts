import { CompaniesResponse } from 'src/types';

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

export { CompaniesMock, CompanyMock };
