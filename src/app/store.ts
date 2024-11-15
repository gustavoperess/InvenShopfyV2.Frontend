import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { productsApi } from '@/services/Product/Product';
import { authApi } from '@/services/Authentication/Authentication';
import { salesApi } from '@/services/Sales/Sales';
import { salesReturnApi } from '@/services/Sales/SaleReturn';
import { warehouse } from '@/services/Warehouse/Warehouse';
import { productsUnitApi } from '@/services/Product/Unit';
import {productsBrandApi} from "@/services/Product/Brand";
import {productsCategoryApi} from "@/services/Product/Category";
import { customerApi } from '@/services/People/Customer';
import { billerApi } from '@/services/People/Biller';
import { purchaseApi } from '@/services/Purchase/Purchase';
import { supplierApi } from '@/services/People/Supplier';
import { roleApi } from '@/services/Role/Role';
import { usersApi } from '@/services/User/User';
import { purchaseReturnApi } from '@/services/Purchase/PurchaseReturn';
import { expenseApi } from '@/services/Expense/Expense';
import { expenseCategory } from '@/services/Expense/ExpenseCategory';
import { transfersApi } from '@/services/Transfer/Transfer';
import { reportsApi } from '@/services/Report/Report';

const authApis = [authApi]; 
const warehouseApis = [warehouse];
const productsApis = [productsApi, productsUnitApi, productsBrandApi, productsCategoryApi];
const salesApis = [salesApi, salesReturnApi];
const peopleApis = [billerApi, customerApi, supplierApi]
const purchaseApis = [purchaseApi, purchaseReturnApi]
const roleApis = [roleApi]
const userApis = [usersApi]
const expenseApis = [expenseApi, expenseCategory]
const transferApis = [transfersApi]
const reportApis = [reportsApi]


// Combine all APIs into a single array
const apis = [...salesApis, ...warehouseApis, ...productsApis,
              ...authApis, ...peopleApis, ...purchaseApis,
              ...roleApis, ...userApis, ...expenseApis, ...transferApis,
              ...reportApis];

// Configure reducers
const reducers = apis.reduce((acc: Record<string, any>, api) => {
  acc[api.reducerPath] = api.reducer;
  return acc;
}, {});

// Configure middleware
const middleware = (getDefaultMiddleware: any) =>
    getDefaultMiddleware().concat(apis.map(api => api.middleware));

export const store = configureStore({
  reducer: reducers,
  middleware,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);