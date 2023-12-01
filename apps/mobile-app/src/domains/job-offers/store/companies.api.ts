import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import baseQueryConfig from 'common/helpers/base-query-fn';
import CompanyType from '../types/company.type';

export const COMPANIES_API_REDUCER_KEY = 'companiesApi';

export const companiesApi = createApi({
  reducerPath: COMPANIES_API_REDUCER_KEY,
  baseQuery: fetchBaseQuery(baseQueryConfig),
  endpoints: (builder) => ({
    getCompany: builder.query<CompanyType, string>({
      query: (id: string) => `/companies/${id}`,
    }),
  }),
});

export const { useGetCompanyQuery } = companiesApi;
