import { SystemRolesMock } from 'src/mock';
import ROUTES from '../routes';
import { get } from '../service';
import { timeout } from 'src/utils/helper';

const searchRoleBySystemTitle = async ({ title: string }) => {
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

export { searchRoleBySystemTitle };
