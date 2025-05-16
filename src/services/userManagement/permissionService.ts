import { ROUTES } from '@/constants/routes';
import { apiDelete, apiGet, apiPost, apiPut } from '../baseService';
import {
  CreatePermissionDto,
  PermissionDto,
  UpdatePermissionDto
} from '@/types';
import { Pageable } from '@/types/requests/pageableType';
import { Pageable as PageableResponse } from '@/types/responses/pageableType';

export const permissionService = {
  async getAllWithPage(
    paginationArgs: Pageable<PermissionDto>
  ): Promise<PageableResponse<PermissionDto>> {
    const params = new URLSearchParams();
    params.append('page', paginationArgs.pageIndex.toString());
    params.append('size', paginationArgs.pageSize.toString());
    const response = await apiGet<PageableResponse<PermissionDto>>(
      ROUTES.USER.PERMISSION.FETCH_ALL + params.toString()
    );
    return response.content;
  },
  async getAll(): Promise<PermissionDto[]> {
    const response = await apiGet<PermissionDto[]>(
      ROUTES.USER.PERMISSION.FETCH_ALL
    );
    return response.content;
  },

  async create(data: CreatePermissionDto): Promise<PermissionDto> {
    const response = await apiPost<PermissionDto>(
      ROUTES.USER.PERMISSION.CREATE,
      data
    );
    return response.content;
  },

  async update({
    code,
    data
  }: {
    code: number;
    data: UpdatePermissionDto;
  }): Promise<PermissionDto> {
    const response = await apiPut<PermissionDto>(
      `${ROUTES.USER.PERMISSION.UPDATE(code)}`,
      data
    );
    return response.content;
  },

  async delete(code: number): Promise<void> {
    await apiDelete<void>(`${ROUTES.USER.PERMISSION.DELETE(code)}`);
  }
};
