export type RoleResponseType = {
  id: string | number;
  label: string;
  children?: RoleResponseType[];
};
