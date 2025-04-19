import { PermissionDto } from './permissionDto';

export type SystemRolesResponse = {
  id: number;
  name: string;
  description?: string;
  permissions?: PermissionDto[];
  status?: boolean;
  children?: SystemRolesResponse[];
};
