import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const productsUnitApi = createApi({
    reducerPath: 'productsUnitApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BACKEND_URL}/v2/products/`,
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        getAllProductsUnit: builder.query<any, number>({
            query: (pageNumber) => ({
                url: 'Units',
                params: {pageNumber}
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