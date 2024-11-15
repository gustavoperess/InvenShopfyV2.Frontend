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
    }),
    
});


export const { 
    useGetSalesReportQuery,
} = reportsApi;