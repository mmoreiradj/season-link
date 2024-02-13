import { FetchBaseQueryArgs } from '@reduxjs/toolkit/dist/query/fetchBaseQuery';
import camelcaseKeys from 'camelcase-keys';
import config from 'common/config/config';
import { RootState } from 'common/store/store';

type GetStateFn = () => unknown;

const baseQueryConfig: FetchBaseQueryArgs = {
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
