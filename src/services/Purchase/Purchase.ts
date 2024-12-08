import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BACKEND_URL =   process.env.NEXT_PUBLIC_BACKEND_URL;


export const purchaseApi = createApi({
    reducerPath: 'totalPurchaseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BACKEND_URL}/v2/Purchase/`,
        credentials: 'include', 
    }),
    tagTypes: ['Purchases'],  
    endpoints: (builder) => ({
        getAllPurchases:builder.query<any, { pageNumber: number; pageSize: number }>({
            query: ({ pageNumber, pageSize }) => ({
                url: "",
                method: "GET",
                params: { pageNumber, pageSize}
            }),
            providesTags: ['Purchases'], 
        }),
        createPurchase: builder.mutation<any, any>({
            query: (body) => ({
                url: `create-purchase`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Purchases'],  
        }),
        getPurchaseDashboard: builder.query<any, void>({
            query: () => ({
                url: `dashboard/top-purchases`,
                method: 'GET',
            }),
        }),
        getPurchaseTotalAmount: builder.query<any, void>({
            query: () => ({
                url: `dashboard/total-amount`,
                method: 'GET',
            }),
        }),
        getPurchaseDashBoardLossOverview: builder.query<any, void>({
            query: () => ({
                url: `dashboard/lossoverview`,
                method: 'GET',
            }),
        }),
        getPurchaseById: builder.query<any, number>({
            query: (purchaseId) => ({
                url: `${purchaseId}`,
                method: 'GET',
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


export const { 
    useGetPurchaseDashBoardLossOverviewQuery,
    useGetPurchaseTotalAmountQuery,
    useCreatePurchaseMutation,
    useGetPurchaseDashboardQuery,
    useGetAllPurchasesQuery,
    useDeletePurchaseMutation,
    useGetPurchaseByIdQuery
} = purchaseApi;