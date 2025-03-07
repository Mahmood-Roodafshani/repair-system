import { AccessControlFilterType } from 'src/types';
import { timeout } from 'src/utils/helper';
import { get, post } from '../service';
import ROUTES from '../routes';
import { AccessControlListMock } from 'src/mock';

const accessControlFetchList = async ({
  filter
}: {
  filter: AccessControlFilterType;
}) => {
  if (process.env.REACT_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200,
      content: AccessControlListMock
    };
  }
  //todo: build query params from filter
  const response = await get({
    url: ROUTES.ACCESS_CONTROL_FETCH_LIST
  });
  return response;
};

const findStaffByCode = async ({ staffCode }: { staffCode: string }) => {
  if (process.env.REACT_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200,
      content: {
        id: '1',
        name: 'سرگرد محمد فکری',
        granted_jobs: ['11313']
      }
    };
  }
  //todo: build query params from filter
  const response = await get({
    url: ROUTES.ACCESS_CONTROL_FETCH_LIST
  });
  return response;
};

const createNewAccessControl = async ({
  staffCode,
  grants
}: {
  staffCode: string;
  grants: string[];
}) => {
  if (process.env.REACT_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200
    };
  }
  //todo: build query params from filter
  const response = await post({
    url: ROUTES.ACCESS_CONTROL_FETCH_LIST,
    data: {
      staffCode: staffCode,
      grants: grants
    }
  });
  return response;
};

export { accessControlFetchList, findStaffByCode, createNewAccessControl };
