import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Base query with credentials to ensure cookies are included
const baseQueryWithCookies = fetchBaseQuery({
    baseUrl: `${BACKEND_URL}/v2`,
    credentials: 'include',  // Allowing cookies in cross-origin requests
});

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: baseQueryWithCookies,
    endpoints: (builder) => ({
        userLogin: builder.mutation({
            query: (credentials) => {     
                return {
                    url: '/identity/handleLoginApplication?useCookies=true',
                    method: 'POST',
                    body: credentials,
                };
            },
        }),
        userRegister: builder.mutation({
            query: (credentials) => {
                console.log('Credentials being sent to the backend:', credentials);
                return {
                    url: '/identity/register',
                    method: 'POST',
                    body: credentials,
                }
            }
        }),
        userRegisterTwo: builder.mutation({
            query: (credentials) => {
                console.log('Credentials being sent to the backend:', credentials);
                return {
                    url: '/identity/register-custom',
                    method: 'POST',
                    body: credentials,
                }
            }
        }),
        userLogOut: builder.mutation({
            query: () => {
                console.log('Credentials being sent to the backend:');
                return {
                    url: '/identity/logout',
                    method: 'POST',
                }
            }
        })

    }),
});

// Export the mutation hook
export const { useUserLoginMutation, useUserRegisterMutation, useUserLogOutMutation, useUserRegisterTwoMutation } = authApi;