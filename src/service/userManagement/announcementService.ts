import { AnnouncementRequestType } from 'src/types/requests/userManagement/announcement/announcementRequestType';
import { timeout } from 'src/utils/helper';
import { post } from '../service';
import ROUTES from '../routes';

const sendPublicAnnouncement = async ({
  request
}: {
  request: AnnouncementRequestType;
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
    data: request
  });
  return response;
};

const sendSecurityAnnouncement = async ({
  request
}: {
  request: AnnouncementRequestType;
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
    data: request
  });
  return response;
};

export { sendPublicAnnouncement, sendSecurityAnnouncement };
