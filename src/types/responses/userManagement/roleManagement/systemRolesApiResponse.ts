import { PermissionDto } from './permissionDto';
import { ApiResponse } from '../../index';

export interface SystemRolesApiResponse extends ApiResponse<{
  id: number;
  name: string;
  description?: string;
  permissions?: PermissionDto[];
}[]> {} 