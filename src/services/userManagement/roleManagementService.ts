import {
  SystemRolesMock,
  SystemsMock
} from 'src/mock/userManagement/systemRolesMock';
import ROUTES from '../routes';
import { get, post, remove } from '../service';
import { timeout } from 'src/utils/helper';

const searchRoleBySystemTitle = async ({ title }: { title: string }) => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200,
      content: SystemsMock
    };
  }
  const response = await get({
    url: ROUTES.SEARCH_ROLE_BY_SYSTEM_TITLE
  });
  return response;
};

const getSystemRoles = async ({ systemId }: { systemId: string | number }) => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200,
      content: SystemRolesMock
    };
  }
  const response = await get({
    url: ROUTES.STORE_NEW_SYSTEM + systemId
  });
  return response;
};

const storeNewSystem = async ({ title }: { title: string }) => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200
    };
  }
  const response = await post({
    url: ROUTES.STORE_NEW_SYSTEM,
    data: {
      title: title
    }
  });
  return response;
};

const storeNewRole = async ({
  systemId,
  roleId,
  title
}: {
  systemId: string | number;
  roleId: string | number;
  title: string;
}) => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200
    };
  }
  const response = await post({
    url: ROUTES.STORE_NEW_ROLE + systemId,
    data: {
      title: title
    }
  });
  return response;
};

const removeSystem = async ({ systemId }: { systemId: string | number }) => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200
    };
  }
  const response = await remove({
    url: ROUTES.REMOVE_ROLE + systemId
  });
  return response;
};

const removeRole = async ({ roleId }: { roleId: string | number }) => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200
    };
  }
  const response = await remove({
    url: ROUTES.REMOVE_ROLE + roleId
  });
  return response;
};

export {
  searchRoleBySystemTitle,
  storeNewSystem,
  storeNewRole,
  removeRole,
  removeSystem,
  getSystemRoles
};
