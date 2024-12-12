import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BACKEND_URL =   "https://invenshopfy-backend-gqfwethzeggegqdv.westeurope-01.azurewebsites.net";

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
        getDeletedMessages: builder.query<any, { pageNumber: number; pageSize: number }>({
            query: ({ pageNumber, pageSize })=> ({
                url: '/messages-trash',
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
        getTotalAmountOftrashMessages: builder.query<any, void>({
            query: ()=> ({
                url: '/trash-messages-amount',
            }),
            providesTags: ['Messages']
        }),
        getTotalAmountOfImportantMessages: builder.query<any, void>({
            query: ()=> ({
                url: '/important-messages-amount',
            }),
            providesTags: ['Messages']
        }),
        getLastFiveInboxMessages: builder.query<any, void>({
            query: ()=> ({
                url: '/lastfive-messages-inbox',
            }),
            providesTags: ['Messages']
        }),
        updateMessageImportancy: builder.mutation<any, number>({
            query: (id) => ({
              url: `important-message/${id}`,  
              method: 'PUT',
              body: {id: id},
            }),
            invalidatesTags: ['Messages'],
        }),
        deleteMessage: builder.mutation<any, number>({
            query: (id) => ({
              url: `trash-message/${id}`,  
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
    }),
});

export const {
    useGetLastFiveInboxMessagesQuery,
    useGetTotalAmountOftrashMessagesQuery,
    useGetDeletedMessagesQuery,
    useGetTotalAmountOfImportantMessagesQuery,
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