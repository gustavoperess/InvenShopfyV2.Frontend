import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// export const salesApi = createApi({
//     reducerPath: 'salesApi',
//     baseQuery: fetchBaseQuery({
//         baseUrl: `${BACKEND_URL}/v2/products`,
//         credentials: 'include',  
//     }),
//     endpoints: (builder) => ({
//         getAllSales: builder.query<any, void>({
//             query: () => 'Sales',
//         }),
//     }),
// });

export const salesApi = createApi({
    reducerPath: 'totalExpenseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BACKEND_URL}/v2/Sale/`,
        credentials: 'include', 
    }),
    endpoints: (builder) => ({
        getTotalSalesAmount: builder.query<any, void>({
            query: () => 'Sale/totalamount',
        }),
        getAllSales: builder.query<any, number>({
            query: (pageNumber) => ({
                url: "Sale/allsales",
                method: "GET",
                params: { pageNumber}
            }),
        }),
        deleteSale: builder.mutation<any, number>({
            query: (id) => ({
                url: `Sale/${id}`,
                method: 'DELETE',
            }),
        }),
        createSale: builder.mutation<any, any>({
            query: (body) => ({
                url: `Sale`,
                method: 'POST',
                body,
            }),
        }),
        getBestSeller: builder.query<any, void>({
            query: () => "Sale/productmostsold"
        })
    }),
});


export const { useGetTotalSalesAmountQuery, useCreateSaleMutation, useGetAllSalesQuery, useDeleteSaleMutation, useGetBestSellerQuery } = salesApi;