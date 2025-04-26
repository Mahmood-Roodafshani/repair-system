import axios, { AxiosError } from 'axios';
import { LoginRequest, LoginResponse } from './loginTypes';
import { toast } from 'react-toastify';

const keycloakAxios = axios.create({
  baseURL: import.meta.env.VITE_KEYCLOAK_URL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});

const handleKeycloakError = (error: AxiosError) => {
  if (error.response) {
    const { status } = error.response;
    if (status === 401) {
      toast.error('نام کاربری یا رمز عبور اشتباه است');
    } else if (status === 400) {
      toast.error('اطلاعات وارد شده نامعتبر است');
    } else {
      toast.error('خطایی در ارتباط با سرور رخ داد');
    }
  } else {
    toast.error('خطایی در ارتباط با سرور رخ داد');
  }
  throw error;
};

export const loginService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await keycloakAxios.post<LoginResponse>(
        `/realms/${import.meta.env.VITE_KEYCLOAK_REALM}/protocol/openid-connect/token`,
        new URLSearchParams({
          client_id: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
          username: credentials.username,
          password: credentials.password,
          grant_type: 'password'
        }).toString()
      );
      return response.data;
    } catch (error) {
      handleKeycloakError(error as AxiosError);
      throw error;
    }
  },

  logout: async (): Promise<void> => {
    try {
      await keycloakAxios.post(
        `/realms/${import.meta.env.VITE_KEYCLOAK_REALM}/protocol/openid-connect/logout`,
        new URLSearchParams({
          client_id: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
          refresh_token: localStorage.getItem('refresh_token') || ''
        }).toString()
      );
    } catch (error) {
      handleKeycloakError(error as AxiosError);
      throw error;
    }
  },

  refreshToken: async (refreshToken: string): Promise<LoginResponse> => {
    try {
      const response = await keycloakAxios.post<LoginResponse>(
        `/realms/${import.meta.env.VITE_KEYCLOAK_REALM}/protocol/openid-connect/token`,
        new URLSearchParams({
          client_id: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
          grant_type: 'refresh_token',
          refresh_token: refreshToken
        }).toString()
      );
      return response.data;
    } catch (error) {
      handleKeycloakError(error as AxiosError);
      throw error;
    }
  }
}; 