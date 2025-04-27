const BASE_URL = import.meta.env.VITE_APP_BASE_URL || 'http://localhost:8080';

export const ROUTES = {
  // Authentication
  AUTH: {
    LOGIN: `${BASE_URL}/test`
  },

  // Role Management
  ROLE: {
    FETCH_ALL: `${BASE_URL}/fetchRoles`,
    GET_SYSTEM_ROLES: (systemId: string) => `${BASE_URL}/um/roles/${systemId}`,
    REMOVE: (roleId: string) => `${BASE_URL}/role/${roleId}`,
    SYSTEM: {
      CREATE: `${BASE_URL}/system`,
      REMOVE: (systemId: string) => `${BASE_URL}/system/${systemId}`,
      ADD_ROLE: (systemId: string) => `${BASE_URL}/system/${systemId}`
    }
  },

  // User Management
  USER: {
    // Access Control
    ACCESS_CONTROL: {
      FETCH_LIST: `${BASE_URL}/fetchList/`
    },
    // Permissions
    PERMISSION: {
      BASE: `${BASE_URL}/um/permissions`,
      GET_ALL: `${BASE_URL}/um/permissions`,
      GET_BY_ID: (id: number) => `${BASE_URL}/um/permissions/${id}`,
      CREATE: `${BASE_URL}/um/permissions`,
      UPDATE: (id: number) => `${BASE_URL}/um/permissions/${id}`,
      DELETE: (id: number) => `${BASE_URL}/um/permissions/${id}`
    }
  },

  // Jobs Management
  JOBS: {
    ORGANIZATION_UNITS: {
      FETCH_ALL: `${BASE_URL}/organizationUnits/`
    }
  },

  // Repair Management
  REPAIR: {
    COMMISSION: {
      LIST: `${BASE_URL}/commission/list`,
      ITEMS_IN_QUEUE: `${BASE_URL}/commission/items`
    }
  }
} as const; 