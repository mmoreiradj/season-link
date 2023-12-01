import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import baseQueryConfig from 'common/helpers/base-query-fn';
import JobOfferType from '../types/job-offer.type';
import Advantage from '../types/advantage.type';

export const JOB_OFFERS_API_REDUCER_KEY = 'jobOffersApi';

export const jobOffersApi = createApi({
  reducerPath: JOB_OFFERS_API_REDUCER_KEY,
  baseQuery: fetchBaseQuery(baseQueryConfig),
  endpoints: (builder) => ({
    getJobOffers: builder.query<JobOfferType[], void>({
      query: () => `/job-offers`,
    }),
    getJobOfferAdvantages: builder.query<Advantage[], string>({
      query: (jobOfferId) => `/job-offers/${jobOfferId}/advantages`,
    }),
  }),
});

export const { useGetJobOffersQuery, useGetJobOfferAdvantagesQuery } =
  jobOffersApi;
