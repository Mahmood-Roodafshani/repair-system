import axiosInstance from './baseService';
import { KeycloakInstance } from 'keycloak-js';
import { ROUTES } from 'src/constants/routes';

interface User {
  id: string;
  username: string;
  email: string;
}

class UserService {
  async getUsers(): Promise<User[]> {
    const response = await axiosInstance.get(ROUTES.USER.PROFILE.FETCH_ALL);
    return response.data;
  }

  async getUserById(id: string): Promise<User> {
    const response = await axiosInstance.get(ROUTES.USER.PROFILE.FETCH_BY_ID(id));
    return response.data;
  }

  async createUser(userData: Omit<User, 'id'>): Promise<User> {
    const response = await axiosInstance.post(ROUTES.USER.PROFILE.CREATE, userData);
    return response.data;
  }

  async updateUser(id: string, userData: Partial<User>): Promise<User> {
    const response = await axiosInstance.put(ROUTES.USER.PROFILE.UPDATE(id), userData);
    return response.data;
  }

  async deleteUser(id: string): Promise<void> {
    await axiosInstance.delete(ROUTES.USER.PROFILE.DELETE(id));
  }
}

// Export the service instance
export default new UserService();

// Export utility functions
export const logout = async (keycloak: KeycloakInstance) => {
  await keycloak.logout();
};

export const getCurrentUser = async (keycloak: KeycloakInstance) => {
  const response = await axiosInstance.get(ROUTES.USER.PROFILE.CURRENT, {
    headers: {
      Authorization: `Bearer ${keycloak.token}`
    }
  });
  return response.data;
};

export const updateUserProfile = async (data: any, keycloak: KeycloakInstance) => {
  const response = await axiosInstance.put(ROUTES.USER.PROFILE.UPDATE_CURRENT, data, {
    headers: {
      Authorization: `Bearer ${keycloak.token}`
    }
  });
  return response.data;
};
