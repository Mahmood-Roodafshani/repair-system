import { PermissionDto } from '../userManagement/roleManagement/permissionManagementDto';

export interface JSonResponseEntityPermissionDto {
  responseCode: string;
  data: PermissionDto;
}

export interface JSonResponseEntityListPermissionDto {
  responseCode: string;
  data: PermissionDto[];
}
