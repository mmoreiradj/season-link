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
  tagTypes: ['Experience', 'Reference', 'Candidate'],
  baseQuery: fetchBaseQuery({ ...baseQueryConfig, responseHandler: undefined }),
  endpoints: (builder) => ({
    createCandidate: builder.mutation<CandidateType, CreateCandidateType>({
      query: (body) => ({
        url: '/profiles/user',
        method: 'POST',
        body,
      }),
    }),

    updateCandidate: builder.mutation<CandidateType, CandidateType>({
      query: (body) => ({
        url: '/profiles/user/me',
        method: 'POST',
        body,
      }),
    }),

    // TODO get the picture of the candidate !
    //getCandidatePicture: builder.query<()

    getCandidate: builder.query<CandidateType, void>({
      query: () => `/profiles/user/me`,
    }),

    //TODO get cv !
    //getCV: builder
    uploadCV: builder.mutation({
      query: (body) => ({
        url: '/profiles/user/me/cv',
        method: 'POST',
        body,
        FormData: true,
      }),
    }),

    // References section
    getReferences: builder.query<ReferenceType[], void>({
      query: () => `/profiles/user/me/references`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Reference', id }) as const),
              { type: 'Reference', id: 'LIST' },
            ]
          : [{ type: 'Reference', id: 'LIST' }],
    }),

    createReference: builder.mutation<ReferenceType, ReferenceType>({
      query: (body) => ({
        url: '/profiles/references',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Reference', id: 'LIST' }],
    }),

    updateReference: builder.mutation<ReferenceType, ReferenceType>({
      query: (body) => ({
        url: `/profiles/reference/${body.id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result, error, body) => [
        { type: 'Reference', id: body.id },
      ],
    }),

    deleteReference: builder.mutation<void, string>({
      query: (id) => ({
        url: `/profiles/reference/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Reference', id }],
    }),

    // Experience section
    getExperiences: builder.query<ExperienceType[], void>({
      query: () => `/profiles/user/me/experiences`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Experience', id }) as const),
              { type: 'Experience', id: 'LIST' },
            ]
          : [{ type: 'Experience', id: 'LIST' }],
    }),

    createExperience: builder.mutation<ExperienceType, ExperienceType>({
      query: (body) => ({
        url: '/profiles/experiences',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Experience', id: 'LIST' }],
    }),

    updateExperience: builder.mutation<ExperienceType, ExperienceType>({
      query: (body) => ({
        url: `/profiles/experience/${body.id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result, error, body) => [
        { type: 'Experience', id: body.id },
      ],
    }),

    deleteExperience: builder.mutation<void, string>({
      query: (id) => ({
        url: `/profiles/experience/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Experience', id }],
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
