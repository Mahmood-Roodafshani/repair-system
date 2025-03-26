import { timeout } from 'src/utils/helper';
import { get, post, put, remove } from '../service';
import ROUTES from '../routes';
import { GetCompaniesRequest } from 'src/types';
import { CompaniesMock, CompanyMock } from 'src/mock';
import { CreateCompanyRequest } from 'src/types/requests/repairPanel/company/createCompanyRequest';

const fetchCompaniesList = async (request: GetCompaniesRequest) => {
  if (process.env.REACT_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200,
      content: CompaniesMock
    };
  }
  //todo: build query params from filter
  const response = await get({
    url: ROUTES.ACCESS_CONTROL_FETCH_LIST
  });
  return response;
};

const fetchCompanyInfo = async ({
  companyId
}: {
  companyId: string | number;
}) => {
  if (process.env.REACT_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200,
      content: CompanyMock
    };
  }
  //todo: build query params from filter
  const response = await get({
    url: ROUTES.ACCESS_CONTROL_FETCH_LIST + companyId
  });
  return response;
};

const removeCompany = async ({ companyId }: { companyId: string | number }) => {
  if (process.env.REACT_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200
    };
  }
  const response = await remove({
    url: ROUTES.ACCESS_CONTROL_FETCH_LIST + companyId
  });
  return response;
};

const createCompany = async (form: CreateCompanyRequest) => {
  if (process.env.REACT_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200
    };
  }
  const response = await post({
    url: ROUTES.ACCESS_CONTROL_FETCH_LIST,
    data: form
  });
  return response;
};

const updateCompany = async ({
  form,
  companyId
}: {
  form: CreateCompanyRequest;
  companyId: string | number;
}) => {
  if (process.env.REACT_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200
    };
  }
  const response = await put({
    url: ROUTES.ACCESS_CONTROL_FETCH_LIST + companyId,
    data: form
  });
  return response;
};

export {
  fetchCompaniesList,
  fetchCompanyInfo,
  removeCompany,
  createCompany,
  updateCompany
};
