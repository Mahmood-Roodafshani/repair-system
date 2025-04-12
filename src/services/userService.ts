import { SignInRequest } from 'src/types';
import ROUTES from './routes';
import { post } from './service';

const signIn = async ({ data }: { data: SignInRequest }) => {
  const response = await post({
    url: ROUTES.USER_LOGIN,
    data: data,
    acceptJson: false,
    needToken: false
  });
  if (response.statusCode === 200) {
    window.localStorage.setItem('token', response.content);
    return {
      statusCode: 200
    };
  }
};

export { signIn };
