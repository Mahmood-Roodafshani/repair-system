import { useKeycloak } from '@react-keycloak/web';

export const useKeycloakInstance = () => {
  const { keycloak } = useKeycloak();
  return keycloak;
}; 