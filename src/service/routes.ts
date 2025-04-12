const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
const ROUTES = {
  // SIGN IN / SIGN UP SERVICES
  USER_LOGIN: `${BASE_URL}test`,
  // ROLE MANAGEMENT SERVICES
  SEARCH_ROLE_BY_SYSTEM_TITLE: `${BASE_URL}test`,
  FETCH_ROLES: `${BASE_URL}fetchRoles`,
  STORE_NEW_SYSTEM: `${BASE_URL}system`,
  STORE_NEW_ROLE: `${BASE_URL}system/`,
  REMOVE_ROLE: `${BASE_URL}role/`,
  REMOVE_SYSTEM: `${BASE_URL}system/`,
  // ########## USER MANAGEMENT ##########
  // ACCESS CONTROL
  ACCESS_CONTROL_FETCH_LIST: `${BASE_URL}fetchList/`,
  // ########## JOBS MANAGEMENT ##########
  FETCH_ORGANIZATION_UNITS: `${BASE_URL}organizationUnits/`
};

export default ROUTES;
