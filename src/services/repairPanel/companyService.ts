import axiosInstance from '../baseService';
import { ROUTES } from 'src/constants/routes';

interface GetCompaniesRequest {
  page?: number;
  size?: number;
  sort?: string;
  search?: string;
}

interface Company {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
}

const fetchCompaniesList = async (request: GetCompaniesRequest) => {
  const response = await axiosInstance.get(ROUTES.REPAIR.COMPANY.LIST, {
    params: request
  });
  return response.data;
};

const fetchCompanyInfo = async (companyId: string) => {
  const response = await axiosInstance.get(ROUTES.REPAIR.COMPANY.INFO(companyId));
  return response.data;
};

const createCompany = async (companyData: Omit<Company, 'id'>) => {
  const response = await axiosInstance.post(ROUTES.REPAIR.COMPANY.CREATE, companyData);
  return response.data;
};

const updateCompany = async (companyId: string, companyData: Partial<Company>) => {
  const response = await axiosInstance.put(ROUTES.REPAIR.COMPANY.UPDATE(companyId), companyData);
  return response.data;
};

const deleteCompany = async (companyId: string) => {
  await axiosInstance.delete(ROUTES.REPAIR.COMPANY.DELETE(companyId));
};

export {
  fetchCompaniesList,
  fetchCompanyInfo,
  createCompany,
  updateCompany,
  deleteCompany
}; 