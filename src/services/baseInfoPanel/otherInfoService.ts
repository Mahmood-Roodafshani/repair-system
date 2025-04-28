import axiosInstance from '../baseService';
import { ROUTES } from 'src/constants/routes';
import { timeout } from 'src/utils/helper';
import { ApiResponse } from 'src/types/responses/apiResponse';

export interface OtherInfoItem {
  id: string | number;
  name: string;
  code: string;
  status: boolean;
}

export const fetchOtherInfoList = async (): Promise<ApiResponse<OtherInfoItem[]>> => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    return {
      statusCode: 200,
      content: [
        {
          id: 1,
          name: 'Sample Info 1',
          code: 'SI1',
          status: true
        },
        {
          id: 2,
          name: 'Sample Info 2',
          code: 'SI2',
          status: false
        }
      ]
    };
  }
  const response = await axiosInstance.get(ROUTES.BASE_INFO.OTHER_INFO.FETCH_LIST);
  return {
    statusCode: response.status,
    content: response.data
  };
}; 