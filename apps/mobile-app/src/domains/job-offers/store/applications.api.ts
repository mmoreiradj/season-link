import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import baseQueryConfig from 'common/helpers/base-query-fn';
import { Application, ApplicationState } from '../types/applications.type';
import JobOfferType from '../types/job-offer.type';

export const APPLICATIONS_API_REDUCER_KEY = 'applicationsApi';

export const applicationsApi = createApi({
  reducerPath: APPLICATIONS_API_REDUCER_KEY,
  tagTypes: ['Application', 'ExecutedJobOffer'],
  baseQuery: fetchBaseQuery(baseQueryConfig),
  endpoints: (builder) => ({
    apply: builder.mutation<Application, string>({
      query: (id: string) => ({
        url: `job-offers/${id}/applications`,
        method: 'POST',
      }),
      invalidatesTags: ['Application', 'ExecutedJobOffer'],
    }),

    getApplication: builder.query<Application, string>({
      query: (id: string) => `applications/${id}`,
      providesTags: (result) =>
        result ? [{ type: 'Application', id: result.id }] : ['Application'],
    }),

    getApplications: builder.query<Application[], void>({
      query: () => 'applications',
      providesTags: (result) => ['Application'],
    }),

    getExecutedJobOffers: builder.query<JobOfferType[], void>({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        let applications: Application[] | undefined = (
          await fetchWithBQ('applications')
        )?.data as Application[];

        // TODO handle errors !
        if (!applications) {
          return { data: [] };
        }

        applications = applications?.filter?.(
          (app) => app.state == ApplicationState.APPROVED
        );

        const jobOffers: JobOfferType[] = await Promise.all(
          applications.map(async (application) => {
            const jobOffer = await fetchWithBQ(
              `job-offers/${application.jobOfferId}`
            );
            return jobOffer.data as JobOfferType;
          })
        );

        return { data: jobOffers };
      },

      providesTags: ['ExecutedJobOffer'],
    }),
  }),
});

export const {
  useApplyMutation,
  useGetApplicationQuery,
  useGetApplicationsQuery,
  useGetExecutedJobOffersQuery,
} = applicationsApi;
