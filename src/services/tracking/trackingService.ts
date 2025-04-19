import { timeout } from 'src/utils/helper';
import { TrackingListMock } from 'src/mock/trackingPanel/trackingMock';

const fetchMainSystems = async () => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200,
      content: TrackingListMock
    };
  }
  // TODO: Implement actual API call
  return {
    statusCode: 200,
    content: []
  };
};

const fetchTrackingList = async () => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200,
      content: TrackingListMock
    };
  }
  // TODO: Implement actual API call
  return {
    statusCode: 200,
    content: []
  };
};

export { fetchMainSystems, fetchTrackingList };
