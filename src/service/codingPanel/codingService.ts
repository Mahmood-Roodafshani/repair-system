import { CodingMock } from 'src/mock';
import { timeout } from 'src/utils/helper';
import { get, post, put, remove } from '../service';
import ROUTES from '../routes';
import { CodingRequest } from 'src/types';
import { number } from 'prop-types';

const fetchCodingList = async () => {
  if (process.env.REACT_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200,
      content: CodingMock
    };
  }
  //todo: build query params from filter
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

export { fetchCodingList, removeCoding, createCoding, updateCoding };
