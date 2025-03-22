import { CodingAccessMock, CodingMock } from 'src/mock';
import { CodingAccessRequest, CodingRequest } from 'src/types';
import { timeout } from 'src/utils/helper';
import ROUTES from '../routes';
import { get, post, put, remove } from '../service';

const fetchCodingList = async () => {
  if (process.env.REACT_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200,
      content: CodingMock
    };
  }
  const response = await get({
    url: ROUTES.ACCESS_CONTROL_FETCH_LIST
  });
  return response;
};

const fetchCodingAccessList = async () => {
  if (process.env.REACT_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200,
      content: CodingAccessMock
    };
  }
  const response = await get({
    url: ROUTES.ACCESS_CONTROL_FETCH_LIST
  });
  return response;
};

const removeCoding = async ({ codingId }: { codingId: string | number }) => {
  if (process.env.REACT_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200
    };
  }

  const response = await remove({
    url: ROUTES.ACCESS_CONTROL_FETCH_LIST + codingId
  });
  return response;
};

const createCoding = async (data: CodingRequest) => {
  if (process.env.REACT_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200
    };
  }

  const response = await post({
    url: ROUTES.ACCESS_CONTROL_FETCH_LIST,
    data: data
  });
  return response;
};

const createCodingAccess = async (data: CodingAccessRequest) => {
  if (process.env.REACT_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200
    };
  }

  const response = await post({
    url: ROUTES.ACCESS_CONTROL_FETCH_LIST,
    data: data
  });
  return response;
};

const updateCoding = async ({
  id,
  data
}: {
  id: string | number;
  data: CodingRequest;
}) => {
  if (process.env.REACT_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200
    };
  }

  const response = await put({
    url: ROUTES.ACCESS_CONTROL_FETCH_LIST + id,
    data: data
  });
  return response;
};

const removeCodingAccess = async ({
  accessId
}: {
  accessId: string | number;
}) => {
  if (process.env.REACT_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200
    };
  }

  const response = await remove({
    url: ROUTES.ACCESS_CONTROL_FETCH_LIST + accessId
  });
  return response;
};

export {
  createCoding,
  fetchCodingList,
  removeCoding,
  removeCodingAccess,
  updateCoding,
  fetchCodingAccessList,
  createCodingAccess
};
