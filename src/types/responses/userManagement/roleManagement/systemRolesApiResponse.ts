import { PermissionDto } from './permissionManagementDto';
import { ApiResponse } from '../../index';

export interface SystemRolesApiResponse
  extends ApiResponse<
    {
      id: number;
      name: string;
      description?: string;
      permissions?: PermissionDto[];
    }[]
  > {}
