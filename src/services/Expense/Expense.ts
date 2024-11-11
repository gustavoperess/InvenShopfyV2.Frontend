import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;


export const expenseApi = createApi({
    reducerPath: 'expensesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BACKEND_URL}/v2/Expenses/`,
        credentials: 'include',
    }),
    tagTypes: ['Expenses'],  
    endpoints: (builder) => ({
            getAllExpenses: builder.query<any, { pageNumber: number; pageSize: number }>({
            query: ({ pageNumber, pageSize }) => ({
                url: ``,
                params: { pageNumber, pageSize },
            }),
            providesTags: ['Expenses'], 
        }),
        AddExpense: builder.mutation<any, any>({
            query: (body) => ({
                url: `create-expense`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Expenses']
        }),
        getExpenseDashBoard: builder.query<any, void>({
            query: () => ({
                url: `dashboard/top-expenses`,
                method: 'GET',
            }),
        }),
        deleteExpense: builder.mutation<any, number>({
            query: (id) => ({
                url: `${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

// Export auto-generated hooks for functional components
export const { useAddExpenseMutation, useGetExpenseDashBoardQuery, useDeleteExpenseMutation, useGetAllExpensesQuery } = expenseApi;