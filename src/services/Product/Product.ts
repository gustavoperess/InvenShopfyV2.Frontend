import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;


export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BACKEND_URL}/v2/products`,
        credentials: 'include',
    }),
    tagTypes: ['Products'],  
    endpoints: (builder) => ({
            getAllProducts: builder.query<any, { pageNumber: number; pageSize: number }>({
            query: ({ pageNumber, pageSize }) => ({
                url: `Product`,
                params: { pageNumber, pageSize },
            }),
            providesTags: ['Products'], 
        }),
        addProduct: builder.mutation<any, any>({
            query: (body) => ({
                url: `Product`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Products']
        }),
        deleteProduct: builder.mutation<any, number>({
            query: (id) => ({
                url: `Product/${id}`,
                method: 'DELETE',
            }),
        }),
        getProductByName: builder.query<any, string>({
            query: (title) => ({
                url: `Product/by-name/${encodeURIComponent(title)}`,
            })
        }),
    }),
});

// Export auto-generated hooks for functional components
export const { useGetAllProductsQuery, useAddProductMutation, useDeleteProductMutation, useGetProductByNameQuery } = productsApi;