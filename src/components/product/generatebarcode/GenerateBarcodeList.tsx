'use client'
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Checkbox, FormControlLabel, MenuItem, TextField } from '@mui/material';
import barcodeImg from '../../../../public/assets/img/icon/barcode.png';
import { toast } from 'react-toastify';
import product_data from '@/data/product-data';
import { TProduct } from '@/interFace/interFace';

const GenerateBarcodeList = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchResults, setSearchResults] = useState<TProduct[]>([]);
    const [activeItemIds, setActiveItemIds] = useState<number[]>([]);
    const [activeItems, setActiveItems] = useState<TProduct[]>([]);

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearchQuery(query);

        if (query.trim() === '') {
            setSearchResults([]);
        } else {
            const filteredResults = product_data.filter(product =>
                product.title.toLowerCase().includes(query.toLowerCase())
            );
            setSearchResults(filteredResults);
        }
    };


    const toggleActiveItem = (id: number) => {
        setActiveItemIds(prevState => {
            if (prevState.includes(id)) {
                return prevState.filter(itemId => itemId !== id);
            } else {
                return [...prevState, id];
            }
        });
        updateActiveItems();
    };

    useEffect(() => {
        updateActiveItems();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeItemIds]);

    const updateActiveItems = () => {
        const activeItemsData = product_data.filter(product => activeItemIds.includes(product.id));
        setActiveItems(activeItemsData);
    };

    const handleSearchClose = () => {
        setSearchQuery('');
        setSearchResults([]);
    };

    //hendle increament 
    const handleIncreament = (increaseId: any) => {
        setActiveItems((prevData) => prevData.map((item) => {
            if (increaseId === item.id) {
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item
        }))
    };

    //handle decreament
    const handleDecrement = (decreaseId: any) => {
        setActiveItems((prevData) => prevData.map((item) => {
            if (decreaseId === item.id) {
                return {
                    ...item,
                    quantity: item.quantity - 1 >= 1 ? item.quantity - 1 : 1
                }
            }
            return item
        }))
    };

    const handleRemoveItem = (removeId: number) => {
        const remainingItem = activeItems.filter((item) => item.id !== removeId);
        setActiveItems(remainingItem);
        setActiveItemIds(prevState => prevState.filter(itemId => itemId !== removeId));
    };


    //handle generate barcode 
    const generateBarcodeInputRef = useRef<HTMLInputElement>(null);
    const handleGenerateBarcode = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            toast.success("Barcode Generate successfully!");
            if (generateBarcodeInputRef.current) {
                generateBarcodeInputRef.current.value = '';
                setActiveItems([]);
                setActiveItemIds([]);

            }
        } catch {
            toast.error("Failed to  Generate Barcode. Please try again later.");
        }
    }

    return (
        <>
            <div className="inventual-content-area px-4 sm:px-7">
                <div className="inventual-addbrand-area bg-white p-5 sm:p-7 custom-shadow rounded-8 mt-7">
                    <div className="inventual-barcode-area">
                        <div className="grid grid-cols-12 gap-y-7 sm:gap-7">
                            <div className="col-span-12 lg:col-span-6">
                                <form onSubmit={handleGenerateBarcode}>
                                    <div className="inventual-barcode-left h-full md:mb-7 sm:mb-7">
                                        <div className="inventual-select-field mb-5">
                                            <div className="inventual-form-field">
                                                <h5>Select Product</h5>
                                                <div className="inventual-input-field-style search-field">
                                                    <input
                                                        type="text"
                                                        ref={generateBarcodeInputRef}
                                                        placeholder='Scan / search products by code / name'
                                                        value={searchQuery}
                                                        onChange={handleSearchInputChange}
                                                    />
                                                    {
                                                        searchResults.length > 0 && (
                                                            <div onClick={handleSearchClose} className="search-close">x</div>
                                                        )
                                                    }

                                                    {
                                                        searchResults.length > 0 && (
                                                            <div className='search-dropdown dropdown-scroll'>
                                                                <ul>
                                                                    {
                                                                        searchResults.map(product => (
                                                                            <li
                                                                                key={product.id}
                                                                                id='single-list'
                                                                                className={activeItemIds.includes(product.id) && activeItems.find(item => item.id === product.id) ? 'active' : ''}
                                                                                onClick={() => toggleActiveItem(product.id)}
                                                                            >
                                                                                <div className="search-img">
                                                                                    <Image src={product.image} width={30} height={30} alt={product.title} />
                                                                                </div>
                                                                                <p className='title'>{product.title}</p>
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
                                        <div className="inventual-addsale-product-wrapper">
                                            <div className="inventual-add-adjustment-table mb-5 overflow-y-scroll lg:overflow-hidden">
                                                <div className="inventual-common-small-table mt-0.5 w-[950px] lg:w-full">
                                                    <table>
                                                        <thead>
                                                            <tr className='bg-lightest'>
                                                                <th>Name</th>
                                                                <th>Code</th>
                                                                <th>Quantity</th>
                                                                <th>Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                activeItems.length > 0 ? (
                                                                    activeItems.map((product) => <tr key={product.id}>
                                                                        <td>{product.title}</td>
                                                                        <td>{product.batchNo}</td>
                                                                        <td>
                                                                            <div className="inventual-addsale-product-qty">
                                                                                <span className='flex items-center'>
                                                                                    <button
                                                                                        type='button'
                                                                                        onClick={() => handleDecrement(product.id)}
                                                                                    >
                                                                                        <i className="fa-regular fa-minus"></i>
                                                                                    </button>
                                                                                    <p>{product.quantity}</p>
                                                                                    <button
                                                                                        type='button'
                                                                                        onClick={() => handleIncreament(product.id)}
                                                                                    >
                                                                                        <i className="fa-regular fa-plus"></i>
                                                                                    </button>
                                                                                </span>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            <div className="inventual-addsale-product-action">
                                                                                <button
                                                                                    onClick={() => handleRemoveItem(product.id)}
                                                                                    className="product-delete-btn"
                                                                                >
                                                                                    <i className="fa-regular fa-xmark"></i>
                                                                                </button>
                                                                            </div>
                                                                        </td>
                                                                    </tr>)
                                                                ) : (
                                                                    <tr>
                                                                        <td colSpan={4} className='text-center'> No data available</td>
                                                                    </tr>
                                                                )
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="inventual-barcode-print-checkbox">
                                            <span className="text-heading text-[15px] font-bold block pt-6 mb-4">Print Information</span>
                                            <div className="inventual-barcode-checkbox-wrapper flex flex-wrap gap-x-7 gap-y-3 mb-2">
                                                <div className='inventual-checkbox-style'>
                                                    <FormControlLabel
                                                        control={<Checkbox inputProps={{ 'aria-label': 'controlled' }} />}
                                                        label="Name"
                                                    />
                                                </div>
                                                <div className='inventual-checkbox-style'>
                                                    <FormControlLabel
                                                        control={<Checkbox inputProps={{ 'aria-label': 'controlled' }} />}
                                                        label="Code"
                                                    />
                                                </div>

                                                <div className='inventual-checkbox-style'>
                                                    <FormControlLabel
                                                        control={<Checkbox inputProps={{ 'aria-label': 'controlled' }} />}
                                                        label="Import by Inventual"
                                                    />
                                                </div>
                                                <div className='inventual-checkbox-style'>
                                                    <FormControlLabel
                                                        control={<Checkbox inputProps={{ 'aria-label': 'controlled' }} />}
                                                        label="Price"
                                                    />
                                                </div>
                                                <div className='inventual-checkbox-style'>
                                                    <FormControlLabel
                                                        control={<Checkbox inputProps={{ 'aria-label': 'controlled' }} />}
                                                        label="Promotional Price"
                                                    />
                                                </div>
                                            </div>
                                            <div className="inventual-select-field mb-7 pt-3">
                                                <div className="inventual-form-field">
                                                    <h5>Paper Size</h5>
                                                    <div className="inventual-select-field-style">
                                                        <TextField
                                                            select
                                                            label="Select"
                                                            defaultValue=""
                                                            SelectProps={{
                                                                displayEmpty: true,
                                                                renderValue: (value: any) => {
                                                                    if (value === '') {
                                                                        return <em>Select Size</em>;
                                                                    }
                                                                    return value;
                                                                },
                                                            }}
                                                        >
                                                            <MenuItem value="">
                                                                <em>Select Size</em>
                                                            </MenuItem>
                                                            <MenuItem value="50 mm (1.95 Inch)">50 mm (1.95 Inch)</MenuItem>
                                                            <MenuItem value="40 mm (1.65 Inch)">40 mm (1.65 Inch)</MenuItem>
                                                            <MenuItem value="30 mm (1.35 Inch)">30 mm (1.35 Inch)</MenuItem>
                                                        </TextField>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="inventual-btn-wrapper flex gap-5 justify-end">
                                                <button className='inventual-btn secondary-btn' type="submit">Update</button>
                                                <button className='inventual-btn' type="submit">Print</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="col-span-12 lg:col-span-6">
                                <div className="inventual-barcode-right bg-white p-7 rounded-[3px] border border-solid border-gray-borderThree h-full">
                                    <div className="grid grid-cols-12 gap-x-5">
                                        <div className="col-span-6 lg:col-span-4">
                                            <div className="inventual-barcode mb-10 text-center">
                                                <Image src={barcodeImg} style={{ width: "173", height: 'auto' }} alt="user not found" />
                                            </div>
                                        </div>
                                        <div className="col-span-6 lg:col-span-4">
                                            <div className="inventual-barcode mb-10 text-center">
                                                <Image src={barcodeImg} style={{ width: "173", height: 'auto' }} alt="user not found" />
                                            </div>
                                        </div>
                                        <div className="col-span-6 lg:col-span-4">
                                            <div className="inventual-barcode mb-10 text-center">
                                                <Image src={barcodeImg} style={{ width: "173", height: 'auto' }} alt="user not found" />
                                            </div>
                                        </div>
                                        <div className="col-span-6 lg:col-span-4">
                                            <div className="inventual-barcode mb-10 text-center">
                                                <Image src={barcodeImg} style={{ width: "173", height: 'auto' }} alt="user not found" />
                                            </div>
                                        </div>
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
