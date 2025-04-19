import { ReactKeycloakProvider } from '@react-keycloak/web';
import { ReactNode, useState, useMemo, useEffect } from 'react';
import Keycloak from 'keycloak-js';
import { keycloakConfig } from '../config/keycloak';
import { KeycloakContext } from '../contexts/KeycloakContext';
import { useNavigate } from 'react-router-dom';

interface KeycloakProviderProps {
  children: ReactNode;
}

// Singleton pattern with initialization tracking
let keycloakInstance: Keycloak | null = null;

const getKeycloakInstance = () => {
  if (!keycloakInstance) {
    console.log('Creating new Keycloak instance with config:', {
      ...keycloakConfig,
      credentials: { ...keycloakConfig.credentials, secret: '***' }
    });
    keycloakInstance = new Keycloak(keycloakConfig);
    
    // Log the instance creation
    console.log('Keycloak instance created:', {
      url: keycloakInstance.authServerUrl,
      realm: keycloakInstance.realm,
      clientId: keycloakInstance.clientId,
      token: keycloakInstance.token ? '***' : 'not set',
      refreshToken: keycloakInstance.refreshToken ? '***' : 'not set',
      idToken: keycloakInstance.idToken ? '***' : 'not set'
    });
  }
  return keycloakInstance;
};

export const KeycloakProvider = ({ children }: KeycloakProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const keycloak = getKeycloakInstance();
  const navigate = useNavigate();
  
  console.log('KeycloakProvider rendered, instance:', {
    url: keycloak.authServerUrl,
    realm: keycloak.realm,
    clientId: keycloak.clientId,
    token: keycloak.token ? '***' : 'not set',
    refreshToken: keycloak.refreshToken ? '***' : 'not set',
    idToken: keycloak.idToken ? '***' : 'not set'
  });

  useEffect(() => {
    console.log('KeycloakProvider mounted');
    return () => {
      console.log('KeycloakProvider unmounted');
    };
  }, []);

  const handleOnEvent = (event: string, error?: any) => {
    console.log('Keycloak event:', event, error ? {
      error,
      status: error?.response?.status,
      statusText: error?.response?.statusText,
      data: error?.response?.data,
      headers: error?.response?.headers,
      config: error?.config ? {
        ...error.config,
        headers: error.config.headers ? '***' : undefined
      } : undefined
    } : 'no error');

    switch (event) {
      case 'onAuthSuccess':
        console.log('Authentication successful', {
          token: keycloak.token ? '***' : 'not set',
          refreshToken: keycloak.refreshToken ? '***' : 'not set',
          idToken: keycloak.idToken ? '***' : 'not set',
          tokenParsed: keycloak.tokenParsed ? '***' : 'not set'
        });
        setIsAuthenticated(true);
        break;
      case 'onAuthError':
        console.error('Authentication error:', error);
        if (error?.response?.status === 401) {
          console.log('401 Unauthorized - Attempting to login');
          keycloak.login();
        } else {
          console.error('Other auth error - Please try logging in again');
          navigate('/login');
        }
        break;
      case 'onInitError':
        console.error('Keycloak initialization failed:', error);
        if (error?.response?.status === 401) {
          console.log('401 Unauthorized during init - Attempting to login');
          keycloak.login();
        }
        break;
      case 'onTokenExpired':
        console.log('Token expired, attempting to refresh');
        keycloak.updateToken(70)
          .then(refreshed => {
            if (refreshed) {
              console.log('Token refreshed successfully');
            } else {
              console.log('Token not refreshed, valid for', Math.round(keycloak.tokenParsed?.exp || 0 - new Date().getTime() / 1000), 'seconds');
            }
          })
          .catch(error => {
            console.error('Failed to refresh token:', error);
            keycloak.login();
          });
        break;
      case 'onAuthLogout':
        console.log('User logged out');
        setIsAuthenticated(false);
        navigate('/login');
        break;
    }
  };

  // Initialize Keycloak with specific options
  const initOptions = useMemo(() => ({
    onLoad: 'check-sso',
    silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
    pkceMethod: 'S256',
    checkLoginIframe: false,
    // Add additional options to handle iframe issues
    enableLogging: true,
    scope: 'openid profile email',
    // Disable iframe checking
    checkLoginIframeInterval: 0,
    // Set proper response mode
    responseMode: 'query',
    responseType: 'code',
    // Add redirect URI
    redirectUri: window.location.origin + '/dashboard'
  }), []);

  // Use useMemo to ensure we don't recreate the provider on every render
  const provider = useMemo(() => {
    console.log('Creating provider with keycloak instance:', {
      url: keycloak.authServerUrl,
      realm: keycloak.realm,
      clientId: keycloak.clientId,
      token: keycloak.token ? '***' : 'not set',
      refreshToken: keycloak.refreshToken ? '***' : 'not set',
      idToken: keycloak.idToken ? '***' : 'not set'
    });
    
    return (
      <ReactKeycloakProvider
        authClient={keycloak}
        onEvent={handleOnEvent}
        initOptions={initOptions}
        LoadingComponent={<div>Loading authentication...</div>}
      >
        <KeycloakContext.Provider value={{ keycloak, isAuthenticated }}>
          {children}
        </KeycloakContext.Provider>
      </ReactKeycloakProvider>
    );
  }, [keycloak, children, isAuthenticated, navigate]);

  return provider;
};

