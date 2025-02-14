export type OrganizationUnitResponseType = {
  id: string | number;
  name: string;
  childs?: OrganizationUnitResponseType[];
};
