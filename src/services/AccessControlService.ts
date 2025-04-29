import axiosInstance from './baseService';
import { ROUTES } from 'src/constants/routes';

interface Role {
  id: string;
  name: string;
  permissions: string[];
}

interface AccessControl {
  id: string;
  userId: string;
  roleId: string;
  organizationUnitId: string;
}

class AccessControlService {
  async getAccessControlList(): Promise<AccessControl[]> {
    const response = await axiosInstance.get(ROUTES.USER.ACCESS_CONTROL.FETCH_LIST);
    return response.data;
  }

  async getRoles(): Promise<Role[]> {
    const response = await axiosInstance.get(ROUTES.ROLE.FETCH_ALL);
    return response.data;
  }
}

export default new AccessControlService(); 