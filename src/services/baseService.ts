import axios, { AxiosError, AxiosResponse, AxiosRequestHeaders } from 'axios';
import { KeycloakInstance } from 'keycloak-js';
import { toast } from 'react-toastify';
import { ApiResponse, ApiError } from 'src/types';

interface ErrorResponseData {
  message?: string;
  details?: Record<string, string>;
  fields?: Record<string, string>;
  detail?: string;
  msg?: string;
}

const getAuthHeaders = (keycloak: KeycloakInstance): AxiosRequestHeaders => {
  const headers: AxiosRequestHeaders = new axios.AxiosHeaders();
  headers.set('Accept', 'application/json');
  headers.set('Content-Type', 'application/json');
  
  if (keycloak?.token) {
    headers.set('Authorization', `Bearer ${keycloak.token}`);
  }
  
  return headers;
};

const baseURL = import.meta.env.VITE_APP_BASE_URL || 'http://localhost:8080';

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

const transformResponse = <T>(response: AxiosResponse): ApiResponse<T> => {
  return {
    statusCode: response.status,
    content: response.data.data,
    message: response.data.message
  };
};

const transformError = (error: AxiosError<ErrorResponseData>): ApiError => {
  if (error.response) {
    const { status, data } = error.response;
    const message = data?.message || data?.detail || data?.msg || 'An error occurred';
    const details = data?.details || data?.fields;
    
    return {
      statusCode: status,
      message,
      details
    };
  }
  return {
    statusCode: 500,
    message: 'Network error occurred'
  };
};

export const setupAxiosInterceptors = (keycloak: KeycloakInstance) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      // Add auth headers to every request
      const headers = getAuthHeaders(keycloak);
      config.headers = headers;
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error: AxiosError<ErrorResponseData>) => {
      const apiError = transformError(error);
      
      if (apiError.statusCode === 401) {
        toast('توکن شما منقضی شده است و باید مجدد لاگین کنید', { type: 'error' });
        keycloak.login();
      } else if (apiError.statusCode === 500) {
        toast('خطایی به وجود آمده است', { type: 'error' });
      } else if (apiError.statusCode === 400) {
        if (apiError.details) {
          Object.entries(apiError.details).forEach(([key, value]) => {
            toast(`${key}: ${value}`, { type: 'error' });
          });
        } else {
          toast(apiError.message, { type: 'error' });
        }
      } else {
        console.error('Request error:', error);
        toast('خطایی در ارتباط با سرور رخ داد', { type: 'error' });
      }
      return Promise.reject(apiError);
    }
  );
};

export const apiGet = async <T>(url: string): Promise<ApiResponse<T>> => {
  try {
    const response = await axiosInstance.get(url);
    return transformResponse<T>(response);
  } catch (error) {
    throw transformError(error as AxiosError<ErrorResponseData>);
  }
};

export const apiPost = async <T>(url: string, data?: any): Promise<ApiResponse<T>> => {
  try {
    const response = await axiosInstance.post(url, data);
    return transformResponse<T>(response);
  } catch (error) {
    throw transformError(error as AxiosError<ErrorResponseData>);
  }
};

export const apiPut = async <T>(url: string, data?: any): Promise<ApiResponse<T>> => {
  try {
    const response = await axiosInstance.put(url, data);
    return transformResponse<T>(response);
  } catch (error) {
    throw transformError(error as AxiosError<ErrorResponseData>);
  }
};

export const apiDelete = async <T>(url: string): Promise<ApiResponse<T>> => {
  try {
    const response = await axiosInstance.delete(url);
    return transformResponse<T>(response);
  } catch (error) {
    throw transformError(error as AxiosError<ErrorResponseData>);
  }
};

export default axiosInstance; 