import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const warehouse = createApi({
    reducerPath: 'warehouseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BACKEND_URL}/v2/Warehouse/`,
        credentials: 'include',  // Important for sending cookies
    }),
    endpoints: (builder) => ({
        getWarehouseQuantity: builder.query<any, void>({
            query: () => 'Warehouse/warehouses-quantity',
        }),
        getAllWarehouses: builder.query<any, number>({
            query: (pageNumber) => ({
                url: "Warehouse/allwarehouses",
                method: "GET",
                params: { pageNumber}
            }),
        }),
        deleteWarehouse: builder.mutation<any, number>({
            query: (id) => ({
                url: `Warehouse/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

// Export auto-generated hooks for functional components
export const { useGetWarehouseQuantityQuery, useGetAllWarehousesQuery, useDeleteWarehouseMutation } = warehouse;