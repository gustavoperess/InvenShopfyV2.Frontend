import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const usersApi = createApi({
    reducerPath: 'usesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BACKEND_URL}/v2/identity/`,
        credentials: 'include', 
    }),
    tagTypes: ['Users'],  
    endpoints: (builder) => ({
        getAllUsers:builder.query<any, void>({
            query: () => ({
                url: "get-user-custom",
                method: "GET",
            }),
            providesTags: ['Users'], 
        }),
        getUsersDashboard:builder.query<any, void>({
            query: () => ({
                url: "dashboard/get-user-dashboard",
                method: "GET",
            }),
            providesTags: ['Users'], 
        }),
        getAllUsersButYourself:builder.query<any, void>({
            query: () => ({
                url: "users-but-yourself",
                method: "GET",
            }),
            providesTags: ['Users'], 
        }),
        getAllBillersNew:builder.query<any, void>({
            query: () => ({
                url: `get-billers`,
                method: "GET",
            }),
            providesTags: ['Users'], 
        }),
        deleteUsers: builder.mutation<any, number>({
            query: (id) => ({
                url: `delete-user/${id}`,
                method: 'DELETE',
            }),
        }),
        getCurrentUser: builder.query<any, void>({
            query: () => ({
                url: `get-current-user`,
                method: 'GET',
            }),
            providesTags: ['Users'], 
        }),
        updateUser: builder.mutation<any, { body: any; userId: string }>({
            query: ({ body, userId }) => ({
                url: `edit-user/${userId}`,
                method: 'PUT',
                body
            }),
            invalidatesTags: ['Users'],
        }),
        updateUserRole: builder.mutation<any, { body: any; userId: string }>({
            query: ({ body, userId }) => ({
                url: `edit-user-role/${userId}`,
                method: 'PUT',
                body
            }),
            invalidatesTags: ['Users'],
        }),
        createUsers: builder.mutation<any, any>({
            query: (body) => ({
                url: ``,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Users'],  
        }),
    }),
    
});


export const { 
    useUpdateUserRoleMutation,
    useGetAllUsersButYourselfQuery,
    useGetAllBillersNewQuery,
    useUpdateUserMutation,
    useGetAllUsersQuery, 
    useGetUsersDashboardQuery, 
    useDeleteUsersMutation, 
    useCreateUsersMutation,
    useGetCurrentUserQuery

} = usersApi;