import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const messagesApi = createApi({
    reducerPath: 'messagesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BACKEND_URL}/v2/Message`,
        credentials: 'include',
    }),
    tagTypes: ['Messages'],  
    endpoints: (builder) => ({
            getAllMessages: builder.query<any, { pageNumber: number; pageSize: number }>({
            query: ({ pageNumber, pageSize })=> ({
                url: '',
                params: { pageNumber, pageSize }
            }),
            providesTags: ['Messages'], 
        }),
        getSentMessages: builder.query<any, { pageNumber: number; pageSize: number }>({
            query: ({ pageNumber, pageSize })=> ({
                url: '/messages-sent',
                params: { pageNumber, pageSize }
            }),
            providesTags: ['Messages']
        }),
        getMessagesInbox: builder.query<any, { pageNumber: number; pageSize: number }>({
            query: ({ pageNumber, pageSize })=> ({
                url: '/messages-inbox',
                params: { pageNumber, pageSize }
            }),
            providesTags: ['Messages']
        }),
        getImportantMessages: builder.query<any, { pageNumber: number; pageSize: number }>({
            query: ({ pageNumber, pageSize })=> ({
                url: '/messages-important',
                params: { pageNumber, pageSize }
            }),
            providesTags: ['Messages']
        }),
        getTotalAmountOfSentMessages: builder.query<any, void>({
            query: ()=> ({
                url: '/sent-messages-amount',
            }),
            providesTags: ['Messages']
        }),
        getTotalAmountOfInboxMessages: builder.query<any, void>({
            query: ()=> ({
                url: '/inbox-messages-amount',
            }),
            providesTags: ['Messages']
        }),
        updateMessageImportancy: builder.mutation<any, number>({
            query: (id) => ({
              url: `message/${id}`,  
              method: 'PUT',
              body: {id: id},
            }),
            invalidatesTags: ['Messages'],
          }),
        createMessage: builder.mutation<any, any>({
            query: (body) => ({
                url: `/new-message`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Messages']
        }),
        deleteMessage: builder.mutation<any, number>({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Messages']
        })
    }),
});

export const {
    useGetTotalAmountOfInboxMessagesQuery,
    useGetTotalAmountOfSentMessagesQuery,
    useUpdateMessageImportancyMutation,
    useGetImportantMessagesQuery,
    useGetMessagesInboxQuery,
    useGetSentMessagesQuery,
    useCreateMessageMutation, 
    useDeleteMessageMutation, 
    useGetAllMessagesQuery } 
    = messagesApi;