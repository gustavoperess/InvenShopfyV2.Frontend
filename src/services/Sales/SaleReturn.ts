import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const salesReturnApi = createApi({
    reducerPath: 'SalesReturnApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BACKEND_URL}/v2/SalesReturn/`,
        credentials: 'include', 
    }),
    endpoints: (builder) => ({
        getSalesReturnByName:builder.query<any, string>({
            query: (number) => ({
                url: `by-return/${encodeURIComponent(number)}`,
            }),
        }),
        createSaleReturn: builder.mutation<any, any>({
            query: (body) => ({
                url: `create-salereturn`,
                method: 'POST',
                body,
            }),
        }),

    }),
    
});


export const { useGetSalesReturnByNameQuery, useCreateSaleReturnMutation } = salesReturnApi;