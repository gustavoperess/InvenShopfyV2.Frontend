import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;


export const customerApi = createApi({
    reducerPath: 'customerApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BACKEND_URL}/v2/people`,
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        getAllCustomers: builder.query<any, { pageNumber: number }>({
            query: ({ pageNumber }) => ({
                url: 'Customer',
                method: 'GET',
                params: { pageNumber },
            }),
        }),
    }),
});

// Export auto-generated hooks for functional components
export const { useGetAllCustomersQuery } = customerApi;