import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import baseQueryConfig from 'common/helpers/base-query-fn';
import CompanyType from '../types/company.type';

export const COMPANIES_API_REDUCER_KEY = 'companiesApi';

export const companiesApi = createApi({
  reducerPath: COMPANIES_API_REDUCER_KEY,
  tagTypes: ['Company'],
  baseQuery: fetchBaseQuery(baseQueryConfig),
  endpoints: (builder) => ({
    getCompany: builder.query<CompanyType, string>({
      query: (id: string) => `/companies/${id}`,
      providesTags: (result, error, id) =>
        result ? [{ type: 'Company', id }] : [],
    }),

    getCompanies: builder.query<CompanyType[], void>({
      query: () => '/companies',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Company', id }) as const),
              { type: 'Company', id: 'LIST' },
            ]
          : [{ type: 'Company', id: 'LIST' }],
    }),
  }),
});

export const { useGetCompanyQuery, useGetCompaniesQuery } = companiesApi;
