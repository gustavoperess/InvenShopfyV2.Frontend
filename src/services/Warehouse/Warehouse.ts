import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BACKEND_URL =  process.env.NEXT_PUBLIC_BACKEND_UR;

export const warehouse = createApi({
    reducerPath: 'warehouseApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BACKEND_URL}/v2/Warehouse/`,
        credentials: 'include',  // Important for sending cookies
    }),
    tagTypes: ['Warehouse'],  
    endpoints: (builder) => ({
        // Query to get warehouse quantity
        getWarehouseQuantity: builder.query<any, void>({
            query: () => 'dashboard/warehouses-quantity',
            providesTags: ['Warehouse'],  
        }),
        // Query to get all warehouses (e.g., for a list of warehouses)
        getAllWarehouses: builder.query<any, { pageNumber: number; pageSize: number }>({
            query: ({ pageNumber, pageSize }) => ({
                url: `allwarehouses`,
                method: 'GET',
                params: { pageNumber, pageSize }
            }),
            providesTags: ['Warehouse'],  
        }),
        // Mutation to delete a warehouse
        deleteWarehouse: builder.mutation<any, number>({
            query: (id) => ({
                url: `${id}`,
                method: 'DELETE',
            }),
        }),
        // Query to get the total quantity by product and warehouse
        getTotalQuantityByProductAndWarehouseId: builder.query<any, { warehouseId: number; productId: number }>({
            query: ({ warehouseId, productId }) => ({
                url: `getTotalamount-${warehouseId}-${productId}`,
                method: 'GET',
            }),
            providesTags: ['Warehouse'],  
        }),
        // Get just the warehouse name and id
        getWarehouseNames: builder.query<any, { pageNumber: number; pageSize: number }>({
            query: ({ pageNumber, pageSize }) => ({
                url: `warehouses/name`,
                method: 'GET',
                params: { pageNumber, pageSize }
            }),
            providesTags: ['Warehouse'],  
        }),
        // Get the total amount in stock
        getTotalStockAmount: builder.query<any, void>({
            query: () => 'dashboard/total-in-stock',
            providesTags: ['Warehouse'],  
        }),
        // Mutation to create a new warehouse
        createWarehouse: builder.mutation<any, any>({
            query: (body) => ({
                url: ``,
                method: 'POST',
                body,
            }),
        }),
    }),
});

// Export auto-generated hooks for functional components
export const { 
    useGetWarehouseQuantityQuery, 
    useGetAllWarehousesQuery, 
    useCreateWarehouseMutation, 
    useDeleteWarehouseMutation, 
    useGetTotalQuantityByProductAndWarehouseIdQuery ,
    useGetWarehouseNamesQuery,
    useGetTotalStockAmountQuery
} = warehouse;


