import { GetBorrowedItemsRequest } from 'src/types';
import { timeout } from 'src/utils/helper';
import ROUTES from '../routes';
import { get } from '../service';
import { BorrowedItemsMock } from 'src/mock';

const fetchBorrowedItemsList = async (request: GetBorrowedItemsRequest) => {
  if (process.env.REACT_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 200,
      content: BorrowedItemsMock
    };
  }
  //todo: build query params from filter
  const response = await get({
    url: ROUTES.ACCESS_CONTROL_FETCH_LIST
  });
  return response;
};

export { fetchBorrowedItemsList };
