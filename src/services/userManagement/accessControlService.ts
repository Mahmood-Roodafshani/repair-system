import { AccessControlFilterType } from 'src/types';
import { timeout } from 'src/utils/helper';
import { get, post } from '../service';
import ROUTES from '../routes';
import {
  AccessControlListMock,
  FarajaGrantsMock,
  FarajaUserGrantsMock,
  GroupAccessUserGrantsMock,
  HefazatGrantsMock,
  HefazatUserGrantsMock,
  JobsGrantsMock,
  JobsUserGrantsMock,
  RolesWithGrantsMock
} from 'src/mock';

const accessControlFetchList = async ({
  filter
}: {
  filter: AccessControlFilterType;
}) => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
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
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
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
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
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

const fetchGrantsByAccess = async ({
  accessId
}: {
  accessId: string | number;
}) => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200,
      content:
        accessId === 'FARAJA'
          ? FarajaGrantsMock
          : accessId === 'HEFAZAT'
          ? HefazatGrantsMock
          : accessId === 'JOBS'
          ? JobsGrantsMock
          : JobsGrantsMock
    };
  }
  //todo: build query params from filter
  const response = await get({
    url: ROUTES.ACCESS_CONTROL_FETCH_LIST
  });
  return response;
};

const fetchUserGrantsByAccess = async ({
  userId,
  accessId
}: {
  userId: string | number;
  accessId: string | number;
}) => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200,
      content:
        accessId === 'FARAJA'
          ? FarajaUserGrantsMock
          : accessId === 'HEFAZAT'
          ? HefazatUserGrantsMock
          : accessId === 'JOBS'
          ? JobsUserGrantsMock
          : accessId === 'GROUP_ACCESS'
          ? GroupAccessUserGrantsMock
          : JobsUserGrantsMock
    };
  }
  //todo: build query params from filter
  const response = await get({
    url: ROUTES.ACCESS_CONTROL_FETCH_LIST
  });
  return response;
};

const getRolesWithGrants = async () => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200,
      content: RolesWithGrantsMock
    };
  }
  const response = await get({
    url: ROUTES.ACCESS_CONTROL_FETCH_LIST
  });
  return response;
};

export {
  accessControlFetchList,
  findStaffByCode,
  createNewAccessControl,
  fetchGrantsByAccess,
  fetchUserGrantsByAccess,
  getRolesWithGrants
};
