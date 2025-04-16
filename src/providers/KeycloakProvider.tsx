import { ReactNode } from 'react';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from '../config/keycloak';

interface KeycloakProviderProps {
  children: ReactNode;
}

const KeycloakProvider = ({ children }: KeycloakProviderProps) => {
  const handleOnEvent = (event: string, error?: Error) => {
    if (error) {
      console.error('Keycloak event error:', error);
    }
  };

  const loadingComponent = <div>Loading...</div>;

  return (
    <ReactKeycloakProvider
      authClient={keycloak}
      initOptions={{
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/silent-check-sso.html',
        pkceMethod: 'S256'
      }}
      onEvent={handleOnEvent}
      LoadingComponent={loadingComponent}
    >
      {children}
    </ReactKeycloakProvider>
  );
};

export default KeycloakProvider;
