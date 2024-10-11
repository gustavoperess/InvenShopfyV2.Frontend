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

// possale tab data
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


// build list data type
export interface billedList {
  id: number;
  name: string;
  phone: string;
  email: string;
  billerCode: string;
  adress: string;
  protein: string;
}

// sidebar menu data
export interface MenuItem {
  label: string;
  routeLink: string;
  iconClas?: string;
  subItems?: MenuItem[];
  subSubItems?: MenuItem[];
}