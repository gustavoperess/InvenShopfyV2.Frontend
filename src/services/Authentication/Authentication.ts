import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BACKEND_URL =  process.env.NEXT_PUBLIC_BACKEND_UR;

// Base query with credentials to ensure cookies are included
const baseQueryWithCookies = fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/v2/identity/`,
    credentials: 'include',  // Allowing cookies in cross-origin requests
});

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: baseQueryWithCookies,
    endpoints: (builder) => ({
        userLogin: builder.mutation({
            query: (credentials) => {     
                return {
                    url: 'login-custom?useCookies=true',
                    method: 'POST',
                    body: credentials,
                };
            },
        }),
        userRegister: builder.mutation({
            query: (credentials) => {
                return {
                    url: 'register-custom',
                    method: 'POST',
                    body: credentials,
                }
            }
        }),
        userLogOut: builder.mutation({
            query: () => {
        
                return {
                    url: 'logout-custom',
                    method: 'POST',
                }
            }
        })

    }),
});

// Export the mutation hook
export const { useUserLoginMutation, useUserRegisterMutation, useUserLogOutMutation } = authApi;