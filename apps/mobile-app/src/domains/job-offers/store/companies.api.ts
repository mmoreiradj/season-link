import {
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import baseQueryConfig from 'common/helpers/base-query-fn';
import CompanyType from '../types/company.type';
import { CompanyRating } from '../types/company-rating';
import { CreateRatingDto } from '../types/create-company-rating';
import AuthService from 'domains/auth/services/auth.service';

export const COMPANIES_API_REDUCER_KEY = 'companiesApi';

export const companiesApi = createApi({
  reducerPath: COMPANIES_API_REDUCER_KEY,
  // Perhaps a new tag key is not needed, but it separates my endpoint re-fetch
  tagTypes: ['Company', 'CompanyRating', 'CompanyRatingState'],
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

    getCompanyRatings: builder.query<CompanyRating[], string>({
      query: (id) => `/companies/${id}/ratings`,
      providesTags: (result, error, id) =>
        result
          ? [
              ...result.map(
                ({ id }) => ({ type: 'CompanyRating', id }) as const
              ),
            ]
          : [{ type: 'CompanyRating', id }],
    }),

    getIsCompanyRated: builder.query<boolean, string>({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const ratingsRequest = await fetchWithBQ(`/companies/${_arg}/ratings`);
        if (ratingsRequest.error) {
          return { error: ratingsRequest.error as FetchBaseQueryError };
        }

        const ratings = ratingsRequest.data as CompanyRating[];
        if (!ratings || !ratings.length) {
          return { data: false };
        }

        const candidateId = (await AuthService.getDecodedToken())?.sub;
        console.log({ candidateId, ratings });
        return {
          data: ratings.some((rating) => rating.candidateId === candidateId),
        };
      },
      providesTags: (result, error, id) => [{ type: 'CompanyRatingState', id }],
    }),

    rateCompany: builder.mutation<
      CompanyRating,
      CreateRatingDto & { companyId: string }
    >({
      query: ({ companyId, ...rating }) => ({
        url: `/companies/${companyId}/ratings`,
        method: 'POST',
        body: rating,
      }),
      invalidatesTags: (result, error, { companyId }) => [
        { type: 'CompanyRating', id: companyId },
        { type: 'CompanyRatingState', id: companyId },
      ],
    }),
  }),
});

export const {
  useGetCompanyQuery,
  useGetCompaniesQuery,
  useGetIsCompanyRatedQuery,
  useRateCompanyMutation,
} = companiesApi;
