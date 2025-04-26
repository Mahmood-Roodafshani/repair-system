import { useKeycloak } from '@react-keycloak/web';
import { loginService } from 'src/services/auth/loginService';
import { setupAxiosInterceptors } from 'src/services/baseService';
import { useEffect, useState } from 'react';

const TOKEN_REFRESH_THRESHOLD = Number(import.meta.env.VITE_TOKEN_REFRESH_THRESHOLD) || 70; // seconds before token expiration to refresh
const SESSION_TIMEOUT = Number(import.meta.env.VITE_SESSION_TIMEOUT) || 30 * 60 * 1000; // 30 minutes

const useAuth = () => {
  const { keycloak, initialized } = useKeycloak();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());

  // Setup axios interceptors when the hook is initialized
  if (initialized && keycloak) {
    setupAxiosInterceptors(keycloak);
  }

  const updateKeycloakState = (accessToken: string, refreshToken: string) => {
    keycloak.token = accessToken;
    keycloak.refreshToken = refreshToken;
    keycloak.authenticated = true;
    
    // Store tokens in localStorage for persistence
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
  };

  const clearAuthState = () => {
    keycloak.token = undefined;
    keycloak.refreshToken = undefined;
    keycloak.authenticated = false;
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  };

  const checkTokenExpiration = () => {
    if (!keycloak.tokenParsed?.exp) return false;
    const now = Math.floor(Date.now() / 1000);
    return keycloak.tokenParsed.exp - now < TOKEN_REFRESH_THRESHOLD;
  };

  // Role-based access control helpers
  const hasRole = (role: string) => {
    return keycloak.tokenParsed?.realm_access?.roles?.includes(role) || false;
  };

  const hasAnyRole = (roles: string[]) => {
    return roles.some(role => hasRole(role));
  };

  const hasAllRoles = (roles: string[]) => {
    return roles.every(role => hasRole(role));
  };

  // Token decoding utilities
  const decodeToken = (token: string) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
      console.error('Token decoding failed:', error);
      return null;
    }
  };

  const getTokenExpiration = () => {
    if (!keycloak.token) return null;
    const decoded = decodeToken(keycloak.token);
    return decoded?.exp ? new Date(decoded.exp * 1000) : null;
  };

  const login = async (username: string, password: string) => {
    try {
      const response = await loginService.login({ username, password });
      updateKeycloakState(response.access_token, response.refresh_token);
      await keycloak.updateToken(TOKEN_REFRESH_THRESHOLD);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      clearAuthState();
      throw error;
    }
  };

  const logout = async () => {
    try {
      await loginService.logout();
      clearAuthState();
      keycloak.logout();
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  };

  const refreshToken = async () => {
    if (isRefreshing) return;
    
    try {
      setIsRefreshing(true);
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await loginService.refreshToken(refreshToken);
      updateKeycloakState(response.access_token, response.refresh_token);
      return true;
    } catch (error) {
      console.error('Token refresh failed:', error);
      clearAuthState();
      throw error;
    } finally {
      setIsRefreshing(false);
    }
  };

  // Auto-refresh token when it's about to expire
  useEffect(() => {
    if (!keycloak.authenticated) return;

    const checkAndRefreshToken = async () => {
      if (checkTokenExpiration()) {
        try {
          await refreshToken();
        } catch (error) {
          console.error('Auto token refresh failed:', error);
        }
      }
    };

    const interval = setInterval(checkAndRefreshToken, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, [keycloak.authenticated]);

  // Session timeout handling
  useEffect(() => {
    const handleActivity = () => setLastActivity(Date.now());
    
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keypress', handleActivity);
    
    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keypress', handleActivity);
    };
  }, []);

  useEffect(() => {
    if (!keycloak.authenticated) return;

    const checkSessionTimeout = () => {
      if (Date.now() - lastActivity > SESSION_TIMEOUT) {
        logout();
      }
    };

    const timeoutInterval = setInterval(checkSessionTimeout, 60000); // Check every minute
    return () => clearInterval(timeoutInterval);
  }, [lastActivity, keycloak.authenticated]);

  return {
    initialized,
    isAuthenticated: keycloak.authenticated,
    isRefreshing,
    username: keycloak.tokenParsed?.preferred_username,
    roles: keycloak.tokenParsed?.realm_access?.roles || [],
    token: keycloak.token,
    tokenExpiration: getTokenExpiration(),
    login,
    logout,
    refreshToken,
    updateToken: keycloak.updateToken,
    // Role-based access control
    hasRole,
    hasAnyRole,
    hasAllRoles,
    // Token utilities
    decodeToken,
    getTokenExpiration
  };
};

export default useAuth;
