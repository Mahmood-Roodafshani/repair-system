import { AccessControlFilterType } from 'src/types';
import { timeout } from 'src/utils/helper';
import { get } from '../service';
import ROUTES from '../routes';
import { AccessControlListMock } from 'src/mock';

const accessControlFetchList = async ({
  filter
}: {
  filter: AccessControlFilterType;
}) => {
  if (process.env.REACT_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200,
      content: AccessControlListMock
    };
  }
  //todo: build query params from filter
  const response = await get({
    url: ROUTES.ACCESS_CONTROL_FETCH_LIST
  });
  return response;
};

export { accessControlFetchList };
