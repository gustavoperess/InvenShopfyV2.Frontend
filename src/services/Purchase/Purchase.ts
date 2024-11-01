import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;


export const purchaseApi = createApi({
    reducerPath: 'totalPurchaseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BACKEND_URL}/v2/Purchase/`,
        credentials: 'include', 
    }),
    endpoints: (builder) => ({
        getAllPurchases:builder.query<any, { pageNumber: number; pageSize: number }>({
            query: ({ pageNumber, pageSize }) => ({
                url: "",
                method: "GET",
                params: { pageNumber, pageSize}
            }),
        }),
        createPurchase: builder.mutation<any, any>({
            query: (body) => ({
                url: `create-purchase`,
                method: 'POST',
                body,
            }),
        }),
        deletePurchase: builder.mutation<any, number>({
            query: (id) => ({
                url: `Purchase/${id}`,
                method: 'DELETE',
            }),
        }),
    })
});


export const { useCreatePurchaseMutation, useGetAllPurchasesQuery, useDeletePurchaseMutation } = purchaseApi;