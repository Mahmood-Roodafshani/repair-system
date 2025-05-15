export type PermissionDto = {
  identifier: string;
  name: string;
  description?: string;
  url?: string;
  operationType: string;
  code?: number;
  state: 'ACTIVE' | 'INACTIVE' | '';
};

export const permissionInitialValues: PermissionDto = {
  name: '',
  identifier: '',
  operationType: '',
  url: '',
  state: ''
};
