import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const notificationApi = createApi({
    reducerPath: 'notificationApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BACKEND_URL}/v2/Notification/`,
        credentials: 'include',
    }),
    tagTypes: ['Notification'],  
    endpoints: (builder) => ({
        getAllNotifications: builder.query<any, void>({ 
            query: () => ({
                url: `notifications`,
                method: "GET",
            }),
            providesTags: ['Notification'], 
        }),
    }),
});


export const { useGetAllNotificationsQuery } = notificationApi; // Fixed export
