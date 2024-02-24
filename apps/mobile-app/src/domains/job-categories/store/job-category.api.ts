import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import baseQueryConfig from 'common/helpers/base-query-fn';
import JobCategoryType from '../types/job-category.type';
import JobType from 'domains/job-offers/types/job.type';

export const JOB_CATEGORIES_API_REDUCER_KEY = 'jobCategoriesApi';

export const jobCategoriesApi = createApi({
  reducerPath: JOB_CATEGORIES_API_REDUCER_KEY,
  tagTypes: ['JobCategory'],
  baseQuery: fetchBaseQuery(baseQueryConfig),
  endpoints: (builder) => ({
    getJobCategories: builder.query<JobCategoryType[], void>({
      query: () => `/job-categories`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'JobCategory', id }) as const),
              { type: 'JobCategory', id: 'LIST' },
            ]
          : [{ type: 'JobCategory', id: 'LIST' }],
    }),

    getJobCategory: builder.query<JobCategoryType, string>({
      query: (id: string) => `/job-categories/${id}`,
      providesTags: (result) =>
        result ? [{ type: 'JobCategory', id: result.id }] : [],
    }),

    getJobsFromCategory: builder.query<JobType[], string>({
      query: (id: string) => `/job-categories/${id}/jobs`,
    }),
  }),
});

export const {
  useGetJobCategoriesQuery,
  useGetJobsFromCategoryQuery,
  useGetJobCategoryQuery,
} = jobCategoriesApi;
