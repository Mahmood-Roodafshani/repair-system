import {
  ActivityFieldsMock,
  ActivityMock,
  CitiesMock,
  CoursesMock,
  EducationalFieldMock,
  FieldsMock,
  ItemCategoryFieldsMock,
  OrganizationUnitsMock,
  PositionDegreeMock,
  RolesMock,
  WorkLocationsMock
} from 'src/mock';
import { timeout } from 'src/utils/helper';
import { get } from '../service';
import ROUTES from '../routes';

const fetchRoles = async () => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200,
      content: RolesMock
    };
  }
  const response = await get({
    url: ROUTES.FETCH_ROLES
  });
  return response;
};

const fetchCities = async () => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200,
      content: CitiesMock
    };
  }
  const response = await get({
    url: ROUTES.FETCH_ROLES
  });
  return response;
};

const fetchOrganizationUnits = async () => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200,
      content: OrganizationUnitsMock
    };
  }
  const response = await get({
    url: ROUTES.FETCH_ORGANIZATION_UNITS
  });
  return response;
};

const fetchFields = async () => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200,
      content: FieldsMock
    };
  }
  const response = await get({
    url: ROUTES.FETCH_ORGANIZATION_UNITS
  });
  return response;
};

const fetchCourses = async () => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200,
      content: CoursesMock
    };
  }
  const response = await get({
    url: ROUTES.FETCH_ORGANIZATION_UNITS
  });
  return response;
};

const fetchPositionDegree = async () => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200,
      content: PositionDegreeMock
    };
  }
  const response = await get({
    url: ROUTES.FETCH_ORGANIZATION_UNITS
  });
  return response;
};

const fetchEducationalFields = async () => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200,
      content: EducationalFieldMock
    };
  }
  const response = await get({
    url: ROUTES.FETCH_ORGANIZATION_UNITS
  });
  return response;
};

const fetchWorkLocations = async () => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200,
      content: WorkLocationsMock
    };
  }
  const response = await get({
    url: ROUTES.FETCH_ORGANIZATION_UNITS
  });
  return response;
};

const fetchActivities = async () => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200,
      content: ActivityMock
    };
  }
  const response = await get({
    url: ROUTES.FETCH_ORGANIZATION_UNITS
  });
  return response;
};

const fetchActivityFields = async () => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200,
      content: ActivityFieldsMock
    };
  }
  const response = await get({
    url: ROUTES.FETCH_ORGANIZATION_UNITS
  });
  return response;
};

const fetchItemCategoryFields = async () => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200,
      content: ItemCategoryFieldsMock
    };
  }
  const response = await get({
    url: ROUTES.FETCH_ORGANIZATION_UNITS
  });
  return response;
};

export {
  fetchRoles,
  fetchOrganizationUnits,
  fetchCities,
  fetchFields,
  fetchCourses,
  fetchPositionDegree,
  fetchEducationalFields,
  fetchWorkLocations,
  fetchActivities,
  fetchActivityFields,
  fetchItemCategoryFields
};
