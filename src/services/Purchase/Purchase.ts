import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;


export const purchaseApi = createApi({
    reducerPath: 'totalPurchaseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BACKEND_URL}/v2/Purchase/`,
        credentials: 'include', 
    }),
    endpoints: (builder) => ({
        getAllPurchases: builder.query<any, number>({
            query: (pageNumber) => ({
                url: "allpurchases",
                method: "GET",
                params: { pageNumber}
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