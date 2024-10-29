import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;


export const supplierApi = createApi({
    reducerPath: 'supplierApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BACKEND_URL}/v2/people`,
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        getAllSuppliers: builder.query<any, { pageNumber: number; pageSize: number }>({
            query: ({ pageNumber, pageSize }) => ({
                url: `Supplier`,
                method: "GET",
                params: { pageNumber, pageSize}
            }),
        }),
        addSupplier: builder.mutation<any, any>({
            query: (body) => ({
                url: `Supplier`,
                method: 'POST',
                body,
            }),
        }),
        deleteSupplier: builder.mutation<any, number>({
            query: (id) => ({
                url: `Supplier/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

// Export auto-generated hooks for functional components
export const { useGetAllSuppliersQuery, useAddSupplierMutation, useDeleteSupplierMutation } = supplierApi;