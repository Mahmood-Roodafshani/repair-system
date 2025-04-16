import { useKeycloak } from '@react-keycloak/web';

const useAuth = () => {
  const { keycloak, initialized } = useKeycloak();

  return {
    initialized,
    isAuthenticated: keycloak.authenticated,
    username: keycloak.tokenParsed?.preferred_username,
    roles: keycloak.tokenParsed?.realm_access?.roles || [],
    token: keycloak.token,
    login: keycloak.login,
    logout: keycloak.logout,
    updateToken: keycloak.updateToken
  };
};

export default useAuth;
