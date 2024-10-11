"use client"
import React, { useEffect, useRef, useState } from 'react';
import DatePicker from "react-datepicker";
import { MenuItem, TextField, } from '@mui/material';
import Image from 'next/image';
import { TProduct } from '@/interFace/interFace';
import product_data from '@/data/product-data';
import { toast } from 'react-toastify';


const AddAdjustmentList = () => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchResults, setSearchResults] = useState<TProduct[]>([]);
    const [activeItemIds, setActiveItemIds] = useState<number[]>([]);
    const [activeItems, setActiveItems] = useState<TProduct[]>([]);
    const [fileUrls, setFileUrls] = useState<string[]>([]);

    // uploaded images
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const fileId = URL.createObjectURL(file);
            setFileUrls(prevUrls => [...prevUrls, fileId]);
        }
    };

    //handle image remove
    const handleRemoveImage = (imageIndex: any) => {
        const remainingItem = fileUrls.filter((item, index) => index !== imageIndex);
        setFileUrls(remainingItem)
    }

    //handle search data from product
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

    //toggle serch data for active or inactive
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

    //
    useEffect(() => {
        updateActiveItems();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeItemIds]);

    const updateActiveItems = () => {
        const activeItemsData = product_data.filter(product => activeItemIds.includes(product.id));
        setActiveItems(activeItemsData);
    };

    //handler for close search with close btn
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
    //remove item from active item
    const handleRemoveItem = (removeId: number) => {
        const remainingItem = activeItems.filter((item) => item.id !== removeId);
        setActiveItems(remainingItem);
        setActiveItemIds(prevState => prevState.filter(itemId => itemId !== removeId));
    };
    //handle generate barcode 
    const adjustmentInputRef = useRef<HTMLInputElement>(null);
    const [mainWarehouse, setMainWarehouse] = useState<String>('')
    const handleAdjustmentForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            toast.success("Adjustment Created successfully!");
            if (adjustmentInputRef.current) {
                adjustmentInputRef.current.value = '';
                setActiveItems([]);
                setActiveItemIds([]);
                setMainWarehouse('');
                setStartDate(null);
                setFileUrls([])

            }
        } catch {
            toast.error("Failed to  create adjustmnet. Please try again later.");
        }
    }

    return (
        <>
            <div className="inventual-content-area px-4 sm:px-7">
                <div className="inventual-addadjustment-area bg-white p-5 sm:p-7 custom-shadow rounded-8 mt-7">
                    <form onSubmit={handleAdjustmentForm}>
                        <div className="inventual-barcode-area">
                            <div className="inventual-addbrand-upload-area flex maxSm:flex-wrap gap-7 mb-7">
                                <div className="inventual-input-field-style relative">
                                    <div className="inventual-input-field-file-image image-1">
                                        <label htmlFor="fileUpload">
                                            {
                                                fileUrls.length > 0 ? (
                                                    "Uploaded Image"
                                                ) : ("Upload Image")
                                            }
                                        </label>
                                        <input
                                            type="file"
                                            accept='image/*'
                                            id="fileUpload"
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                    {/* Display uploaded images */}
                                    <div className="image-flex">
                                        {fileUrls.map((url, index) => (
                                            <div key={index} className="inventual-drag-product-img mt-5">
                                                <Image width={60} height={60} src={url} alt={`Uploaded Image ${index}`} />
                                                <button className='inventual-inventual-drag-close' onClick={() => handleRemoveImage(index)}>X</button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="grid grid-cols-12 w-full gap-5">
                                    <div className="col-span-12 md:col-span-6">
                                        <div className="inventual-form-field">
                                            <h5>Date</h5>
                                            <div className="inventual-input-field-style">
                                                <DatePicker
                                                    required
                                                    selected={startDate}
                                                    onChange={(date) => setStartDate(date)}
                                                    showYearDropdown
                                                    showMonthDropdown
                                                    useShortMonthInDropdown
                                                    showPopperArrow={false}
                                                    peekNextMonth
                                                    dropdownMode="select"
                                                    isClearable
                                                    placeholderText="MM/DD/YYYY"
                                                    className="w-full"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6">
                                        <div className="inventual-form-field">
                                            <h5>Warehouse</h5>
                                            <div className="inventual-select-field-style">
                                                <TextField
                                                    select
                                                    required
                                                    label="Select"
                                                    defaultValue=""
                                                    value={mainWarehouse}
                                                    onChange={(e) => setMainWarehouse(e.target.value)}
                                                    SelectProps={{
                                                        displayEmpty: true,
                                                        renderValue: (value: any) => {
                                                            if (value === '') {
                                                                return <em>Select Warehouse</em>;
                                                            }
                                                            return value;
                                                        },
                                                    }}
                                                >
                                                    <MenuItem value="">
                                                        <em>Select Warehouse</em>
                                                    </MenuItem>
                                                    <MenuItem value="Warehouse 1">Warehouse 1</MenuItem>
                                                    <MenuItem value="Warehouse 2">Warehouse 2</MenuItem>
                                                    <MenuItem value="Warehouse 3">Warehouse 3</MenuItem>
                                                </TextField>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-12 mb-4">
                                <div className="inventual-select-field">
                                    <div className="inventual-form-field">
                                        <h5>Select Product</h5>
                                        <div className="inventual-input-field-style search-field">
                                            <input
                                                type="text"
                                                ref={adjustmentInputRef}
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
                            </div>
                            <div className="col-span-12 lg:col-span-6">
                                <div className="inventual-add-adjustment-table mb-5 overflow-y-scroll lg:overflow-hidden">
                                    <div className="inventual-common-small-table mt-0.5 w-[950px] lg:w-full">
                                        <table>
                                            <thead>
                                                <tr className='bg-lightest'>
                                                    <th>Id </th>
                                                    <th>Name</th>
                                                    <th>Code</th>
                                                    <th>Quantity</th>
                                                    <th>Type</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    activeItems.length > 0 ? (
                                                        activeItems.map((product) => <tr key={product.id}>
                                                            <td>{product.id}</td>
                                                            <td>{product.title}</td>
                                                            <td>{product.batchNo}</td>
                                                            <td>
                                                                <div className="inventual-addsale-product-qty">
                                                                    <span className='flex items-center'>
                                                                        <button
                                                                            onClick={() => handleDecrement(product.id)}
                                                                            type='button'
                                                                        >
                                                                            <i className="fa-regular fa-minus"></i>
                                                                        </button>
                                                                        <p>{product.quantity}</p>
                                                                        <button
                                                                            onClick={() => handleIncreament(product.id)}
                                                                            type='button'
                                                                        >
                                                                            <i className="fa-regular fa-plus"></i>
                                                                        </button>
                                                                    </span>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="inventual-form-field">
                                                                    <div className="inventual-select-field-style">
                                                                        <TextField
                                                                            select
                                                                            label="Select"
                                                                            defaultValue=""
                                                                            SelectProps={{
                                                                                displayEmpty: true,
                                                                                renderValue: (value: any) => {
                                                                                    if (value === '') {
                                                                                        return <em>Select Option</em>;
                                                                                    }
                                                                                    return value;
                                                                                },
                                                                            }}
                                                                        >
                                                                            <MenuItem value="">
                                                                                <em>Select Option</em>
                                                                            </MenuItem>
                                                                            <MenuItem value="Addition">Addition</MenuItem>
                                                                            <MenuItem value="Subtraction">Subtraction</MenuItem>
                                                                        </TextField>
                                                                    </div>
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
                                                    ) : <tr>
                                                        <td colSpan={6} className='text-center'>data not found</td>
                                                    </tr>
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button className='inventual-btn primary-btn' type="submit">Create Adjustment</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddAdjustmentList;