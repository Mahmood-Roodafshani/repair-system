const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
const ROUTES = {
  // SIGN IN / SIGN UP SERVICES
  USER_LOGIN: `${BASE_URL}test`,
  // ROLE MANAGEMENT SERVICES
  FETCH_ROLES: `${BASE_URL}fetchRoles`,
  STORE_NEW_SYSTEM: `${BASE_URL}system`,
  STORE_NEW_ROLE: `${BASE_URL}system/`,
  REMOVE_ROLE: `${BASE_URL}role/`,
  REMOVE_SYSTEM: `${BASE_URL}system/`,
  GET_SYSTEM_ROLES: `${BASE_URL}um/roles/`,
  // ########## USER MANAGEMENT ##########
  // ACCESS CONTROL
  ACCESS_CONTROL_FETCH_LIST: `${BASE_URL}fetchList/`,
  // ########## JOBS MANAGEMENT ##########
  FETCH_ORGANIZATION_UNITS: `${BASE_URL}organizationUnits/`,
  // ########## REPAIR MANAGEMENT ##########
  COMMISSION_LIST: `${BASE_URL}commission/list`,
  ITEMS_IN_COMMISSION_QUEUE_LIST: `${BASE_URL}commission/items`
};

export default ROUTES;
