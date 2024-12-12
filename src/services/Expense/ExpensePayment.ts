import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BACKEND_URL =   "https://invenshopfy-backend-gqfwethzeggegqdv.westeurope-01.azurewebsites.net";


export const expensePaymentApi = createApi({
    reducerPath: 'expensePayment',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BACKEND_URL}/v2/ExpensePayment/`,
        credentials: 'include',
    }),
    tagTypes: ['ExpensePayment'],  
    endpoints: (builder) => ({
            getAllExpenses: builder.query<any, { pageNumber: number; pageSize: number }>({
            query: ({ pageNumber, pageSize }) => ({
                url: ``,
                params: { pageNumber, pageSize },
            }),
            providesTags: ['ExpensePayment'], 
        }),
        AddPaymentExpense: builder.mutation<any, any>({
            query: (body) => ({
                url: ``,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['ExpensePayment']
        }),
        getExpensePaymentById: builder.query<any, number>({
            query: (expensePaymentId) => ({
                url: `/${expensePaymentId}`,
                method: 'GET',
            }),
        }),

    }),
});

// Export auto-generated hooks for functional components
export const { 
    useGetExpensePaymentByIdQuery,
    useAddPaymentExpenseMutation, 
    useGetAllExpensesQuery,
} = expensePaymentApi;