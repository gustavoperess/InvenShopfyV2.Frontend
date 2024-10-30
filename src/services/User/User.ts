import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const usersApi = createApi({
    reducerPath: 'usesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BACKEND_URL}/v2/identity/`,
        credentials: 'include', 
    }),
    endpoints: (builder) => ({
        getAllUsers:builder.query<any, void>({
            query: () => ({
                url: "get-user-custom",
                method: "GET",
            }),
        }),
        deleteUsers: builder.mutation<any, number>({
            query: (id) => ({
                url: `${id}`,
                method: 'DELETE',
            }),
        }),
        createUsers: builder.mutation<any, any>({
            query: (body) => ({
                url: ``,
                method: 'POST',
                body,
            }),
        }),
    }),
    
});


export const { useGetAllUsersQuery, useDeleteUsersMutation, useCreateUsersMutation } = usersApi;