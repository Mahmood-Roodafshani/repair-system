import { timeout } from 'src/utils/helper';
import ROUTES from '../routes';
import { StaffInfoRequestType } from 'src/types';
import { StaffInfoMock } from 'src/mock';
import { get, post, put, remove } from '../service';
import { number } from 'prop-types';

const fetchStaffInfoList = async ({
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

const removeStaff = async ({ staffId }: { staffId: string | number }) => {
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

const updateStaff = async ({
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

const createStaff = async ({
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

export { fetchStaffInfoList, removeStaff, updateStaff, createStaff };
