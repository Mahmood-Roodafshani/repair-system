import axiosInstance from '../baseService';

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
  const response = await axiosInstance.get('/api/repair-panel/companies', {
    params: request
  });
  return response.data;
};

const fetchCompanyInfo = async (companyId: string) => {
  const response = await axiosInstance.get(`/api/repair-panel/companies/${companyId}`);
  return response.data;
};

const createCompany = async (companyData: Omit<Company, 'id'>) => {
  const response = await axiosInstance.post('/api/repair-panel/companies', companyData);
  return response.data;
};

const updateCompany = async (companyId: string, companyData: Partial<Company>) => {
  const response = await axiosInstance.put(`/api/repair-panel/companies/${companyId}`, companyData);
  return response.data;
};

const deleteCompany = async (companyId: string) => {
  await axiosInstance.delete(`/api/repair-panel/companies/${companyId}`);
};

export {
  fetchCompaniesList,
  fetchCompanyInfo,
  createCompany,
  updateCompany,
  deleteCompany
}; 