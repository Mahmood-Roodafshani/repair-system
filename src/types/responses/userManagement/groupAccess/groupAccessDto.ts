import { RoleDto } from '../roleManagement';

export type GroupAccessDto = {
  id?: number;
  identifier: string;
  name: string;
  description?: string;
  status: 'ACTIVE' | 'INACTIVE' | '';
  roles?: RoleDto[];
  roleIds?: number[];
};

export const groupAccessInitialValues: GroupAccessDto = {
  name: '',
  identifier: '',
  status: ''
};
