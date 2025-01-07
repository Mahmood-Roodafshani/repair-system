const BASE_URL = 'http://localhost:8080/api/';
const ROUTES = {
  // SIGN IN / SIGN UP SERVICES
  USER_LOGIN: `${BASE_URL}test`,
  // ROLE MANAGEMENT SERVICES
  SEARCH_ROLE_BY_SYSTEM_TITLE: `${BASE_URL}test`,
  STORE_NEW_SYSTEM: `${BASE_URL}system`,
  STORE_NEW_ROLE: `${BASE_URL}system/`,
  REMOVE_ROLE: `${BASE_URL}role/`
};

export default ROUTES;
