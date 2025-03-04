import { StaffInfoMock } from 'src/mock';
import { StaffInfoRequestType } from 'src/types';
import { timeout } from 'src/utils/helper';
import ROUTES from '../routes';
import { get, post, put, remove } from '../service';

const fetchFamilyInfoList = async ({
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

const removeFamilyInfo = async ({
  memberId
}: {
  memberId: string | number;
}) => {
  if (process.env.REACT_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200
    };
  }
  const response = await remove({
    url: ROUTES.ACCESS_CONTROL_FETCH_LIST + memberId
  });
  return response;
};

const updateFamilyInfo = async ({
  memberId,
  memberInfo
}: {
  memberId: string | number;
  memberInfo: StaffInfoRequestType;
}) => {
  if (process.env.REACT_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200
    };
  }
  const response = await put({
    url: ROUTES.ACCESS_CONTROL_FETCH_LIST + memberId,
    data: memberInfo
  });
  return response;
};

const createFamilyInfo = async ({
  memberInfo
}: {
  memberInfo: StaffInfoRequestType;
}) => {
  if (process.env.REACT_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200
    };
  }
  const response = await post({
    url: ROUTES.ACCESS_CONTROL_FETCH_LIST,
    data: memberInfo
  });
  return response;
};

export {
  createFamilyInfo,
  fetchFamilyInfoList,
  removeFamilyInfo,
  updateFamilyInfo
};
