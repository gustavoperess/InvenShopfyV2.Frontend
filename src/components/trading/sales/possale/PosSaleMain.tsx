"use client"
import React, { useState } from 'react';
import TabProduct from './TabProduct';
import PosSaleList from './PosSaleList';
import { TProduct,TProductInterface } from '@/interFace/interFace';

const PosSaleMain = () => {
    const [productListData, setProductListData] = useState<TProductInterface[]>([]);
    const [filteredData, setFilteredData] = useState<TProductInterface[]>([]);
    const [activeProducts, setActiveProducts] = useState<{ [key: string]: boolean }>({});
    const [productInformation, setProductInformation] = useState<TProductInterface[]>([]); // Add this


    return (
        <>
            <div className="invenShopfy-content-area px-4 sm:px-7 mt-7">
                <div className="invenShopfy-possale-area">
                    <div className="grid grid-cols-12 gap-5">
                        <div className="col-span-12 xl:col-span-7">
                            <PosSaleList
                                setActiveProducts={setActiveProducts}
                                productInformation={productInformation} 
                                setProductInformation={setProductInformation} 
                            />
                        </div>
                        <div className="col-span-12 xl:col-span-5">
                            <TabProduct
                        
                                activeProducts={activeProducts}
                                setActiveProducts={setActiveProducts}
                                productInformation={productInformation} 
                                setProductInformation={setProductInformation} 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PosSaleMain;