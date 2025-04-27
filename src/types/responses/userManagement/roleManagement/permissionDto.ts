export type PermissionDto = {
  id: number;
  name: string;
  description?: string;
};

export type CreatePermissionDto = Omit<PermissionDto, 'id'>; 