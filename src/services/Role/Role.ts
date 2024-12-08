import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BACKEND_URL =  process.env.NEXT_PUBLIC_BACKEND_UR;


export const roleApi = createApi({
    reducerPath: 'rolesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BACKEND_URL}/v2/identity/`,
        credentials: 'include', 
    }),
    tagTypes: ['Roles'],  
    endpoints: (builder) => ({
        getAllRoles: builder.query<any, void>({
            query: () => ({
                url: "get-role-custom",
                method: "GET",
    
            }),
            providesTags: ['Roles'], 
        }),
        getMangerAdminUsers: builder.query<any, void>({
            query: () => ({
                url: "get-manager-admin-custom",
                method: "GET",
    
            }),
            providesTags: ['Roles'], 
        }),
        createRole: builder.mutation<any, any>({
            query: (body) => ({
                url: `create-role-custom`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Roles']
        }),
        assignPermissionsToRole: builder.mutation<any, any>({
            query: (body) => ({
                url: `assign-permissions-to-role`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Roles']
        }),
        getRoleByName: builder.query<any, string>({
            query: (name) => ({
                url: `get-role-by-partial/${name}`,
            }),
            providesTags: ['Roles'], 
        }),
        deleteRole: builder.mutation<any, number>({
            query: (id) => ({
                url: `delete-role-custom/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Roles']
        }),
    })
});


export const { 
    useAssignPermissionsToRoleMutation,
    useGetRoleByNameQuery,
    useCreateRoleMutation,
    useGetAllRolesQuery,
    useDeleteRoleMutation,
    useGetMangerAdminUsersQuery } = roleApi;