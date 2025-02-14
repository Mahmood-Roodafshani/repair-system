export type RoleResponseType = {
  id: string | number;
  name: string;
  childs?: RoleResponseType[];
};
