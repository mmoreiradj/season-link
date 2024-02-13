import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import baseQueryConfig from 'common/helpers/base-query-fn';
import CandidateType from '../types/candidate';
import CreateCandidateType from '../types/create-candidate';
import { tr } from 'react-native-paper-dates';
import ReferenceType from '../types/reference';
import ExperienceType from '../types/experience';

export const PROFILES_API_REDUCER_KEY = 'profileApi';

export const profilesApi = createApi({
  reducerPath: PROFILES_API_REDUCER_KEY,
  baseQuery: fetchBaseQuery({ ...baseQueryConfig, responseHandler: undefined }),
  endpoints: (builder) => ({
    createCandidate: builder.mutation<CandidateType, CreateCandidateType>({
      query: (body) => ({
        url: '/user',
        method: 'POST',
        body,
      }),
    }),

    updateCandidate: builder.mutation<CandidateType, CandidateType>({
      query: (body) => ({
        url: '/user/me',
        method: 'POST',
        body,
      }),
    }),

    // TODO get the picture of the candidate !
    //getCandidatePicture: builder.query<()

    getCandidate: builder.query<CandidateType, void>({
      query: () => `/user/me`,
    }),

    //TODO get cv !
    //getCV: builder
    uploadCV: builder.mutation({
      query: (body) => ({
        url: '/user/me/cv',
        method: 'POST',
        body,
        FormData: true,
      }),
    }),

    // References section
    getReferences: builder.query<ReferenceType[], void>({
      query: () => `/user/me/references`,
    }),

    createReference: builder.mutation<ReferenceType, ReferenceType>({
      query: (body) => ({
        url: '/references',
        method: 'POST',
        body,
      }),
    }),

    updateReference: builder.mutation<ReferenceType, ReferenceType>({
      query: (body) => ({
        url: `/reference/${body.id}`,
        method: 'PUT',
        body,
      }),
    }),

    deleteReference: builder.mutation<void, string>({
      query: (id) => ({
        url: `/reference/${id}`,
        method: 'DELETE',
      }),
    }),

    // Experience section
    getExperiences: builder.query<ExperienceType, void>({
      query: () => `/user/me/experiences`,
    }),

    createExperience: builder.mutation<ExperienceType, ExperienceType>({
      query: (body) => ({
        url: '/experiences',
        method: 'POST',
        body,
      }),
    }),

    updateExperience: builder.mutation<ExperienceType, ExperienceType>({
      query: (body) => ({
        url: `/experience/${body.id}`,
        method: 'PUT',
        body,
      }),
    }),

    deleteExperience: builder.mutation<void, string>({
      query: (id) => ({
        url: `/experience/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreateCandidateMutation,
  useUpdateCandidateMutation,
  useGetCandidateQuery,
  useUploadCVMutation,
  useGetReferencesQuery,
  useCreateReferenceMutation,
  useUpdateReferenceMutation,
  useDeleteReferenceMutation,
  useGetExperiencesQuery,
  useCreateExperienceMutation,
  useUpdateExperienceMutation,
  useDeleteExperienceMutation,
} = profilesApi;
