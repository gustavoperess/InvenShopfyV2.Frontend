"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import product_data from '@/data/product-data';
import { TProduct,TProductInterface } from '@/interFace/interFace'
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

        productInformation,
        setProductInformation,
    }:
        {
            filteredData: TProductInterface[],
            setFilteredData: React.Dispatch<React.SetStateAction<TProductInterface[]>>,
            productListData: TProductInterface[],
            setProductListData: React.Dispatch<React.SetStateAction<TProductInterface[]>>,
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

    useEffect(() => {
        setFilteredData(productInformation);
    }, [setFilteredData]);

    //handle all product data
    const handleAllProductClick = () => {
        setSelectedCategoryFilteredData([]);
        setSelectedBrandFilteredData([]);
        setFeaturedProduct([]);
        setFilteredData(productInformation);
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
        console.log(selectedItem)
        if (!selectedItem) {
            return;
        }
        // Toggle active state
        setActiveProducts(prevState => ({
            ...prevState,
            [productId]: !prevState[productId]
        }));

        // Check if the selected item already exists in the productListData
        const isAlreadyAdded = productListData.some(product => product.productId === productId);
   
        if (isAlreadyAdded) {
            // If already added, remove it from the list
            const updatedList = productListData.filter(product => product.productId !== productId);
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
                            <div key={item.productId} onClick={() => handleProductData(item.productId)} className={`col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-4  xxxl:col-span-3 ${activeProducts[item.productId] ? "inventual-possale-tab-product-acitve" : "inventual-possale-tab-product"} text-center`}>
                                <div>
                                    <div className="inventual-possale-tab-product-img inline-block">
                                    <Image
                                        src={item.productImage}
                                        width="0"
                                        height="0"
                                        alt='image important'
                                        sizes="100vw"
                                        style={{ width: '42px', height: '32px' }}
                                      />
                                    </div>
                                    <div className="inventual-possale-tab-product-text">
                                        <h5>{item.productName}</h5>
                                        <p className=' text-heading'>{item.productName}</p>
                                        <span className='text-heading'>{item.batchNo}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* <CategoryPopup
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
            /> */}
        </>
    );
};

export default TabProduct;