import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BACKEND_URL =   "https://invenshopfy-backend-gqfwethzeggegqdv.westeurope-01.azurewebsites.net";

export const productsCategoryApi = createApi({
    reducerPath: 'productsCategoryApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BACKEND_URL}/v2/products/`,
        credentials: 'include',
    }),
    endpoints: (builder) => ({
            getAllProductsCategory: builder.query<any, { pageNumber: number; pageSize: number }>({
                query: ({ pageNumber, pageSize })=> ({
                url:'ProductCategory',
                params: { pageNumber, pageSize },
            }),
        }),
        getProductById: builder.query<any, number> ({
            query:(id) => `ProductCategory/${id}`
        }),
        addCategory: builder.mutation<any, any>({
            query: (body) => ({
                url: `ProductCategory`,
                method: 'POST',
                body,
            }),
        }),
        deleteCategory: builder.mutation<any, number>({
            query: (id) => ({
                url: `ProductCategory/${id}`,
                method: 'DELETE',
            }),
        })
    }),
});

export const { useGetAllProductsCategoryQuery, useGetProductByIdQuery, useAddCategoryMutation, useDeleteCategoryMutation } = productsCategoryApi;