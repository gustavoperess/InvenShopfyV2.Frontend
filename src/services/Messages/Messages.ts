import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const messagesApi = createApi({
    reducerPath: 'messagesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BACKEND_URL}/v2/Message`,
        credentials: 'include',
    }),
    endpoints: (builder) => ({
            getAllMessages: builder.query<any, { pageNumber: number; pageSize: number }>({
            query: ({ pageNumber, pageSize })=> ({
                url: '',
                params: { pageNumber, pageSize }
            })
        }),
        createMessage: builder.mutation<any, any>({
            query: (body) => ({
                url: `/new-message`,
                method: 'POST',
                body,
            }),
        }),
        deleteMessage: builder.mutation<any, number>({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
        })
    }),
});

export const { useCreateMessageMutation, useDeleteMessageMutation, useGetAllMessagesQuery } = messagesApi;