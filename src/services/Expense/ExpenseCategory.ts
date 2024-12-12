import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BACKEND_URL =   "https://invenshopfy-backend-gqfwethzeggegqdv.westeurope-01.azurewebsites.net/";

export const expenseCategory = createApi({
    reducerPath: 'expenseCategoryApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BACKEND_URL}/v2/ExpenseCategory/`,
        credentials: 'include',
    }),
    endpoints: (builder) => ({
            getAllExpenseCategories: builder.query<any, { pageNumber: number; pageSize: number }>({
                query: ({ pageNumber, pageSize })=> ({
                url:'',
                params: { pageNumber, pageSize },
            }),
        }),
        getExpenseCategoryById: builder.query<any, number> ({
            query:(id) => `${id}`
        }),
        AddExepenseCategory: builder.mutation<any, any>({
            query: (body) => ({
                url: ``,
                method: 'POST',
                body,
            }),
        }),
        deleteExpenseCategory: builder.mutation<any, number>({
            query: (id) => ({
                url: `${id}`,
                method: 'DELETE',
            }),
        })
    }),
});

export const { useAddExepenseCategoryMutation, useGetAllExpenseCategoriesQuery, useDeleteExpenseCategoryMutation, useGetExpenseCategoryByIdQuery } = expenseCategory;