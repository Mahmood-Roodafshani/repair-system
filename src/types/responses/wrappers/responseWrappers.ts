import { PermissionDto } from '../userManagement';

export interface JSonResponseEntityPermissionDto {
  responseCode: string;
  data: PermissionDto;
}

export interface JSonResponseEntityListPermissionDto {
  responseCode: string;
  data: PermissionDto[];
}
