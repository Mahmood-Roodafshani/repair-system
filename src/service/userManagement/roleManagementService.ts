import { SystemRolesMock } from 'src/mock';
import ROUTES from '../routes';
import { get, post, remove } from '../service';
import { timeout } from 'src/utils/helper';
import { Title } from '@mui/icons-material';
import { number } from 'prop-types';

const searchRoleBySystemTitle = async ({ title }: { title: string }) => {
  //   const response = await get({
  //     url: ROUTES.SEARCH_ROLE_BY_SYSTEM_TITLE
  //   });
  //   return response;

  await timeout(1000);
  return {
    statusCode: 200,
    content: SystemRolesMock
  };
};

const storeNewSystem = async ({ title }: { title: string }) => {
  // const response = await post({
  //   url: ROUTES.STORE_NEW_SYSTEM,
  //   data: {
  //     title: title
  //   }
  // });
  // return response;

  await timeout(1000);
  return {
    statusCode: 200
  };
};

const storeNewRole = async ({
  systemId,
  title
}: {
  systemId: string | number;
  title: string;
}) => {
  // const response = await post({
  //   url: ROUTES.STORE_NEW_ROLE + systemId,
  //   data: {
  //     title: title
  //   }
  // });
  // return response;

  await timeout(1000);
  return {
    statusCode: 200
  };
};

const removeRole = async ({ roleId }: { roleId: string | number }) => {
  // const response = await remove({
  //   url: ROUTES.REMOVE_ROLE + roleId
  // });
  // return response;

  await timeout(1000);
  return {
    statusCode: 200
  };
};

export { searchRoleBySystemTitle, storeNewSystem, storeNewRole, removeRole };
