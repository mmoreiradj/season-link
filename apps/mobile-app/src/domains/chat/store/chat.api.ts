import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ChatMessage } from '../types/message';
import baseQueryConfig from 'common/helpers/base-query-fn';
import { CreateChatMessage } from '../types/create-message.dto';
import { Application } from 'domains/job-offers/types/applications.type';
import AuthService from 'domains/auth/services/auth.service';

export const CHAT_API_REDUCER_KEY = 'chatApi';

export const chatApi = createApi({
  reducerPath: CHAT_API_REDUCER_KEY,
  tagTypes: ['ChatMessage', 'ChatMessageCount'],
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

    // Probably the worst endpoint known to man.
    getTotalRecruiterMessageCount: builder.query<number, void>({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const token = await AuthService.getDecodedToken();

        let getTotalMessageCount = 0;

        // First you query all
        const applications = (await fetchWithBQ('applications'))
          .data as Application[];

        await Promise.all(
          applications?.map?.(async (application) => {
            const messages = (
              (await fetchWithBQ(`applications/${application.id}/messages`))
                .data as ChatMessage[]
            )?.filter?.((message) => message.authorId !== token?.sub)?.length;

            getTotalMessageCount += messages;
          })
        );

        return { data: getTotalMessageCount };
      },
      providesTags: ['ChatMessageCount'],
    }),
  }),
});

export const {
  useGetChatMessagesQuery,
  useCreateChatMessageMutation,
  useGetTotalRecruiterMessageCountQuery,
} = chatApi;
