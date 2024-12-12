import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BACKEND_URL =   "https://invenshopfy-backend-gqfwethzeggegqdv.westeurope-01.azurewebsites.net";


export const customerApi = createApi({
    reducerPath: 'customerApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BACKEND_URL}/v2/people/`,
        credentials: 'include',
    }),
    tagTypes: ['Customers'],  
    endpoints: (builder) => ({
        getAllCustomers: builder.query<any, { pageNumber: number; pageSize: number }>({
            query: ({ pageNumber, pageSize }) => ({
                url: `Customer`,
                method: "GET",
                params: { pageNumber, pageSize}
            }),
            providesTags: ['Customers'], 
        }),

        getCustomerNames: builder.query<any, { pageNumber: number; pageSize: number }>({
            query: ({ pageNumber, pageSize }) => ({
                url: `Customer/customers/name`,
                method: "GET",
                params: { pageNumber, pageSize}
            }),
            providesTags: ['Customers'], 
        }),
        addCustomer: builder.mutation<any, any>({
            query: (body) => ({
                url: `Customer`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Customers'],  
        }),
        deleteCustomer: builder.mutation<any, number>({
            query: (id) => ({
                url: `Customer/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

// Export auto-generated hooks for functional components
export const { useGetAllCustomersQuery, useAddCustomerMutation, useDeleteCustomerMutation, useGetCustomerNamesQuery } = customerApi;