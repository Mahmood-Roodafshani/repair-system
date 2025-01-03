const BASE_URL = 'http://localhost:8080/api/';
const ROUTES = {
  USER_LOGIN: `${BASE_URL}user/register/signIn`,
  GET_MY_PROJECTS: `${BASE_URL}project/manage/getMyProjects`,
  STORE_NEW_PROJECT: `${BASE_URL}project/manage/store`,
  REMOVE_PROJECT: `${BASE_URL}project/manage/remove/`,
  STORE_NEW_CONTRACTOR: `${BASE_URL}project/contractor/store/new/`,

  // CONTRACTOR APIS
  STORE_EXIST_CONTRACTOR: `${BASE_URL}project/contractor/store/exist/`,
  REMOVE_CONTRACTOR: `${BASE_URL}project/contractor/remove/`,
  GET_PROJECT_CONTRACTORS: `${BASE_URL}project/contractor/getMyContractors/`,

  // PUBLIC APIS
  GET_CONTRACTOR_TYPES: `${BASE_URL}public/getContractorTypes`,
  GET_ALL_EQUIPMENTS: `${BASE_URL}/public/getAllEquipments`,
  GET_ALL_MATERIALS: `${BASE_URL}/public/getAllMaterials`,
  GET_UNITS: `${BASE_URL}/public/getUnits`,
  GET_ALL_PREFERENTIALS: `${BASE_URL}/public/getAllPreferentials`
};

export default ROUTES;
