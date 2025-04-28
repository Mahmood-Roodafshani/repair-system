import axiosInstance from './baseService';
import { ROUTES } from 'src/constants/routes';
import {
  RolesMock,
  OrganizationUnitsMock,
  FieldsMock,
  CoursesMock,
  ActivityMock,
  ActivityFieldsMock,
  ItemCategoryFieldsMock,
  CitiesMock
} from '../mock/common/commonMock';
import { timeout } from '../utils/helper';

class CommonService {
  private static async fetchWithMock<T>(mockData: T[], apiCall: () => Promise<any>): Promise<T[]> {
    if (import.meta.env.VITE_APP_WORK_WITH_MOCK === 'true') {
      await timeout(1000);
      return mockData;
    }
    try {
      const response = await apiCall();
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  static async getCities() {
    return this.fetchWithMock(
      CitiesMock,
      () => axiosInstance.get(ROUTES.COMMON.CITIES)
    );
  }

  static async getEducationalFields() {
    return this.fetchWithMock(
      [], // No mock data available
      () => axiosInstance.get(ROUTES.COMMON.EDUCATIONAL_FIELDS)
    );
  }

  static async getOrganizationUnits() {
    return this.fetchWithMock(
      OrganizationUnitsMock,
      () => axiosInstance.get(ROUTES.JOBS.ORGANIZATION_UNITS.FETCH_ALL)
    );
  }

  static async getRoles() {
    return this.fetchWithMock(
      RolesMock,
      () => axiosInstance.get(ROUTES.ROLE.FETCH_ALL)
    );
  }

  static async getFields() {
    return this.fetchWithMock(
      FieldsMock,
      () => axiosInstance.get(ROUTES.COMMON.FIELDS)
    );
  }

  static async getCourses() {
    return this.fetchWithMock(
      CoursesMock,
      () => axiosInstance.get(ROUTES.COMMON.COURSES)
    );
  }

  static async getPositionDegrees() {
    return this.fetchWithMock(
      [], // No mock data available
      () => axiosInstance.get(ROUTES.COMMON.POSITION_DEGREES)
    );
  }

  static async getWorkLocations() {
    return this.fetchWithMock(
      [], // No mock data available
      () => axiosInstance.get(ROUTES.COMMON.WORK_LOCATIONS)
    );
  }

  static async getActivities() {
    return this.fetchWithMock(
      ActivityMock,
      () => axiosInstance.get(ROUTES.COMMON.ACTIVITIES)
    );
  }

  static async getActivityFields() {
    return this.fetchWithMock(
      ActivityFieldsMock,
      () => axiosInstance.get(ROUTES.COMMON.ACTIVITY_FIELDS)
    );
  }

  static async getItemCategoryFields() {
    return this.fetchWithMock(
      ItemCategoryFieldsMock,
      () => axiosInstance.get(ROUTES.COMMON.ITEM_CATEGORY_FIELDS)
    );
  }
}

export default CommonService; 