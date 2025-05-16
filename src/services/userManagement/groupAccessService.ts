import {
  CreateGroupAccessDto,
  GroupAccessDto,
  UpdateGroupAccessDto
} from '@/types';
import { Pageable } from '@/types/requests/pageableType';
import { Pageable as PageableResponse } from '@/types/responses/pageableType';
import { ROUTES } from 'src/constants/routes';
import { ApiResponse } from 'src/types/responses/apiResponse';
import axiosInstance, {
  apiDelete,
  apiGet,
  apiPost,
  apiPut
} from '../baseService';

interface GroupAccess {
  id: string | number;
  name: string;
}

export const groupAccessService = {
  async getAllWithPage(
    paginationArgs: Pageable<GroupAccessDto>
  ): Promise<PageableResponse<GroupAccessDto>> {
    const params = new URLSearchParams();
    params.append('page', paginationArgs.pageIndex.toString());
    params.append('size', paginationArgs.pageSize.toString());

    const response = await apiGet<PageableResponse<GroupAccessDto>>(
      ROUTES.USER.GROUP_ACCESS.FETCH_LIST_WITH_PAGE + params.toString()
    );
    return response.content;
  },

  async getAll(): Promise<GroupAccessDto[]> {
    const response = await apiGet<GroupAccessDto[]>(
      ROUTES.USER.GROUP_ACCESS.FETCH_LIST
    );
    return response.content;
  },

  async create(data: CreateGroupAccessDto): Promise<GroupAccessDto> {
    const response = await apiPost<GroupAccessDto>(
      ROUTES.USER.GROUP_ACCESS.CREATE,
      data
    );
    return response.content;
  },

  async update({
    id,
    data
  }: {
    id: number;
    data: UpdateGroupAccessDto;
  }): Promise<GroupAccessDto> {
    const response = await apiPut<GroupAccessDto>(
      `${ROUTES.USER.GROUP_ACCESS.UPDATE(id)}`,
      data
    );
    return response.content;
  },

  async delete(id: number): Promise<void> {
    await apiDelete<void>(`${ROUTES.USER.GROUP_ACCESS.DELETE(id)}`);
  }
};

export const getGroupAccessList = async ({
  name
}: {
  name?: string;
}): Promise<ApiResponse<GroupAccess[]>> => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    return {
      statusCode: 200,
      content: []
    };
  }
  const response = await axiosInstance.get(
    ROUTES.USER.GROUP_ACCESS.FETCH_LIST,
    {
      params: { name }
    }
  );
  return response.data;
};

export const getGroupAccessRoles = async ({
  groupId
}: {
  groupId: string | number;
}): Promise<ApiResponse<{ id: string; name: string }[]>> => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    return {
      statusCode: 200,
      content: []
    };
  }
  const response = await axiosInstance.get(
    ROUTES.USER.GROUP_ACCESS.FETCH_ROLES,
    {
      params: { groupId }
    }
  );
  return response.data;
};
