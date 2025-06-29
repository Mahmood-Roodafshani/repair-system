import { ReactKeycloakProvider } from '@react-keycloak/web';
import { ReactNode, useState } from 'react';
import { keycloak } from '../config/keycloak';
import { KeycloakContext } from '../contexts/KeycloakContext';

interface KeycloakProviderProps {
  children: ReactNode;
}

export const KeycloakProvider = ({ children }: KeycloakProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <ReactKeycloakProvider
      authClient={keycloak}
      initOptions={{
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
        pkceMethod: 'S256',
        checkLoginIframe: false,
        enableLogging: true,
        scope: 'openid profile email',
        redirectUri: window.location.origin + '/dashboard',
        checkLoginIframeInterval: 0,
        flow: 'standard',
        responseMode: 'fragment',
        responseType: 'code',
        useNonce: true
      }}
      onEvent={(event) => {
        if (event === 'onAuthSuccess') {
          setIsAuthenticated(true);
        } else if (event === 'onAuthLogout') {
          setIsAuthenticated(false);
          keycloak.logout();
        }
      }}
    >
      <KeycloakContext.Provider value={{ keycloak, isAuthenticated }}>
        {children}
      </KeycloakContext.Provider>
    </ReactKeycloakProvider>
  );
};

