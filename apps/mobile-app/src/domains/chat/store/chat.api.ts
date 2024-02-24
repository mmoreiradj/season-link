import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ChatMessage } from '../types/message';
import baseQueryConfig from 'common/helpers/base-query-fn';
import { CreateChatMessage } from '../types/create-message.dto';

export const CHAT_API_REDUCER_KEY = 'chatApi';

export const chatApi = createApi({
  reducerPath: CHAT_API_REDUCER_KEY,
  tagTypes: ['ChatMessage'],
  baseQuery: fetchBaseQuery(baseQueryConfig),
  endpoints: (builder) => ({
    getChatMessages: builder.query<ChatMessage[], string>({
      query: (id: string) => `applications/${id}/messages`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'ChatMessage', id }) as const),
              { type: 'ChatMessage', id: 'LIST' },
            ]
          : [{ type: 'ChatMessage', id: 'LIST' }],
    }),

    createChatMessage: builder.mutation<
      ChatMessage,
      CreateChatMessage & { applicationId: string }
    >({
      query: ({ applicationId, ...message }) => ({
        url: `applications/${applicationId}/messages`,
        method: 'POST',
        body: message,
      }),
      invalidatesTags: [{ type: 'ChatMessage', id: 'LIST' }],
    }),
  }),
});

export const { useGetChatMessagesQuery, useCreateChatMessageMutation } =
  chatApi;
