import { StaticImageData } from "next/image";
import React from "react";
// context api data type
export interface AppContextType {
  scrollDirection?: string;
  setScrollDirection?: React.Dispatch<React.SetStateAction<string>> | undefined;
  filterType: string;
  setFilterType: React.Dispatch<React.SetStateAction<string>>;
  dynamicId: number;
  setDynamicId: React.Dispatch<React.SetStateAction<number>>;
  niceSelectData: string;
  setNiceSelectData: React.Dispatch<React.SetStateAction<string>>;
  modalId: number;
  setModalId: React.Dispatch<React.SetStateAction<number>>;
  setShowingNavigationDropdown:React.Dispatch<React.SetStateAction<boolean>>;
  showingNavigationDropdown:boolean;

}

export interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

export interface TtransferInterface {
  id: number;
  title: string
  productCode: string;
  stockQuantity: number;
  transferDate: string;
  referenceNumber: string;
  productName: string;
  quantity: number;
  fromWarehouse: string;
  toWarehouse: string;
  reason: string;
  transferStatus: string;
  transferNote: string;
  authorizedBy: string;
}


export interface TSaleReturnInterface {
  id: number;
  referenceNumber: string;
  supplierName: string;
  warehouseName: string;
  totalAmount: string;
  billerName: string;
  customerName: string;
  returnNote: string;
  remarkStatus: string;
  returnDate: string;
}

export interface TSaleInterface {
  id: number;
  salesDate: string;
  customerName: string;
  billerName: string;
  saleStatus: string
  paymentStatus: string;
  referenceNumber: string;
  warehouseName: string;
  totalQuantitySold: number
  totalAmount: number;
}

// possale tab data
export interface TProductInterface {
  id: number;
  title: string;
  price: number;
  productCode: number;
  stockQuantity: number;
  created: string;
  subcategory: string;
  mainCategory: string
  unit: string;
  quantity: number;
  brand: string;
  marginRange: string;
  productImage: string;
  category: string;
  image: string;
  batchNo: string;
  totalAmountSold: number;
  quantitySold: number;
  expired: boolean;
  totalAmountbougth: number,
  quantityBought: number | undefined;
  taxPercentage: number;
}

export interface TProduct {
  id: number,
  image:StaticImageData,
  title:string,
  productNum: number,
  brand: string,
  is_featured: boolean,
  batchNo: string,
  category: string,
  price: number,
  quantity: number,
  subtotal: number,
  tax: number,
  discount: number,
  unit: string,
}

export let MoneyFormat = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'GBP',
});


export interface TSaleReportInterface {
  billerId: number;
  totalQuantitySold: number;
  totalTaxPaid: number;
  totalProfit: number;
  startDate: Date;
  endDate: Date;
  name: string;
  totalAmount: number;
}


export interface TCustomerInterface {
  id: number;
  name: string;
  phoneNumber: string;
  email: string;
  city: string;
  country: string;
  address: string;
  zipCode: string;
  rewardPoint: string;
  customerGroup: number;
}

export interface TBrandInterface {
  id: number;
  title: string;
  brandImage: string;
}
export interface TWarehouseInterface {
  id: number;
  warehouseTitle: string;
  warehouseName: string;
  warehouse: string;
  phone: string;
  zipcode: string;
  email: string;
  address: string;
  quantityOfItems: number;
}

export interface TUserInterface {
  id: number;
  userId: number;
  userName: string;
  phoneNumber: string;
  roleName: string;
  status: string;
  dateOfJoin: string;
  email: string;
  roleTitle: string;
  roleDescription: string;
  name: string;
}



export interface TPurchaseReturnInterface {
  id: number;
  referenceNumber: string;
  supplierName: string;
  warehouseName: string;
  returnNote: string;
  totalAmount: string;
  remarkStatus: string;
  purchaseDate: string;
  totalNumberOfProductsBought: number;
  
}

export interface TSupplierInterface {
  id: number;
  name: string;
  phoneNumber: string;
  email: string;
  country: string;
  supplierCode: string;
  city: string;
  address: string;
  zipCode: string;
  company: string;
}


export interface TMainCategoryInterface {
  mainCategory: string;
  id: number;
  subCategory: string;
}

export interface TUnitInterface {
  id: number;
  title: string;
  shortName: string;
}


export interface TExpenseInterface {
  id: number;
  expenseDescription: string;
  date: string;
  warehouse: string;
  expenseType: string;
  expenseCategory: string;
  voucherNumber: number;
  expenseCost: number;
  expenseNote: string;
  shippingCost: string;
}

export interface TBillerInterface {
  id: number;
  name: string;
  DateOfJoint: string;
  email: string;
  phoneNumber: string;
  identification: string;
  address: string;
  country: string;
  zipCode: string;
  billerCode: string;
  warehouse: string;
}


export interface TBillerInterfaceTwo {
  userId: number;
  roleId: number;
  userName: string;
  roleName: string;
}


export interface TPurchaseInterface {
  id: number;
  purchaseDate: string;
  warehouse: string;
  supplier: string;
  reference: string;
  purchaseNote: string;
  shippingCost: number;
  grandTotal: number;
  purchaseStatus: string;
  totalNumberOfProductsBougth: number;
  totalPaidInTaxes: number;
}



// sidebar menu data
export interface MenuItem {
  label: string;
  routeLink: string;
  iconClas?: string;
  subItems?: MenuItem[];
  subSubItems?: MenuItem[];
}