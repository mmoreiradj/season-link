import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import baseQueryConfig from 'common/helpers/base-query-fn';
import JobCategoryType from '../types/job-category.type';
import JobType from 'domains/job-offers/types/job.type';

export const JOB_CATEGORIES_API_REDUCER_KEY = 'jobCategoriesApi';

export const jobCategoriesApi = createApi({
  reducerPath: JOB_CATEGORIES_API_REDUCER_KEY,
  baseQuery: fetchBaseQuery(baseQueryConfig),
  endpoints: (builder) => ({
    getJobCategories: builder.query<JobCategoryType[], void>({
      query: () => `/job-categories`,
    }),

    getJobsFromCategory: builder.query<JobType[], string>({
      query: (id: string) => `/job-categories/${id}/jobs`,
    }),
  }),
});

export const { useGetJobCategoriesQuery, useGetJobsFromCategoryQuery } =
  jobCategoriesApi;