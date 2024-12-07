"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { TProduct, TProductInterface } from '@/interFace/interFace'
import CategoryPopup from './popup/CategoryPopup'
import BrandPopup from './popup/BrandPopup'


const TabProduct = (
    {

        activeProducts,
        setActiveProducts,

        productInformation,
        setProductInformation,
    }:
        {
   
            activeProducts: { [key: string]: boolean };
            setActiveProducts: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>

            productInformation: TProductInterface[];
            setProductInformation: React.Dispatch<React.SetStateAction<TProductInterface[]>>;

        }
) => {
    const [selectedCategoryFilteredData, setSelectedCategoryFilteredData] = useState<TProductInterface[]>([]);
    const [selectedBrandFilteredData, setSelectedBrandFilteredData] = useState<TProductInterface[]>([]);
    const [featuredProduct, setFeaturedProduct] = useState<TProductInterface[]>([]);
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


    //handle all product data
    const handleAllProductClick = () => {
        setSelectedCategoryFilteredData([]);
        setSelectedBrandFilteredData([]);
        setFeaturedProduct([]);
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
        const featuredProduct = productInformation?.filter(item => item.featured === true);
        setSelectedCategoryFilteredData([]);
        setSelectedBrandFilteredData([]);
        setFeaturedProduct(featuredProduct);
    };


    const handleProductData = (productId: any) => {
        const selectedItem = productInformation?.find((item) => item.productId === productId);
        if (!selectedItem) {
            return;
        }
        // Toggle active state
        setActiveProducts(prevState => ({
            ...prevState,
            [productId]: !prevState[productId]
        }));

        // Check if the selected item already exists in the productListData
        const isAlreadyAdded = productInformation.some(product => product.productId === productId);

        if (isAlreadyAdded) {
            // If already added, remove it from the list
            const updatedList = productInformation.filter(product => product.productId !== productId);
            setProductInformation(updatedList);
        } else {
            // If not already added, add it to the productListData
            setProductInformation(prevList => [...prevList, selectedItem]);
        }
    }


    return (
        <>
            <div className="invenShopfy-common-card min-h-full">
                <div className=" rounded mb-5">
                    <div className='flex flex-wrap justify-between items-center gap-5 mb-5'>
                        <button
                            className='invenShopfy-btn primary-btn flex-grow'
                            onClick={handleAllProductClick}
                        >
                            All Product
                        </button>
                        <button
                            className='invenShopfy-btn secondary-btn flex-grow'
                            onClick={() => { handleFirstDialogOpen(), handleCategoryClick(); }}
                        >
                            Category
                        </button>
                        <button
                            className='invenShopfy-btn warning-btn flex-grow'
                            onClick={() => { handleBrandDialogOpen(); handleBrandClick(); }}
                        >
                            Brand
                        </button>
                        <button
                            className='invenShopfy-btn teal-btn flex-grow'
                            onClick={handleFeatureProduct}
                        >
                            Feature
                        </button>
                    </div>
                    <div className="grid grid-cols-12 gap-y-2.5 sm:gap-2.5">
                        {featuredProduct.length > 0
                            ? featuredProduct.map((item: any) => (
                                <div
                                    key={item.productId}
                                    onClick={() => handleProductData(item.productId)}
                                    className={`col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-4 xxxl:col-span-3 ${activeProducts[item.productId] ? "invenShopfy-possale-tab-product-acitve" : "invenShopfy-possale-tab-product"
                                        } text-center`}
                                >
                                    <div>
                                        <div className="invenShopfy-possale-tab-product-img inline-block">
                                            <Image
                                                src={item.productImage}
                                                width="0"
                                                height="0"
                                                alt="image important"
                                                sizes="100vw"
                                                style={{ width: '42px', height: '32px' }}
                                            />
                                        </div>
                                        <div className="invenShopfy-possale-tab-product-text">
                                            <h5>{item.productName}</h5>
                                            <p className="text-heading">{item.productName}</p>
                                            <span className="text-heading">{item.batchNo}</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                            : productInformation.length > 0
                                ? productInformation.map((item: any) => (
                                    <div
                                        key={item.productId}
                                        onClick={() => handleProductData(item.productId)}
                                        className={`col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-4 xxxl:col-span-3 ${activeProducts[item.productId] ? "invenShopfy-possale-tab-product-acitve" : "invenShopfy-possale-tab-product"
                                            } text-center`}
                                    >
                                        <div>
                                            <div className="invenShopfy-possale-tab-product-img inline-block">
                                                <Image
                                                    src={item.productImage}
                                                    width="0"
                                                    height="0"
                                                    alt="image important"
                                                    sizes="100vw"
                                                    style={{ width: '42px', height: '32px' }}
                                                />
                                            </div>
                                            <div className="invenShopfy-possale-tab-product-text">
                                                <h5>{item.productName}</h5>
                                                <p className="text-heading">{item.productName}</p>
                                                <span className="text-heading">{item.batchNo}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                                : null}
                    </div>
                </div>
            </div>

            <CategoryPopup
                productInformation={productInformation}
                setSeelctedCategoryFilteredData={setSelectedCategoryFilteredData}
                open={openFirstDialog}
                handleFirstDialogClose={handleFirstDialogClose}
            />

            <BrandPopup
                productInformation={productInformation}
                setSelectedBrandFilteredData={setSelectedBrandFilteredData}
                open={openBrandDialog}
                handleBrandDialogClose={handleBrandDialogClose}
            />
        </>
    );
};

export default TabProduct;