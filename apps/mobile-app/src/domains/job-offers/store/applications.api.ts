import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import baseQueryConfig from 'common/helpers/base-query-fn';
import { Application } from '../types/applications.type';

export const APPLICATIONS_API_REDUCER_KEY = 'applicationsApi';

export const applicationsApi = createApi({
  reducerPath: APPLICATIONS_API_REDUCER_KEY,
  baseQuery: fetchBaseQuery(baseQueryConfig),
  endpoints: (builder) => ({
    apply: builder.mutation<Application, string>({
      query: (id: string) => ({
        url: `job-offers/${id}/applications`,
        method: 'POST',
      }),
    }),
    getApplication: builder.query<Application, string>({
      query: (id: string) => `applications/${id}`,
    }),
  }),
});

export const { useApplyMutation, useGetApplicationQuery } = applicationsApi;
