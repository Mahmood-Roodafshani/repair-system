import { timeout } from 'src/utils/helper';
import { TrackingListMock } from 'src/mock/trackingPanel/trackingMock';
import { ROUTES } from 'src/constants/routes';
import axiosInstance from '../baseService';

const fetchMainSystems = async () => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200,
      content: TrackingListMock
    };
  }
  const response = await axiosInstance.get(ROUTES.TRACKING.MAIN_SYSTEMS.LIST);
  return response.data;
};

const fetchTrackingList = async () => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200,
      content: TrackingListMock
    };
  }
  const response = await axiosInstance.get(ROUTES.TRACKING.TRACKING_LIST.LIST);
  return response.data;
};

export { fetchMainSystems, fetchTrackingList };
