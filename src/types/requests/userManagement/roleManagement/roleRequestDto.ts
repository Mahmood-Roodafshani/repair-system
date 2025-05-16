import { RoleDto } from '@/types/responses';

export type CreateRoleDto = Omit<Omit<RoleDto, 'id'>, 'permissions'>;
export type UpdateRoleDto = Omit<CreateRoleDto, 'identifier'>;
