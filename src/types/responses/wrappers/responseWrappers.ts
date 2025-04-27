import { PermissionDto } from '../userManagement/roleManagement/permissionDto';

export interface JSonResponseEntityPermissionDto {
  responseCode: string;
  data: PermissionDto;
}

export interface JSonResponseEntityListPermissionDto {
  responseCode: string;
  data: PermissionDto[];
} 