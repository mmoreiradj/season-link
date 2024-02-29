import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import baseQueryConfig from 'common/helpers/base-query-fn';
import JobOfferType from '../types/job-offer.type';
import Advantage from '../types/advantage.type';
import { Application } from '../types/applications.type';

export const JOB_OFFERS_API_REDUCER_KEY = 'jobOffersApi';

export const jobOffersApi = createApi({
  reducerPath: JOB_OFFERS_API_REDUCER_KEY,
  tagTypes: ['JobOffer', 'Advantage'],
  baseQuery: fetchBaseQuery(baseQueryConfig),
  endpoints: (builder) => ({
    getJobOffers: builder.query<JobOfferType[], string | undefined>({
      query: (jobId) => {
        if (jobId) {
          return {
            url: '/recommendations',
            params: {
              jobId: jobId,
            },
          };
        } else {
          return `/job-offers`;
        }
      },

      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'JobOffer', id }) as const),
              { type: 'JobOffer', id: 'LIST' },
            ]
          : [{ type: 'JobOffer', id: 'LIST' }],
    }),

    getJobOfferAdvantages: builder.query<Advantage[], string>({
      query: (jobOfferId) => `/job-offers/${jobOfferId}/advantages`,
      providesTags: (result, error, jobOfferId) =>
        result
          ? [
              { type: 'Advantage', id: jobOfferId },
              { type: 'Advantage', id: 'LIST' },
            ]
          : [{ type: 'Advantage', id: 'LIST' }],
    }),

    getJobOffer: builder.query<JobOfferType, string>({
      query: (id) => `/job-offers/${id}`,
      providesTags: (result, error, id) =>
        result ? [{ type: 'JobOffer', id }] : [],
    }),
  }),
});

export const {
  useGetJobOffersQuery,
  useGetJobOfferAdvantagesQuery,
  useGetJobOfferQuery,
} = jobOffersApi;
