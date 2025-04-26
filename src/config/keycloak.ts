import Keycloak from 'keycloak-js';

// Keycloak configuration with default values for optional variables
const keycloakConfig = {
  url: import.meta.env.VITE_KEYCLOAK_URL,
  realm: import.meta.env.VITE_KEYCLOAK_REALM,
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
  // Explicitly set the endpoints
  authServerUrl: import.meta.env.VITE_KEYCLOAK_URL,
  sslRequired: import.meta.env.VITE_KEYCLOAK_SSL_REQUIRED || 'external',
  publicClient: import.meta.env.VITE_KEYCLOAK_PUBLIC_CLIENT === 'true',
  confidentialPort: parseInt(import.meta.env.VITE_KEYCLOAK_CONFIDENTIAL_PORT || '0'),
  // Add realm URL
  realmUrl: `${import.meta.env.VITE_KEYCLOAK_URL}/realms/${import.meta.env.VITE_KEYCLOAK_REALM}`,
  // Add client secret
  credentials: {
    secret: import.meta.env.VITE_KEYCLOAK_CLIENT_SECRET || ''
  },
  // Enable PKCE
  usePkce: import.meta.env.VITE_KEYCLOAK_USE_PKCE === 'true',
  pkceMethod: import.meta.env.VITE_KEYCLOAK_PKCE_METHOD || 'S256',
  // Simplify the flow
  responseMode: import.meta.env.VITE_KEYCLOAK_RESPONSE_MODE || 'fragment',
  responseType: import.meta.env.VITE_KEYCLOAK_RESPONSE_TYPE || 'code',
  // Disable nonce for now to simplify debugging
  useNonce: import.meta.env.VITE_KEYCLOAK_USE_NONCE === 'true',
  // Add redirect URI
  redirectUri: window.location.origin,
  // Add additional redirect URIs
  redirectUris: [
    window.location.origin,
    window.location.origin + '/dashboard',
    window.location.origin + '/silent-check-sso.html'
  ]
};

// Create and export the Keycloak instance
export const keycloak = new Keycloak(keycloakConfig);

// Export the config separately
export { keycloakConfig };