import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import baseQueryConfig from 'common/helpers/base-query-fn';
import JobType from '../types/job.type';

export const JOBS_API_REDUCER_KEY = 'jobsApi';

export const jobsApi = createApi({
  reducerPath: JOBS_API_REDUCER_KEY,
  baseQuery: fetchBaseQuery(baseQueryConfig),
  endpoints: (builder) => ({
    getJob: builder.query<JobType, string>({
      query: (id: string) => `/jobs/${id}`,
    }),
  }),
});

export const { useGetJobQuery } = jobsApi;
