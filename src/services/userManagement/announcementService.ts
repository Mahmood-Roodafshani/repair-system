import axiosInstance from '../baseService';
import { ROUTES } from 'src/constants/routes';
import { AnnouncementRequestType } from 'src/types';

export const sendPublicAnnouncement = async ({
  announcement
}: {
  announcement: AnnouncementRequestType;
}) => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    return {
      statusCode: 200
    };
  }
  const response = await axiosInstance.post(ROUTES.USER.ANNOUNCEMENT.PUBLIC, announcement);
  return response.data;
};

export const sendSecurityAnnouncement = async ({
  announcement
}: {
  announcement: AnnouncementRequestType;
}) => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    return {
      statusCode: 200
    };
  }
  const response = await axiosInstance.post(ROUTES.USER.ANNOUNCEMENT.SECURITY, announcement);
  return response.data;
};
