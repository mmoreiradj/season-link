import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import baseQueryConfig from 'common/helpers/base-query-fn';
import { Application } from '../types/applications.type';

export const APPLICATIONS_API_REDUCER_KEY = 'applicationsApi';

export const applicationsApi = createApi({
  reducerPath: APPLICATIONS_API_REDUCER_KEY,
  tagTypes: ['Application'],
  baseQuery: fetchBaseQuery(baseQueryConfig),
  endpoints: (builder) => ({
    apply: builder.mutation<Application, string>({
      query: (id: string) => ({
        url: `job-offers/${id}/applications`,
        method: 'POST',
        invalidatesTags: [{ type: 'Application', id: 'LIST' }],
      }),
    }),

    getApplication: builder.query<Application, string>({
      query: (id: string) => `applications/${id}`,
      providesTags: (result) =>
        result ? [{ type: 'Application', id: result.id }] : [],
    }),

    getApplications: builder.query<Application[], void>({
      query: () => 'applications',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Application', id }) as const),
              { type: 'Application', id: 'LIST' },
            ]
          : [{ type: 'Application', id: 'LIST' }],
    }),
  }),
});

export const {
  useApplyMutation,
  useGetApplicationQuery,
  useGetApplicationsQuery,
} = applicationsApi;
