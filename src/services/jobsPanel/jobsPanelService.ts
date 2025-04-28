import { timeout } from 'src/utils/helper';
import axiosInstance from '../baseService';
import { ROUTES } from 'src/constants/routes';
import { JobsFullInfoMock, JobsTreeMock } from 'src/mock/jobsPanel/jobsPanelMock';

interface FetchJobsListParams {
  organizationUnit?: string | number;
}

export const fetchJobsList = async ({ organizationUnit }: { organizationUnit?: string } = {}) => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    return {
      statusCode: 200,
      content: JobsFullInfoMock
    };
  }
  const response = await axiosInstance.get(ROUTES.JOBS.FETCH_LIST, {
    params: { organizationUnit }
  });
  return response.data;
};

export const fetchJobsTree = async () => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    return {
      statusCode: 200,
      content: JobsTreeMock
    };
  }
  const response = await axiosInstance.get(ROUTES.JOBS.FETCH_TREE);
  return response.data;
};

export const createJob = async ({ data }: { data: { name: string } }) => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    return {
      statusCode: 200
    };
  }
  const response = await axiosInstance.post(ROUTES.JOBS.CREATE, data);
  return response.data;
};

export const updateJob = async ({ id, data }: { id: string | number; data: { name: string } }) => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    return {
      statusCode: 200
    };
  }
  const response = await axiosInstance.put(ROUTES.JOBS.UPDATE, data, {
    params: { id }
  });
  return response.data;
};

export const removeJob = async ({ id }: { id: string | number }) => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    return {
      statusCode: 200
    };
  }
  const response = await axiosInstance.delete(ROUTES.JOBS.REMOVE, {
    params: { id }
  });
  return response.data;
}; 