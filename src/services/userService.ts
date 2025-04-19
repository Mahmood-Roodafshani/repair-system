import axiosInstance from './baseService';
import { KeycloakInstance } from 'keycloak-js';

interface User {
  id: string;
  username: string;
  email: string;
}

class UserService {
  async getUsers(): Promise<User[]> {
    const response = await axiosInstance.get('/users');
    return response.data;
  }

  async getUserById(id: string): Promise<User> {
    const response = await axiosInstance.get(`/users/${id}`);
    return response.data;
  }

  async createUser(userData: Omit<User, 'id'>): Promise<User> {
    const response = await axiosInstance.post('/users', userData);
    return response.data;
  }

  async updateUser(id: string, userData: Partial<User>): Promise<User> {
    const response = await axiosInstance.put(`/users/${id}`, userData);
    return response.data;
  }

  async deleteUser(id: string): Promise<void> {
    await axiosInstance.delete(`/users/${id}`);
  }
}

// Export the service instance
export default new UserService();

// Export utility functions
export const logout = async (keycloak: KeycloakInstance) => {
  await keycloak.logout();
};

export const getCurrentUser = async (keycloak: KeycloakInstance) => {
  const response = await axiosInstance.get('/api/users/me', {
    headers: {
      Authorization: `Bearer ${keycloak.token}`
    }
  });
  return response.data;
};

export const updateUserProfile = async (data: any, keycloak: KeycloakInstance) => {
  const response = await axiosInstance.put('/api/users/me', data, {
    headers: {
      Authorization: `Bearer ${keycloak.token}`
    }
  });
  return response.data;
};
