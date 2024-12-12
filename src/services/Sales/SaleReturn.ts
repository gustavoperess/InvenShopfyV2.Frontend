import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BACKEND_URL =   "https://invenshopfy-backend-gqfwethzeggegqdv.westeurope-01.azurewebsites.net/";

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
        getAllSalesReturn:builder.query<any, { pageNumber: number; pageSize: number }>({
            query: ({ pageNumber, pageSize }) => ({
                url: "",
                method: "GET",
                params: { pageNumber, pageSize}
            }),
        }),
        getSalesReturnDashBoard: builder.query<any, void>({
            query: () => ({
                url: `dashboard/top-returns`,
                method: 'GET',
            }),
        }),
        getSalesReturnById: builder.query<any, number>({
            query: (returnId) => ({
                url: `${returnId}`,
                method: 'GET',
            }),
        }),
        getSalesReturnTotalAmount: builder.query<any, void>({
            query: () => ({
                url: `dashboard/total-sold-returned`,
                method: 'GET',
            }),
        }),
        deleteSalesReturn: builder.mutation<any, number>({
            query: (id) => ({
                url: `${id}`,
                method: 'DELETE',
            }),
        }),
    }),
    
});


export const { 
    useGetSalesReturnByIdQuery,
    useGetSalesReturnByNameQuery,
    useCreateSaleReturnMutation,
    useGetAllSalesReturnQuery,
    useDeleteSalesReturnMutation,
    useGetSalesReturnDashBoardQuery,
    useGetSalesReturnTotalAmountQuery
} = salesReturnApi;