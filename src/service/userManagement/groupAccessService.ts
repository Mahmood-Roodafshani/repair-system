import { timeout } from 'src/utils/helper';
import ROUTES from '../routes';
import { get, post, remove } from '../service';

const getGroupAccesses = async ({ name }: { name: string }) => {
  if (process.env.REACT_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200
    };
  }
  //todo: build query params from filter
  const response = await get({
    url: ROUTES.ACCESS_CONTROL_FETCH_LIST
  });
  return response;
};

const removeGroupAccess = async ({ groupId }: { groupId: string | number }) => {
  if (process.env.REACT_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200
    };
  }
  //todo: build query params from filter
  const response = await remove({
    url: ROUTES.ACCESS_CONTROL_FETCH_LIST
  });
  return response;
};

const addGroupAccess = async ({ data }: { data: any }) => {
  if (process.env.REACT_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200
    };
  }
  //todo: build query params from filter
  const response = await post({
    url: ROUTES.ACCESS_CONTROL_FETCH_LIST,
    data: data
  });
  return response;
};

export { getGroupAccesses, removeGroupAccess, addGroupAccess };
