export type CreateCompanyRequest = {
  name: string;
  activityField?: string | number;
  tel: string;
  address: string;
  canBePartner: 'true' | 'false' | '';
  ceo: string;
  email: string;
};
