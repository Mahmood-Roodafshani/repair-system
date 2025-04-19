import { timeout } from 'src/utils/helper';
import { JobsFullInfoMock, JobsTreeMock } from 'src/mock/jobsPanel/jobsPanelMock';
import axiosInstance from '../baseService';
import ROUTES from '../routes';

const fetchJobsList = async () => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200,
      content: JobsFullInfoMock
    };
  }
  // TODO: Implement actual API call
  return {
    statusCode: 200,
    content: []
  };
};

const fetchJobsTree = async () => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200,
      content: JobsTreeMock
    };
  }
  // TODO: Implement actual API call
  return {
    statusCode: 200,
    content: []
  };
};

const createJob = async (data: any) => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200
    };
  }
  const response = await axiosInstance.post(ROUTES.ACCESS_CONTROL_FETCH_LIST, data);
  return response;
};

const updateJob = async (id: string | number, data: any) => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200
    };
  }
  const response = await axiosInstance.put(ROUTES.ACCESS_CONTROL_FETCH_LIST + id, data);
  return response;
};

const removeJob = async (id: string | number) => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200
    };
  }
  const response = await axiosInstance.delete(ROUTES.ACCESS_CONTROL_FETCH_LIST + id);
  return response;
};

export { fetchJobsList, fetchJobsTree, createJob, updateJob, removeJob }; 