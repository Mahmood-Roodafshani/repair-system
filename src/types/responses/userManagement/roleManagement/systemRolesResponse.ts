import { PermissionDto } from './permissionManagementDto';

export type SystemRolesResponse = {
  id: number;
  name: string;
  description?: string;
  permissions?: PermissionDto[];
  status?: boolean;
  children?: SystemRolesResponse[];
};
