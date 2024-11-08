import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const salesApi = createApi({
    reducerPath: 'totalExpenseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BACKEND_URL}/v2/Sale/`,
        credentials: 'include', 
    }),
    tagTypes: ['Sales'],  
    endpoints: (builder) => ({
        getTotalSalesAmount: builder.query<any, void>({
            query: () => 'totalamount',
        }),
        getAllSales:builder.query<any, { pageNumber: number; pageSize: number }>({
            query: ({ pageNumber, pageSize }) => ({
                url: "allsales",
                method: "GET",
                params: { pageNumber, pageSize}
            }),
            providesTags: ['Sales'], 
        }),
        deleteSale: builder.mutation<any, number>({
            query: (id) => ({
                url: `${id}`,
                method: 'DELETE',
            }),
        }),
        createSale: builder.mutation<any, any>({
            query: (body) => ({
                url: `create-sale`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Sales'],  
        }),
        getSalesBySaleId: builder.query<any, number>({
            query: (saleId) => ({
                url: `GetBySalesId/${saleId}`,
                method: 'GET',
            }),
        }),
        getSalesDashBoard: builder.query<any, void>({
            query: () => ({
                url: `dashboard`,
                method: 'GET',
            }),
        }),
        getBestSeller: builder.query<any, void>({
            query: () => "productmostsold"
        })
    }),
    
});


export const { 
    useGetTotalSalesAmountQuery,
    useCreateSaleMutation,
    useGetAllSalesQuery,
    useDeleteSaleMutation,
    useGetBestSellerQuery,
    useGetSalesBySaleIdQuery,
    useGetSalesDashBoardQuery
} = salesApi;