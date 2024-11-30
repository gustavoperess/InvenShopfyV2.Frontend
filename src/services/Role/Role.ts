import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;


export const roleApi = createApi({
    reducerPath: 'rolesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BACKEND_URL}/v2/identity/`,
        credentials: 'include', 
    }),
    endpoints: (builder) => ({
        getAllRoles: builder.query<any, void>({
            query: () => ({
                url: "get-role-custom",
                method: "GET",
    
            }),
        }),
        getMangerAdminUsers: builder.query<any, void>({
            query: () => ({
                url: "get-manager-admin-custom",
                method: "GET",
    
            }),
        }),
        createRole: builder.mutation<any, any>({
            query: (body) => ({
                url: `create-role-custom`,
                method: 'POST',
                body,
            }),
        }),
        getRoleByName: builder.query<any, string>({
            query: (name) => ({
                url: `get-role-by-partial/${encodeURIComponent(name)}`,
            })
        }),
        deleteRole: builder.mutation<any, number>({
            query: (id) => ({
                url: `delete-role-custom/${id}`,
                method: 'DELETE',
            }),
        }),
    })
});


export const { 
    useGetRoleByNameQuery,
    useCreateRoleMutation,
    useGetAllRolesQuery,
    useDeleteRoleMutation,
    useGetMangerAdminUsersQuery } = roleApi;