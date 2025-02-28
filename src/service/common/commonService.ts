import { CitiesMock, OrganizationUnitsMock, RolesMock } from 'src/mock';
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

export { fetchRoles, fetchOrganizationUnits, fetchCities };
