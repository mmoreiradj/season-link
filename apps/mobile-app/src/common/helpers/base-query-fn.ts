import camelcaseKeys from 'camelcase-keys';
import config from 'config/config';
import { RootState } from 'store/store';

type GetStateFn = () => unknown;

const baseQueryConfig = {
  responseHandler: async (response: Response) =>
    camelcaseKeys(await response.json(), { deep: true }),
  baseUrl: config.api.baseUrl,
  timeout: 10000,
  prepareHeaders: (
    headers: Headers,
    { getState }: { getState: GetStateFn }
  ) => {
    const token = (getState() as RootState).auth.accessToken;

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
};

export default baseQueryConfig;
