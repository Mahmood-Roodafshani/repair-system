import { StaffInfoMock } from 'src/mock';
import { StaffInfoRequestType } from 'src/types';
import { timeout } from 'src/utils/helper';
import ROUTES from '../routes';
import { get, post, put, remove } from '../service';

const fetchNonStaffInfoList = async ({
  filter
}: {
  filter: StaffInfoRequestType;
}) => {
  if (process.env.REACT_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200,
      content: StaffInfoMock
    };
  }
  //todo: build query params from filter
  const response = await get({
    url: ROUTES.ACCESS_CONTROL_FETCH_LIST
  });
  return response;
};

const removeNonStaff = async ({ staffId }: { staffId: string | number }) => {
  if (process.env.REACT_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200
    };
  }
  const response = await remove({
    url: ROUTES.ACCESS_CONTROL_FETCH_LIST + staffId
  });
  return response;
};

const updateNonStaff = async ({
  staffId,
  staffInfo
}: {
  staffId: string | number;
  staffInfo: StaffInfoRequestType;
}) => {
  if (process.env.REACT_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200
    };
  }
  const response = await put({
    url: ROUTES.ACCESS_CONTROL_FETCH_LIST + staffId,
    data: staffInfo
  });
  return response;
};

const createNonStaff = async ({
  staffInfo
}: {
  staffInfo: StaffInfoRequestType;
}) => {
  if (process.env.REACT_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200
    };
  }
  const response = await post({
    url: ROUTES.ACCESS_CONTROL_FETCH_LIST,
    data: staffInfo
  });
  return response;
};

export {
  createNonStaff,
  fetchNonStaffInfoList,
  removeNonStaff,
  updateNonStaff
};
