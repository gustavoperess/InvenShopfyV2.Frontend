import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BACKEND_URL =  process.env.NEXT_PUBLIC_BACKEND_UR;


export const salesPaymentApi = createApi({
    reducerPath: 'salesPayment',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BACKEND_URL}/v2/SalesPayment/`,
        credentials: 'include',
    }),
    tagTypes: ['salesPayment'],  
    endpoints: (builder) => ({
        AddSalesPayment: builder.mutation<any, any>({
            query: (body) => ({
                url: ``,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['salesPayment']
        }),
        getSalesPaymentById: builder.query<any, number>({
            query: (salesPaymentId) => ({
                url: `/${salesPaymentId}`,
                method: 'GET',
            }),
        }),

        getSalesPaymentForViewPaymentById: builder.query<any, number>({
            query: (salesPaymentId) => ({
                url: `view-payment/${salesPaymentId}`,
                method: 'GET',
            }),
        }),

    }),
});

// Export auto-generated hooks for functional components
export const { 
    useGetSalesPaymentForViewPaymentByIdQuery,
    useGetSalesPaymentByIdQuery,
    useAddSalesPaymentMutation,
} = salesPaymentApi;