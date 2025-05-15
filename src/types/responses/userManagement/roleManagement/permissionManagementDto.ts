export type PermissionManagementDto = {
  id: number;
  name: string;
  description?: string;
};

export type CreatePermissionManagementDto = Omit<PermissionManagementDto, 'id'>;
