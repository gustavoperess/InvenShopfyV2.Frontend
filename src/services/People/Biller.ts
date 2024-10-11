import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;


export const billerApi = createApi({
    reducerPath: 'billerApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BACKEND_URL}/v2/people`,
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        getAllBillers: builder.query<any, number>({
            query: (pageNumber) => ({
                url: `Biller`,
                params: { pageNumber },
            }),
        }),
    }),
});

// Export auto-generated hooks for functional components
export const { useGetAllBillersQuery } = billerApi;