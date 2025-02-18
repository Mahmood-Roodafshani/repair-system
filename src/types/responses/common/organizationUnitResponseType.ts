export type OrganizationUnitResponseType = {
  id: string | number;
  label: string;
  children?: OrganizationUnitResponseType[];
};
