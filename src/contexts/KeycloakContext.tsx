import { createContext } from 'react';
import Keycloak from 'keycloak-js';

interface KeycloakContextType {
  keycloak: Keycloak;
  isAuthenticated: boolean;
}

export const KeycloakContext = createContext<KeycloakContextType>({
  keycloak: {} as Keycloak,
  isAuthenticated: false
}); 