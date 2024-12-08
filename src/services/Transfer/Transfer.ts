import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BACKEND_URL =   process.env.NEXT_PUBLIC_BACKEND_URL;

export const transfersApi = createApi({
    reducerPath: 'TransferApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BACKEND_URL}/v2/Transfer/`,
        credentials: 'include', 
    }),
    tagTypes: ['Transfer'],  
    endpoints: (builder) => ({
        getAllTransfers:builder.query<any, { pageNumber: number; pageSize: number }>({
            query: ({ pageNumber, pageSize }) => ({
                url: "alltransfer",
                method: "GET",
                params: { pageNumber, pageSize}
            }),
            providesTags: ['Transfer'], 
        }),
        deleteTransfer: builder.mutation<any, number>({
            query: (id) => ({
                url: `${id}`,
                method: 'DELETE',
            }),
        }),
        createTransfer: builder.mutation<any, any>({
            query: (body) => ({
                url: `create-transfer`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Transfer'],  
        }),
        getTransferById: builder.query<any, number>({
            query: (transferId) => ({
                url: ``,
                method: 'GET',
            }),
        }),
       
    }),
    
});


export const { useCreateTransferMutation, useDeleteTransferMutation, useGetAllTransfersQuery } = transfersApi;