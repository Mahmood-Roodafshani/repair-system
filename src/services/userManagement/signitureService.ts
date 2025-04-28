import { timeout } from 'src/utils/helper';
import axiosInstance from '../baseService';
import { ROUTES } from 'src/constants/routes';
import { SampleSignitureRequestType } from 'src/types';

export const addSampleSigniture = async ({
  sampleSigniture
}: {
  sampleSigniture: SampleSignitureRequestType;
}) => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 201
    };
  }

  const response = await axiosInstance.post(ROUTES.USER.SIGNITURE.ADD, sampleSigniture);
  return response.data;
};
