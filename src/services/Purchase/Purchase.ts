import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;


export const purchaseApi = createApi({
    reducerPath: 'totalPurchaseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BACKEND_URL}/v2/Purchase/`,
        credentials: 'include', 
    }),
    endpoints: (builder) => ({
        getAllPurchases: builder.query<any, number>({
            query: (pageNumber) => ({
                url: "Purchase",
                method: "GET",
                params: { pageNumber}
            }),
        }),
        createPurchase: builder.mutation<any, any>({
            query: (body) => ({
                url: `Purchase`,
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