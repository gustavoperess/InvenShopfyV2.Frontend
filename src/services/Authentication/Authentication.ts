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
            query: (credentials) => ({
                url: '/identity/login?useCookies=true',
                method: 'POST',
                body: credentials,
            }),
        }),
    }),
});

// Export the mutation hook
export const { useUserLoginMutation } = authApi;