'use client'
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Checkbox, FormControlLabel, MenuItem, TextField } from '@mui/material';
import { toast } from 'react-toastify';
import { TProduct } from '@/interFace/interFace';
import { useGetProductByNameQuery } from '@/services/Product/Product';
import { TProductInterface, MoneyFormat } from '@/interFace/interFace';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf'
import Barcode from 'react-barcode';



const GenerateBarcodeList = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchResults, setSearchResults] = useState<TProduct[]>([]);
    const [activeItemIds, setActiveItemIds] = useState<number[]>([]);
    const [activeItems, setActiveItems] = useState<TProduct[]>([]);
    const [product, setProduct] = useState<string>("");
    const [productName, setProductName] = useState<string>("");
    const [suggestions, setSuggestions] = useState<TProductInterface[]>([]);
    const [productInformation, setProductInformation] = useState<TProductInterface[]>([]);
    const [name, setName] = useState<boolean>(true)
    const [code, setCode] = useState<boolean>(true)
    const [price, setPrice] = useState<boolean>(true)
    const [productCodeNumber, setProductCodeNumber] = useState<number>();
    const [selectBarSize, setSelectBarSize] = useState<string>("50");
    const [productCodeName, setProductCodeName] = useState<string>("");
    const [productCodePrice, setProductCodePrice] = useState<number>();
    const debouncedSearchTerm = useDebounce(productName, 500);




    //debounce function
    function useDebounce(value: string, delay: number) {
        const [debouncedValue, setDebouncedValue] = useState(value);

        useEffect(() => {
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);

            return () => clearTimeout(handler);
        }, [value, delay]);

        return debouncedValue;
    }

    const { data: productSuggestionsData, error } = useGetProductByNameQuery(debouncedSearchTerm, {
        skip: debouncedSearchTerm.trim().length === 0  // Only call API if debounced term is not empty
    });


    useEffect(() => {
        if (debouncedSearchTerm.trim().length > 0 && productSuggestionsData) {
            setSuggestions(productSuggestionsData.data);
        } else {
            setSuggestions([]);
        }

        // Handle error scenarios
        if (error) {
            console.error("Error fetching product suggestions", error);
            // You could display a user-friendly message if needed
        }
    }, [debouncedSearchTerm, productSuggestionsData, error]);

    const selectSuggestion = (suggestion: TProductInterface) => {
        if (productInformation.length > 0) {
            setProductInformation([]);
            setProductCodeName("");
            setProductCodePrice(undefined);
            setProductCodeNumber(undefined);
            setProductInformation(prev => [
                ...prev, { ...suggestion }]);
        } else {
            setProductInformation(prev => [
                ...prev, { ...suggestion }]);
        }
        setSuggestions([]);
        setProduct("");
    };

    //handler for close search with close btn
    const handleSearchClose = () => {
        setSearchQuery('');
        setSearchResults([]);
    };

    const handleRemoveProduct = (productId: number) => {
        setProductInformation((prevProducts) =>
            prevProducts.filter((product) => product.id !== productId)
        );
    };


    const onTypeChangeForProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setProduct(value);
        setProductName(value);
    };



    //handle generate barcode 

    const handleGenerateBarcode = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (productInformation.length > 0) {
            try {
                if (code != false) {
                    setProductCodeNumber(productInformation?.[0].productCode)
                }
                if (price != false) {
                    setProductCodePrice(productInformation?.[0].productPrice)
                }
                if (name != false) {
                    setProductCodeName(productInformation?.[0].productName)
                }
                toast.success("Barcode Generate successfully!");
            } catch {
                toast.error("Failed to  Generate Barcode. Please try again later.");
            }

        } else {
            toast.error("Please enter a product to generate the bar code");
        }
    }

    

    return (
        <>
            <div className="invenShopfy-content-area px-4 sm:px-7">
                <div className="invenShopfy-addbrand-area bg-white p-5 sm:p-7 custom-shadow rounded-8 mt-7">
                    <div className="invenShopfy-barcode-area">
                        <div className="grid grid-cols-12 gap-y-7 sm:gap-7">
                            <div className="col-span-12 lg:col-span-6">
                                <form onSubmit={handleGenerateBarcode}>
                                    <div className="invenShopfy-barcode-left h-full md:mb-7 sm:mb-7">
                                        <div className="invenShopfy-select-field mb-5">
                                            <div className="invenShopfy-select-field">
                                                <div className="invenShopfy-form-field">
                                                    <h5>Select Product</h5>
                                                    <div className="invenShopfy-input-field-style search-field">
                                                        <TextField
                                                            fullWidth
                                                            placeholder="Macbook..."
                                                            variant="outlined"
                                                            value={product}
                                                            onChange={onTypeChangeForProduct}
                                                        />
                                                        {
                                                            suggestions.length > 0 && (
                                                                <div onClick={handleSearchClose} className="search-close">x</div>
                                                            )
                                                        }

                                                        {
                                                            suggestions.length > 0 && (
                                                                <div className='search-dropdown dropdown-scroll'>
                                                                    <ul>
                                                                        {
                                                                            suggestions.map(product => (
                                                                                <li
                                                                                    key={product.id}
                                                                                    id='single-list'
                                                                                    className={activeItemIds.includes(product.id) && activeItems.find(item => item.id === product.id) ? 'active' : ''}
                                                                                    onClick={() => selectSuggestion(product)}
                                                                                >
                                                                                    <div className="search-img">
                                                                                        <Image src={product?.productImage == "" ? "https://res.cloudinary.com/dououppib/image/upload/v1709830638/PLANTS/placeholder_ry6d8v.webp" : product?.productImage} width={30} height={30} alt={product.productName} />
                                                                                    </div>
                                                                                    <p className='title'>{product.productName}</p>
                                                                                </li>
                                                                            ))
                                                                        }

                                                                    </ul>
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="invenShopfy-addsale-product-wrapper">
                                            <div className="invenShopfy-add-adjustment-table mb-5 overflow-y-scroll lg:overflow-hidden">
                                                <div className="invenShopfy-common-small-table mt-0.5 w-[950px] lg:w-full">
                                                    <table>
                                                        <thead>
                                                            <tr className='bg-lightest'>
                                                                <th>Name</th>
                                                                <th>Image</th>
                                                                <th>Code</th>
                                                                <th>Price</th>
                                                                <th>Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                productInformation.length > 0 ? (
                                                                    productInformation.map((product) => <tr key={product.id}>
                                                                        <td>{product.productName}</td>
                                                                        <td>
                                                                            <div className="new-sale-search-img">
                                                                                <Image
                                                                                    src={product.productImage}
                                                                                    width="0"
                                                                                    height="0"
                                                                                    alt={product.productName}
                                                                                    sizes="100vw"
                                                                                    style={{ width: '30px', height: '30px' }}
                                                                                />
                                                                            </div>
                                                                        </td>
                                                                        <td>{product.productCode}</td>
                                                                        <td>{MoneyFormat.format(product.productPrice)}</td>
                                                                        <td>
                                                                            <div className="invenShopfy-addsale-product-action">
                                                                                <button
                                                                                    onClick={() => handleRemoveProduct(product.id)}
                                                                                    className="product-delete-btn"
                                                                                >
                                                                                    <i className="fa-regular fa-xmark"></i>
                                                                                </button>
                                                                            </div>
                                                                        </td>
                                                                    </tr>)
                                                                ) : <tr>
                                                                    <td colSpan={10} className='text-center'>No product entered yet</td>
                                                                </tr>
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="invenShopfy-barcode-print-checkbox">
                                            <span className="text-heading text-[15px] font-bold block pt-6 mb-4">Print Information</span>
                                            <div className="invenShopfy-barcode-checkbox-wrapper flex flex-wrap gap-x-7 gap-y-3 mb-2">
                                                <div className='invenShopfy-checkbox-style'>
                                                    <FormControlLabel
                                                        control={<Checkbox inputProps={{ 'aria-label': 'controlled' }}
                                                            checked={name}
                                                            onChange={(e) => setName(e.target.checked)}
                                                        />}

                                                        label="Name"
                                                    />
                                                </div>
                                                <div className='invenShopfy-checkbox-style'>
                                                    <FormControlLabel
                                                        control={<Checkbox inputProps={{ 'aria-label': 'controlled' }}
                                                            checked={code}
                                                            onChange={(e) => setCode(e.target.checked)}
                                                        />}
                                                        label="Code"
                                                    />
                                                </div>
                                                <div className='invenShopfy-checkbox-style'>
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                inputProps={{ 'aria-label': 'controlled' }}
                                                                checked={price} // bind the checkbox to the state
                                                                onChange={(e) => setPrice(e.target.checked)} // update state with checked value
                                                            />
                                                        }
                                                        label="Price"
                                                    />
                                                </div>
                                            </div>
                                            <div className="invenShopfy-select-field mb-7 pt-3">
                                                <div className="invenShopfy-form-field">
                                                    <h5>Paper Size</h5>
                                                    <div className="invenShopfy-select-field-style">
                                                        <TextField
                                                            select
                                                            label="Select"
                                                            value={selectBarSize}
                                                            onChange={(e) => setSelectBarSize(e.target.value)}
                                                            SelectProps={{
                                                                displayEmpty: true,
                                                                renderValue: (value) => {
                                                                    const sizes: { [key: string]: string } = {
                                                                        "50": "50 mm (1.35 Inch)",
                                                                        "70": "70 mm (1.65 Inch)",
                                                                        "90": "90 mm (1.95 Inch)",
                                                                    };
                                                                    return sizes[value as string] || "Select Size";
                                                                },
                                                            }}
                                                        >
                                                            <MenuItem value="50">50 mm (1.35 Inch)</MenuItem>
                                                            <MenuItem value="70">70 mm (1.65 Inch)</MenuItem>
                                                            <MenuItem value="90">90 mm (1.95 Inch)</MenuItem>
                                                        </TextField>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="invenShopfy-btn-wrapper flex gap-5 justify-end">
                                                <button className='invenShopfy-btn secondary-btn' type="submit">Update</button>
                                                <button className='invenShopfy-btn' type="submit">Print</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="col-span-12 lg:col-span-6">
                                <div className="invenShopfy-barcode-right bg-white p-7 rounded-[3px] border border-solid border-gray-borderThree h-full">
                                    <div className="col-span-12 lg:col-span-6 flex items-center justify-center">
                                        {productCodeName && (
                                            <div className="col-span-6 lg:col-span-4">
                                                <div className="invenShopfy-barcode mb-10 text-center">
                                                    <Barcode value={productCodeName} textPosition={"top"} height={Number(selectBarSize)} />
                                                    {(productCodePrice || productCodeNumber) && (
                                                        <h1
                                                            className="text-heading font-bold text-lg mt-2  text-center" // Utility classes for styling
                                                            style={{ lineHeight: "1.0", letterSpacing: "0.3px" }} // Fine-tuning inline styles
                                                        >
                                                            {productCodePrice && `${MoneyFormat.format(productCodePrice)}`}
                                                            {productCodePrice && productCodeNumber && "-"}
                                                            {productCodeNumber && `${productCodeNumber}`}
                                                        </h1>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default GenerateBarcodeList;
