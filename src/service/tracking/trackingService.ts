import { MainSystemsMock, TrackingListMock } from 'src/mock';
import { timeout } from 'src/utils/helper';
import ROUTES from '../routes';
import { get } from '../service';
import { TrackingFilterRequestType } from 'src/types';

const fetchMainSystems = async () => {
  if (process.env.REACT_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200,
      content: MainSystemsMock
    };
  }
  //todo: build query params from filter
  const response = await get({
    url: ROUTES.ACCESS_CONTROL_FETCH_LIST
  });
  return response;
};

const fetchTrackingList = async ({
  filter
}: {
  filter: TrackingFilterRequestType;
}) => {
  if (process.env.REACT_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200,
      content: TrackingListMock
    };
  }
  //todo: build query params from filter
  const response = await get({
    url: ROUTES.ACCESS_CONTROL_FETCH_LIST
  });
  return response;
};

export { fetchMainSystems, fetchTrackingList };
