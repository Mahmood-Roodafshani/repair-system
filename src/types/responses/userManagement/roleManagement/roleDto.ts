import { PermissionDto } from '../permission';

export type RoleDto = {
  id?: number;
  identifier: string;
  name: string;
  description?: string;
  status: 'ACTIVE' | 'INACTIVE' | '';
  permissions?: PermissionDto[];
  permissionCodes?: number[];
};

export const roleInitialValues: RoleDto = {
  name: '',
  identifier: '',
  status: ''
};
