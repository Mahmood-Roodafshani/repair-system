import Keycloak from 'keycloak-js';

// Keycloak configuration
const keycloakConfig = {
  url: import.meta.env.VITE_KEYCLOAK_URL || 'http://localhost:8180',
  realm: import.meta.env.VITE_KEYCLOAK_REALM || 'repair-system',
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID || 'repair-system-client',
  // Explicitly set the endpoints
  authServerUrl: import.meta.env.VITE_KEYCLOAK_URL || 'http://localhost:8180',
  sslRequired: 'external',
  publicClient: true,
  confidentialPort: 0,
  // Add realm URL
  realmUrl: `${import.meta.env.VITE_KEYCLOAK_URL || 'http://localhost:8180'}/realms/${import.meta.env.VITE_KEYCLOAK_REALM || 'repair-system'}`,
  // Add client secret
  credentials: {
    secret: import.meta.env.VITE_KEYCLOAK_CLIENT_SECRET || 'rgdyix6xYU9kBBpuyRcdnLNH1HnLVpqh'
  },
  // Enable PKCE
  usePkce: true,
  pkceMethod: 'S256',
  // Simplify the flow
  responseMode: 'query',
  responseType: 'code',
  // Disable nonce for now to simplify debugging
  useNonce: false,
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

// Add detailed initialization logging
console.log('Keycloak Environment Variables:', {
  VITE_KEYCLOAK_URL: import.meta.env.VITE_KEYCLOAK_URL,
  VITE_KEYCLOAK_REALM: import.meta.env.VITE_KEYCLOAK_REALM,
  VITE_KEYCLOAK_CLIENT_ID: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
  VITE_KEYCLOAK_CLIENT_SECRET: import.meta.env.VITE_KEYCLOAK_CLIENT_SECRET ? '***' : 'not set'
});

console.log('Keycloak Configuration:', {
  ...keycloakConfig,
  credentials: { ...keycloakConfig.credentials, secret: '***' }, // Hide the secret in logs
  realmUrl: keycloakConfig.realmUrl,
  redirectUri: keycloakConfig.redirectUri,
  redirectUris: keycloakConfig.redirectUris
});

// Log the Keycloak instance state
console.log('Keycloak Instance State:', {
  authenticated: keycloak.authenticated,
  token: keycloak.token ? '***' : 'not set',
  refreshToken: keycloak.refreshToken ? '***' : 'not set',
  idToken: keycloak.idToken ? '***' : 'not set',
  tokenParsed: keycloak.tokenParsed ? '***' : 'not set',
  realmAccess: keycloak.realmAccess,
  resourceAccess: keycloak.resourceAccess
});
