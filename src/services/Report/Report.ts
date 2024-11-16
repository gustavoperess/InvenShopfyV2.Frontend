import { DateRange } from '@mui/icons-material';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const reportsApi = createApi({
    reducerPath: 'reportsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BACKEND_URL}/v2/Report/`,
        credentials: 'include', 
    }),
    tagTypes: ['Reports'],  
    endpoints: (builder) => ({
        getSalesReport: builder.query<any, { dateRange: string; startDate: string | undefined; endDate: string | undefined; pageNumber: number; pageSize: number }>({
            query: ({ dateRange, startDate, endDate, pageNumber, pageSize }) => ({
              url: "sales-report",
              method: "GET",
              params: { dateRange, startDate, endDate, pageNumber, pageSize },
            }),
          }),
          getPurchaseReport: builder.query<any, { dateRange: string; startDate: string | undefined; endDate: string | undefined; pageNumber: number; pageSize: number }>({
            query: ({ dateRange, startDate, endDate, pageNumber, pageSize }) => ({
              url: "purchase-report",
              method: "GET",
              params: { dateRange, startDate, endDate, pageNumber, pageSize },
            }),
          }),
          getProductReport: builder.query<any, {pageNumber: number; pageSize: number }>({
            query: ({ pageNumber, pageSize }) => ({
              url: "product-report",
              method: "GET",
              params: { pageNumber, pageSize },
            }),
          }),
          getCustomerReport: builder.query<any, { dateRange: string; startDate: string | undefined; endDate: string | undefined; pageNumber: number; pageSize: number }>({
            query: ({ dateRange, startDate, endDate, pageNumber, pageSize }) => ({
              url: "customer-report",
              method: "GET",
              params: { dateRange, startDate, endDate, pageNumber, pageSize },
            }),
          }),
          getExpenserReport: builder.query<any, { dateRange: string; startDate: string | undefined; endDate: string | undefined; pageNumber: number; pageSize: number }>({
            query: ({ dateRange, startDate, endDate, pageNumber, pageSize }) => ({
              url: "expense-report",
              method: "GET",
              params: { dateRange, startDate, endDate, pageNumber, pageSize },
            }),
          }),
          getWarehouseReport: builder.query<any, {pageNumber: number; pageSize: number }>({
            query: ({ pageNumber, pageSize }) => ({
              url: "warehouse-report",
              method: "GET",
              params: { pageNumber, pageSize },
            }),
          }),
          getSupplierReport: builder.query<any, { dateRange: string; startDate: string | undefined; endDate: string | undefined; pageNumber: number; pageSize: number }>({
            query: ({ dateRange, startDate, endDate, pageNumber, pageSize }) => ({
              url: "supplier-report",
              method: "GET",
              params: { dateRange, startDate, endDate, pageNumber, pageSize },
            }),
          }),
    }),
});


export const { 
    useGetSupplierReportQuery,
    useGetWarehouseReportQuery,
    useGetExpenserReportQuery,
    useGetCustomerReportQuery,
    useGetProductReportQuery,
    useGetPurchaseReportQuery,
    useGetSalesReportQuery,
} = reportsApi;