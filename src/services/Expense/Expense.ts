import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BACKEND_URL =   "https://invenshopfy-backend-gqfwethzeggegqdv.westeurope-01.azurewebsites.net";


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
        getExpenseTotalAmount: builder.query<any, void>({
            query: () => ({
                url: `dashboard/total-amount`,
                method: 'GET',
            }),
        }),
        getExpenseById: builder.query<any, number>({
            query: (expenseId) => ({
                url: `/${expenseId}`,
                method: 'GET',
            }),
        }),
        getExpenseByName: builder.query<any, string>({
            query: (expenseNumber) => ({
                url: `expense-by/${encodeURIComponent(expenseNumber)}`,
            })
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
export const {
    useGetExpenseByIdQuery,
    useGetExpenseByNameQuery,
    useAddExpenseMutation, 
    useGetExpenseDashBoardQuery, 
    useDeleteExpenseMutation, 
    useGetAllExpensesQuery,
    useGetExpenseTotalAmountQuery
} = expenseApi;