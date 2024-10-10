import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Base query with credentials to ensure cookies are included
const baseQueryWithCookies = fetchBaseQuery({
    baseUrl: 'http://localhost:5252/v2',
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