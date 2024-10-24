import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const productsBrandApi = createApi({
    reducerPath: 'productsBrandApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BACKEND_URL}/v2/products/`,
        credentials: 'include',
    }),
    endpoints: (builder) => ({
            getAllProductsBrand: builder.query<any, { pageNumber: number; pageSize: number }>({
            query: ({ pageNumber, pageSize })=> ({
                url: 'Brands',
                params: { pageNumber, pageSize}
            }),
        }),
        addBrand: builder.mutation<any, any>({
            query: (body) => ({
                url: `Brands`,
                method: 'POST',
                body,
            }),
        }),
        deleteBrand: builder.mutation<any, number>({
            query: (id) => ({
                url: `Brands/${id}`,
                method: 'DELETE',
            }),
        })
    }),
});

export const { useGetAllProductsBrandQuery, useAddBrandMutation, useDeleteBrandMutation } = productsBrandApi;