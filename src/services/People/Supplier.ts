import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;


export const supplierApi = createApi({
    reducerPath: 'supplierApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BACKEND_URL}/v2/people`,
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        getAllSuppliers: builder.query<any, number>({
            query: (pageNumber) => ({
                url: `Supplier`,
                params: { pageNumber },
            }),
        }),
    }),
});

// Export auto-generated hooks for functional components
export const { useGetAllSuppliersQuery } = supplierApi;