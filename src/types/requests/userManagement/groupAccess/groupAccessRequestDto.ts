import { GroupAccessDto } from '@/types/responses';

export type CreateGroupAccessDto = Omit<GroupAccessDto, 'id'>;
export type UpdateGroupAccessDto = Omit<GroupAccessDto, 'identifier'>;
