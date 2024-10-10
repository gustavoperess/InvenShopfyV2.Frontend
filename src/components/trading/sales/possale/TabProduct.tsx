"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import product_data from '@/data/product-data';
import { TProduct } from '@/interFace/interFace'
import CategoryPopup from './popup/CategoryPopup'
import BrandPopup from './popup/BrandPopup'


const TabProduct = (
    {
        productListData,
        setProductListData,
        filteredData,
        setFilteredData,
        activeProducts,
        setActiveProducts,
    }:
        {
            filteredData: TProduct[],
            setFilteredData: React.Dispatch<React.SetStateAction<TProduct[]>>,
            productListData: TProduct[],
            setProductListData: React.Dispatch<React.SetStateAction<TProduct[]>>,
            activeProducts: { [key: string]: boolean };
            setActiveProducts: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>

        }
) => {
    const [selectedCategoryFilteredData, setSelectedCategoryFilteredData] = useState<TProduct[]>([]);
    const [selectedBrandFilteredData, setSelectedBrandFilteredData] = useState<TProduct[]>([]);
    const [featuredProduct, setFeaturedProduct] = useState<TProduct[]>([]);
    const [openFirstDialog, setOpenFirstDialog] = useState<boolean>(false);
    const [openBrandDialog, setOpenBrandDialog] = useState<boolean>(false);

    const handleFirstDialogOpen = () => {
        setOpenFirstDialog(true);
    };
    const handleFirstDialogClose = () => {
        setOpenFirstDialog(false);
    };

    const handleBrandDialogOpen = () => {
        setOpenBrandDialog(true);
    };
    const handleBrandDialogClose = () => {
        setOpenBrandDialog(false);
    };

    useEffect(() => {
        setFilteredData(product_data);
    }, [setFilteredData]);

    //handle all product data
    const handleAllProductClick = () => {
        setSelectedCategoryFilteredData([]);
        setSelectedBrandFilteredData([]);
        setFeaturedProduct([]);
        setFilteredData(product_data);
    };

    //handle Category click
    const handleCategoryClick = () => {
        setSelectedBrandFilteredData([]);
        setFeaturedProduct([]);
    };

    //handle Brand click
    const handleBrandClick = () => {
        setSelectedCategoryFilteredData([]);
        setFeaturedProduct([]);
    };

    //handle feature product
    const handleFeatureProduct = () => {
        const featuredProduct = product_data.filter(item => item.is_featured === true);
        setSelectedCategoryFilteredData([]);
        setSelectedBrandFilteredData([]);
        setFeaturedProduct(featuredProduct);
    };

    const handleProductData = (itemId: any) => {
        const selectedItem = product_data.find((item) => item.id === itemId);
        if (!selectedItem) {
            return;
        }
        // Toggle active state
        setActiveProducts(prevState => ({
            ...prevState,
            [itemId]: !prevState[itemId]
        }));

        // Check if the selected item already exists in the productListData
        const isAlreadyAdded = productListData.some(product => product.id === itemId);
        if (isAlreadyAdded) {
            // If already added, remove it from the list
            const updatedList = productListData.filter(product => product.id !== itemId);
            setProductListData(updatedList);
        } else {
            // If not already added, add it to the productListData
            setProductListData(prevList => [...prevList, selectedItem]);
        }
    }

    return (
        <>
            <div className="inventual-common-card min-h-full">
                <div className=" rounded mb-5">
                    <div className='flex flex-wrap justify-between items-center gap-5 mb-5'>
                        <button
                            className='inventual-btn primary-btn flex-grow'
                            onClick={handleAllProductClick}
                        >
                            All Product
                        </button>
                        <button
                            className='inventual-btn secondary-btn flex-grow'
                            onClick={() => { handleFirstDialogOpen(), handleCategoryClick(); }}
                        >
                            Category
                        </button>
                        <button
                            className='inventual-btn warning-btn flex-grow'
                            onClick={() => { handleBrandDialogOpen(); handleBrandClick(); }}
                        >
                            Brand
                        </button>
                        <button
                            className='inventual-btn teal-btn flex-grow'
                            onClick={handleFeatureProduct}
                        >
                            Feature
                        </button>
                    </div>
                    <div className="grid grid-cols-12 gap-y-2.5 sm:gap-2.5">
                        {(selectedCategoryFilteredData.length > 0 ? selectedCategoryFilteredData :
                            (selectedBrandFilteredData.length > 0 ? selectedBrandFilteredData : (
                                featuredProduct.length > 0 ? featuredProduct : filteredData
                            ))
                        ).map(item => (
                            <div key={item.id} onClick={() => handleProductData(item.id)} className={`col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-4  xxxl:col-span-3 ${activeProducts[item.id] ? "inventual-possale-tab-product-acitve" : "inventual-possale-tab-product"} text-center`}>
                                <div>
                                    <div className="inventual-possale-tab-product-img inline-block">
                                        <Image
                                            src={item.image}
                                            style={{ width: "117px", height: 'auto' }}
                                            priority={true}
                                            alt="product not found"
                                        />
                                    </div>
                                    <div className="inventual-possale-tab-product-text">
                                        <h5>{item.title}</h5>
                                        <p className=' text-heading'>{item.brand}</p>
                                        <span className='text-heading'>{item.batchNo}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <CategoryPopup
                product_data={product_data}
                setSeelctedCategoryFilteredData={setSelectedCategoryFilteredData}
                open={openFirstDialog}
                handleFirstDialogClose={handleFirstDialogClose}
            />

            <BrandPopup
                product_data={product_data}
                setSelectedBrandFilteredData={setSelectedBrandFilteredData}
                open={openBrandDialog}
                handleBrandDialogClose={handleBrandDialogClose}
            />
        </>
    );
};

export default TabProduct;