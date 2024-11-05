import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const purchaseReturnApi = createApi({
    reducerPath: 'PurchaseReturnApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BACKEND_URL}/v2/PurchasesReturn/`,
        credentials: 'include', 
    }),
    endpoints: (builder) => ({
        getPurchaseReturnByName:builder.query<any, string>({
            query: (number) => ({
                url: `by-return/${encodeURIComponent(number)}`,
            }),
        }),
        createPurchaseReturn: builder.mutation<any, any>({
            query: (body) => ({
                url: `create-purchasereturn`,
                method: 'POST',
                body,
            }),
        }),
        getAllPurchaseReturn:builder.query<any, { pageNumber: number; pageSize: number }>({
            query: ({ pageNumber, pageSize }) => ({
                url: "",
                method: "GET",
                params: { pageNumber, pageSize}
            }),
        }),
        deletePurchaseReturn: builder.mutation<any, number>({
            query: (id) => ({
                url: `${id}`,
                method: 'DELETE',
            }),
        }),
    }),
    
});


export const { useGetAllPurchaseReturnQuery, useCreatePurchaseReturnMutation, useGetPurchaseReturnByNameQuery, useDeletePurchaseReturnMutation } = purchaseReturnApi;