import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BACKEND_URL =   "https://invenshopfy-backend-gqfwethzeggegqdv.westeurope-01.azurewebsites.net";


export const supplierApi = createApi({
    reducerPath: 'supplierApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BACKEND_URL}/v2/people/`,
        credentials: 'include',
    }),
    tagTypes: ['Suppliers'],  
    endpoints: (builder) => ({
        getAllSuppliers: builder.query<any, { pageNumber: number; pageSize: number }>({
            query: ({ pageNumber, pageSize }) => ({
                url: `Supplier`,
                method: "GET",
                params: { pageNumber, pageSize}
            }),
            providesTags: ['Suppliers'], 
        }),
        getSuppliersName: builder.query<any, { pageNumber: number; pageSize: number }>({
            query: ({ pageNumber, pageSize }) => ({
                url: `Supplier/suppliers/name`,
                method: "GET",
                params: { pageNumber, pageSize}
            }),
            providesTags: ['Suppliers'], 
        }),
        addSupplier: builder.mutation<any, any>({
            query: (body) => ({
                url: `Supplier`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Suppliers'],  
        }),
        getTopSuppliersDasgboard: builder.query<any, void>({
            query: () => ({
                url: `/Supplier/dashboard/top-suppliers`,
                method: 'GET',
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
export const { 
    useGetAllSuppliersQuery, 
    useAddSupplierMutation, 
    useDeleteSupplierMutation, 
    useGetSuppliersNameQuery,
    useGetTopSuppliersDasgboardQuery
} = supplierApi;