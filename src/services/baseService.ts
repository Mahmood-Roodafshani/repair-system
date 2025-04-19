import axios from 'axios';
import { KeycloakInstance } from 'keycloak-js';
import { toast } from 'react-toastify';

const getAuthHeaders = (keycloak: KeycloakInstance) => {
  const headers: Record<string, string> = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  
  if (keycloak?.token) {
    headers['Authorization'] = `Bearer ${keycloak.token}`;
  }
  
  return headers;
};

const baseURL = import.meta.env.VITE_APP_BASE_URL || 'http://localhost:8080';

// Create a single axios instance with default config
const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add interceptors for common functionality
export const setupAxiosInterceptors = (keycloak: KeycloakInstance) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      // Add auth headers to every request
      const headers = getAuthHeaders(keycloak);
      config.headers = { ...config.headers, ...headers };
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        const { status, data } = error.response;
        
        if (status === 401) {
          toast('توکن شما منقضی شده است و باید مجدد لاگین کنید', { type: 'error' });
          keycloak.login();
        } else if (status === 500) {
          toast('خطایی به وجود آمده است', { type: 'error' });
        } else if (status === 400) {
          if (data?.fields) {
            Object.keys(data.fields).forEach((key) => {
              toast(key + ': ' + data.fields[key], { type: 'error' });
            });
          } else if (data?.detail) {
            toast(data.detail, { type: 'error' });
          } else if (data?.msg) {
            toast(data.msg, { type: 'error' });
          }
        }
      } else {
        console.error('Request error:', error);
        toast('خطایی در ارتباط با سرور رخ داد', { type: 'error' });
      }
      return Promise.reject(error);
    }
  );
};

export default axiosInstance; 