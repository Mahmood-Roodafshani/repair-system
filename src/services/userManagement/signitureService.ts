import { timeout } from 'src/utils/helper';
import { post } from '../service';
import ROUTES from '../routes';
import { SampleSignitureRequestType } from 'src/types';

const addSampleSigniture = async ({
  sampleSigniture
}: {
  sampleSigniture: SampleSignitureRequestType;
}) => {
  if (import.meta.env.VITE_APP_WORK_WITH_MOCK) {
    await timeout(1000);
    return {
      statusCode: 201
    };
  }

  const response = await post({
    url: ROUTES.ACCESS_CONTROL_FETCH_LIST,
    data: sampleSigniture
  });
  return response;
};

export { addSampleSigniture };
