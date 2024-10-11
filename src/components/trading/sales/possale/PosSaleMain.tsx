"use client"
import React, { useState } from 'react';
import TabProduct from './TabProduct';
import PosSaleList from './PosSaleList';
import { TProduct } from '@/interFace/interFace';

const PosSaleMain = () => {
    const [productListData, setProductListData] = useState<TProduct[]>([]);
    const [filteredData, setFilteredData] = useState<TProduct[]>([]);
    const [activeProducts, setActiveProducts] = useState<{ [key: string]: boolean }>({});

    return (
        <>
            <div className="inventual-content-area px-4 sm:px-7 mt-7">
                <div className="inventual-possale-area">
                    <div className="grid grid-cols-12 gap-5">
                        <div className="col-span-12 xl:col-span-7">
                            <PosSaleList
                                productListData={productListData}
                                setProductListData={setProductListData}
                                setFilteredData={setFilteredData}
                                setActiveProducts={setActiveProducts}
                            />
                        </div>
                        <div className="col-span-12 xl:col-span-5">
                            <TabProduct
                                productListData={productListData}
                                setProductListData={setProductListData}
                                filteredData={filteredData}
                                setFilteredData={setFilteredData}
                                activeProducts={activeProducts}
                                setActiveProducts={setActiveProducts}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PosSaleMain;