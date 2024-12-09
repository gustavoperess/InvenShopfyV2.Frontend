import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BACKEND_URL =   process.env.NEXT_PUBLIC_BACKEND_URL;

export const productsUnitApi = createApi({
    reducerPath: 'productsUnitApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BACKEND_URL}/v2/products/`,
        credentials: 'include',
    }),
    endpoints: (builder) => ({
            getAllProductsUnit: builder.query<any, { pageNumber: number; pageSize: number }>({
            query: ({ pageNumber, pageSize })=> ({
                url: 'Units',
                params: { pageNumber, pageSize }
            })
        }),
        addUnit: builder.mutation<any, any>({
            query: (body) => ({
                url: `Units`,
                method: 'POST',
                body,
            }),
        }),
        deleteUnit: builder.mutation<any, number>({
            query: (id) => ({
                url: `Units/${id}`,
                method: 'DELETE',
            }),
        })
    }),
});

export const { useGetAllProductsUnitQuery, useAddUnitMutation, useDeleteUnitMutation } = productsUnitApi;