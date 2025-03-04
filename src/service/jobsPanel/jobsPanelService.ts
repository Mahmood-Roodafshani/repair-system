import { JobsFullInfoMock } from 'src/mock/jobsPanel';
import { JobRequestType } from 'src/types';
import { timeout } from 'src/utils/helper';
import ROUTES from '../routes';
import { get, post, put, remove } from '../service';

const fetchJobsList = async ({
  organizationUnit
}: {
  organizationUnit?: string | number;
}) => {
  if (process.env.REACT_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200,
      content: JobsFullInfoMock
    };
  }
  //todo: build query params from filter
  const response = await get({
    url: ROUTES.ACCESS_CONTROL_FETCH_LIST
  });
  return response;
};

const removeJob = async ({ jobId }: { jobId: string | number }) => {
  if (process.env.REACT_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200
    };
  }
  const response = await remove({
    url: ROUTES.ACCESS_CONTROL_FETCH_LIST + jobId
  });
  return response;
};

const updateJob = async ({
  jobId,
  jobInfo
}: {
  jobId: string | number;
  jobInfo: JobRequestType;
}) => {
  if (process.env.REACT_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200
    };
  }
  const response = await put({
    url: ROUTES.ACCESS_CONTROL_FETCH_LIST + jobId,
    data: jobInfo
  });
  return response;
};

const createJob = async ({ jobInfo }: { jobInfo: JobRequestType }) => {
  if (process.env.REACT_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200
    };
  }
  const response = await post({
    url: ROUTES.ACCESS_CONTROL_FETCH_LIST,
    data: jobInfo
  });
  return response;
};

export { createJob, fetchJobsList, removeJob, updateJob };
