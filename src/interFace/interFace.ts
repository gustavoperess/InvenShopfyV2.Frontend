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
  returnTotalAmount: string;
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
  totalAmount: number;
  totalQuantitySold: number
  returnTotalAmount: number;
}


export interface MessageTab {
  id: number;
  profilePicture: string;
  toUser: string;
  subject: string;
  messageBody: string;
  time: string;
}
// possale tab data
export interface TProductInterface {
  id: number;
  productId: number;
  productName: string;
  featured: boolean;
  productPrice: number;
  productCode: number;
  stockQuantity: number;
  created: string;
  subcategory: string;
  mainCategory: string;
  mainCategoryId: number;
  unitName: string;
  quantity: number;
  brandName: string;
  marginRange: string;
  productImage: string;
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
  featured: boolean,
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


export interface TSupplierReportInterface {
  supplierId: number;
  supplierName: string;
  numberOfPurchases: number;
  numberOfProductsBought: number;
  totalPaidInShipping: number;
  totalPaidInTaxes: number;
  startDate: Date;
  endDate: Date;
  totalAmount: number;
}


export interface TPurchaseReportInterface {
  tempKey: string;
  id: number;
  productName: string;
  supplierName: string;
  warehouseName: string;
  purchaseDate: string;
  totalQuantityBoughtPerProduct: number;
  totalPricePaidPerProduct: number;
  totalInTaxPaidPerProduct: number;
  purchaseReferenceNumber: string;
}



export interface TExpenseReportInterface {
  id: number;
  name: string;
  totalCost: number;
  numberOfTimesUsed: number;
  shippingCost: number;
}


export interface TCustomerReportInterface {
  id: number;
  customerName: string;
  rewardPoints: number;
  numberOfPurchases: number;
  totalPaidInShipping: number;
  totalAmount: number;
  totalPaidInTaxes: number;
  totalProfit: number;
  numberOfProductsBought: number;
  lastPurchase: Date;
}

export interface TProductReportInterface {
  productId: number;
  productName: string;
  totalQuantityBought: number;
  totalAmountPaid: number;
  totalPaidInTaxes: number;
  totalQuantitySold: number;
  totalRevenue: number;
  stockQuantity: number;
  productCode: number;
}


export interface TWarehouseReportInterface {
  id: number;
  warehouseName: string;
  totalAmountBought: number;
  totalNumbersOfProductsBought: number;
  totalPaidInShipping: number;
  totalAmountSold: number;
  totalQtyOfProductsSold: number;
  totalNumberOfSales: number;
  totalProfit: number;
  stockQuantity: number;
}




export interface TSaleReportInterface {
  billerId: number;
  totalQuantitySold: number;
  totalTaxPaid: number;
  totalProfit: number;
  startDate: Date;
  endDate: Date;
  name: string;
  totalAmount: number;
  totalShippingPaid: number;
}


export interface TCustomerInterface {
  id: number;
  customerName: string;
  name: string
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
  brandName: string;
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
  profilePicture: string;
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
  supplierName: string;
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
  unitName: string;
  unitShortName: string;
}


export interface TExpenseInterface {
  id: number;
  expenseDescription: string;
  date: string;
  warehouse: string;
  expenseType: string;
  expenseCategory: string;
  voucherNumber: string;
  expenseStatus: string;
  expenseCost: string;
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