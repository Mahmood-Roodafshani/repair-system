import { PermissionDto } from '@/types/responses';

export type CreatePermissionDto = Omit<PermissionDto, 'code'>;
export type UpdatePermissionDto = Omit<CreatePermissionDto, 'identifier'>;
