import axiosInstance from './baseService';

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
    const response = await axiosInstance.get('/api/access-control/list');
    return response.data;
  }

  async getRoles(): Promise<Role[]> {
    const response = await axiosInstance.get('/api/access-control/roles');
    return response.data;
  }
}

export default new AccessControlService(); 