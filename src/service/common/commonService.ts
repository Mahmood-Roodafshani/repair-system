import {
  CitiesMock,
  CoursesMock,
  EducationalFieldMock,
  FieldsMock,
  OrganizationUnitsMock,
  PositionDegreeMock,
  RolesMock,
  WorkLocationsMock
} from 'src/mock';
import { timeout } from 'src/utils/helper';
import { get } from '../service';
import ROUTES from '../routes';

const fetchRoles = async () => {
  if (process.env.REACT_APP_WORK_WITH_MOCK) {
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
  if (process.env.REACT_APP_WORK_WITH_MOCK) {
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
  if (process.env.REACT_APP_WORK_WITH_MOCK) {
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
  if (process.env.REACT_APP_WORK_WITH_MOCK) {
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
  if (process.env.REACT_APP_WORK_WITH_MOCK) {
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
  if (process.env.REACT_APP_WORK_WITH_MOCK) {
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
  if (process.env.REACT_APP_WORK_WITH_MOCK) {
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
  if (process.env.REACT_APP_WORK_WITH_MOCK) {
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

export {
  fetchRoles,
  fetchOrganizationUnits,
  fetchCities,
  fetchFields,
  fetchCourses,
  fetchPositionDegree,
  fetchEducationalFields,
  fetchWorkLocations
};
