import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;


export const billerApi = createApi({
    reducerPath: 'billerApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BACKEND_URL}/v2/people`,
        credentials: 'include',
    }),
    tagTypes: ['Billers'],  
    endpoints: (builder) => ({
        getAllBillers: builder.query<any, { pageNumber: number; pageSize: number }>({
            query: ({ pageNumber, pageSize }) => ({
                url: `Biller`,
                method: "GET",
                params: { pageNumber, pageSize}
            }),
            providesTags: ['Billers'], 
        }),

        getBillerNames: builder.query<any, { pageNumber: number; pageSize: number }>({
            query: ({ pageNumber, pageSize }) => ({
                url: `Biller/billers/name`,
                method: "GET",
                params: { pageNumber, pageSize}
            }),
            providesTags: ['Billers'], 
        }),
        addBiller: builder.mutation<any, any>({
            query: (body) => ({
                url: `Biller`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Billers'],  
        }),
        deleteBiller: builder.mutation<any, number>({
            query: (id) => ({
                url: `Biller/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

// Export auto-generated hooks for functional components
export const { useGetAllBillersQuery, useAddBillerMutation, useDeleteBillerMutation, useGetBillerNamesQuery } = billerApi;