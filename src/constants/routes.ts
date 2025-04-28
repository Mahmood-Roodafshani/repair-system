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
      FETCH_LIST: `${BASE_URL}/fetchList/`,
      FIND_STAFF: `${BASE_URL}/findStaff`,
      CREATE: `${BASE_URL}/create`,
      FETCH_GRANTS: `${BASE_URL}/fetchGrants`,
      FETCH_USER_GRANTS: `${BASE_URL}/fetchUserGrants`,
      GET_ROLES_WITH_GRANTS: `${BASE_URL}/getRolesWithGrants`
    },
    // Group Access
    GROUP_ACCESS: {
      FETCH_LIST: `${BASE_URL}/groupAccess/list`,
      FETCH_ROLES: `${BASE_URL}/groupAccess/roles`,
      REMOVE: `${BASE_URL}/groupAccess/remove`,
      ADD: `${BASE_URL}/groupAccess/add`
    },
    // Announcement
    ANNOUNCEMENT: {
      PUBLIC: `${BASE_URL}/announcement/public`,
      SECURITY: `${BASE_URL}/announcement/security`
    },
    // Signature
    SIGNITURE: {
      ADD: `${BASE_URL}/signiture/add`
    },
    // User Profile
    PROFILE: {
      FETCH_ALL: `${BASE_URL}/users`,
      FETCH_BY_ID: (id: string) => `${BASE_URL}/users/${id}`,
      CREATE: `${BASE_URL}/users`,
      UPDATE: (id: string) => `${BASE_URL}/users/${id}`,
      DELETE: (id: string) => `${BASE_URL}/users/${id}`,
      CURRENT: `${BASE_URL}/api/users/me`,
      UPDATE_CURRENT: `${BASE_URL}/api/users/me`
    }
  },

  // Jobs Management
  JOBS: {
    FETCH_LIST: `${BASE_URL}/jobs/list`,
    FETCH_TREE: `${BASE_URL}/jobs/tree`,
    CREATE: `${BASE_URL}/jobs/create`,
    UPDATE: `${BASE_URL}/jobs/update`,
    REMOVE: `${BASE_URL}/jobs/remove`,
    ORGANIZATION_UNITS: {
      FETCH_ALL: `${BASE_URL}/organizationUnits/`
    }
  },

  // Coding Management
  CODING: {
    FETCH_LIST: `${BASE_URL}/coding/list`,
    FETCH_ACCESS_LIST: `${BASE_URL}/coding/access/list`,
    REMOVE: `${BASE_URL}/coding/remove`,
    CREATE: `${BASE_URL}/coding/create`,
    CREATE_ACCESS: `${BASE_URL}/coding/access/create`,
    UPDATE: `${BASE_URL}/coding/update`,
    REMOVE_ACCESS: `${BASE_URL}/coding/access/remove`
  },

  // Repair Management
  REPAIR: {
    COMMISSION: {
      LIST: `${BASE_URL}/commission/list`,
      ITEMS_IN_QUEUE: `${BASE_URL}/commission/items`,
      CREATE: `${BASE_URL}/commission/create`,
      UPDATE: (id: string | number) => `${BASE_URL}/commission/${id}`
    },
    BORROWED_ITEMS: {
      LIST: `${BASE_URL}/repair-panel/borrowed-items`
    },
    ITEMS: {
      LIST: `${BASE_URL}/repair-panel/items`,
      CENTRAL_ASSET_LIST: `${BASE_URL}/central-asset-panel/items`
    },
    COMPANY: {
      LIST: `${BASE_URL}/repair-panel/companies`,
      INFO: (id: string) => `${BASE_URL}/repair-panel/companies/${id}`,
      CREATE: `${BASE_URL}/repair-panel/companies`,
      UPDATE: (id: string) => `${BASE_URL}/repair-panel/companies/${id}`,
      DELETE: (id: string) => `${BASE_URL}/repair-panel/companies/${id}`
    }
  },

  // Common Management
  COMMON: {
    CITIES: `${BASE_URL}/common/cities`,
    EDUCATIONAL_FIELDS: `${BASE_URL}/common/educational-fields`,
    FIELDS: `${BASE_URL}/common/fields`,
    COURSES: `${BASE_URL}/common/courses`,
    POSITION_DEGREES: `${BASE_URL}/common/position-degrees`,
    WORK_LOCATIONS: `${BASE_URL}/common/work-locations`,
    ACTIVITIES: `${BASE_URL}/common/activities`,
    ACTIVITY_FIELDS: `${BASE_URL}/common/activity-fields`,
    ITEM_CATEGORY_FIELDS: `${BASE_URL}/common/item-category-fields`
  },

  // Base Info Management
  BASE_INFO: {
    // Staff Info
    STAFF: {
      FETCH_LIST: `${BASE_URL}/staff/list`,
      CREATE: `${BASE_URL}/staff/create`,
      UPDATE: (id: string | number) => `${BASE_URL}/staff/${id}`,
      REMOVE: (id: string | number) => `${BASE_URL}/staff/${id}`
    },
    // Non-Staff Info
    NON_STAFF: {
      FETCH_LIST: `${BASE_URL}/non-staff/list`,
      CREATE: `${BASE_URL}/non-staff/create`,
      UPDATE: (id: string | number) => `${BASE_URL}/non-staff/${id}`,
      REMOVE: (id: string | number) => `${BASE_URL}/non-staff/${id}`
    },
    // Family Info
    FAMILY: {
      FETCH_LIST: `${BASE_URL}/family/list`,
      CREATE: `${BASE_URL}/family/create`,
      UPDATE: (id: string | number) => `${BASE_URL}/family/${id}`,
      REMOVE: (id: string | number) => `${BASE_URL}/family/${id}`
    }
  },

  // Tracking Management
  TRACKING: {
    MAIN_SYSTEMS: {
      LIST: `${BASE_URL}/tracking/main-systems`
    },
    TRACKING_LIST: {
      LIST: `${BASE_URL}/tracking/list`
    }
  }
} as const; 