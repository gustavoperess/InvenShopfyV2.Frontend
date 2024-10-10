"use client"
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import product_data from '@/data/product-data';
import { TProduct } from '@/interFace/interFace';
import { MenuItem, TextField } from '@mui/material';
import DatePicker from "react-datepicker";
import { toast } from 'react-toastify';


const SaleInvoiceList = () => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchResults, setSearchResults] = useState<TProduct[]>([]);
    const [activeItemIds, setActiveItemIds] = useState<number[]>([]);
    const [activeItems, setActiveItems] = useState<TProduct[]>([]);
    const [shippingAmount, setShippingAmount] = useState(0);


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



    // calculate order tax
    const calculateTax = () => {
        return activeItems.reduce((totalTax, item) => {
            const itemTax = (item.price * item.tax / 100) * item.quantity;
            return totalTax + itemTax;
        }, 0);
    }

    //claculate discount
    const calculateDiscount = () => {
        return activeItems.reduce((totalDiscount, item) => {
            const itemDiscount = (item.price * item.discount / 100) * item.quantity;
            return totalDiscount + itemDiscount;
        }, 0)
    }

    //calculate subtotal
    const calculateSubtotal = (product: any) => {
        let tax = 0;
        let discount = 0;
        tax = product.price * product.tax / 100;
        discount = product.price * product.discount / 100;
        const subTotal = (product.price + tax - discount) * product.quantity;
        return subTotal;
    }

    // calculate total sum of all subtotals
    const calculateTotal = () => {
        return activeItems.reduce((total, item) => {
            return total + item.price * item.quantity;
        }, 0);
    }
    // calculate total sum of all subtotals
    const calculateGrandTotal = () => {
        return calculateTotal() + shippingAmount + calculateTax() - calculateDiscount();
    }

    //handle remove row data
    const handleRemoveRowData = (productId: any) => {
        const remainingItem = activeItems.filter((product) => product.id !== productId);
        setActiveItems(remainingItem)
    }

    // handle shipping value change
    const handleShippingValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        const amount = parseFloat(event.target.value);
        setShippingAmount(isNaN(amount) ? 0 : amount)
    }

    //handle New sale 
    const newSaleInputRef = useRef<HTMLInputElement>(null);
    const [selectWarehouse, setSelectWarehosue] = useState('')
    const [selectBiller, setSelectBiller] = useState('')

    const handleNewSaleForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            toast.success("Invoice Created successfully!");
            if (newSaleInputRef.current) {
                newSaleInputRef.current.value = '';
                setActiveItems([]);
                setActiveItemIds([]);
                setStartDate(null);
                setSelectWarehosue('')
                setSelectBiller('')
            }
        } catch {
            toast.error("Failed to  create Invoice. Please try again later.");
        }
    }

    return (
        <>
            <div className="inventual-content-area px-4 sm:px-7">
                <div className="inventual-newsale-area bg-white p-5 sm:p-7 custom-shadow rounded-8 mt-7">
                    <form onSubmit={handleNewSaleForm}>
                        <div className="grid grid-cols-12 gap-y-7 sm:gap-7">
                            <div className="col-span-12">
                                <div className="grid grid-cols-12 gap-y-7 sm:gap-7">
                                    <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                        <div className="inventual-form-field">
                                            <h5>Date</h5>
                                            <div className="inventual-input-field-style">
                                                <DatePicker
                                                    selected={startDate}
                                                    required
                                                    onChange={(date) => setStartDate(date)}
                                                    showYearDropdown
                                                    showMonthDropdown
                                                    useShortMonthInDropdown
                                                    showPopperArrow={false}
                                                    peekNextMonth
                                                    dropdownMode="select"
                                                    isClearable
                                                    placeholderText="DD/MM/YYYY"
                                                    className="w-full"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                        <div className="inventual-form-field">
                                            <h5>Select Warehouse</h5>
                                            <div className="inventual-select-field-style">
                                                <TextField
                                                    select
                                                    required
                                                    label="Select"
                                                    defaultValue=""
                                                    value={selectWarehouse}
                                                    onChange={(e)=> setSelectWarehosue(e.target.value)}
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
                                                    <MenuItem value="United States">United States</MenuItem>
                                                    <MenuItem value="Canada">Canada</MenuItem>
                                                    <MenuItem value="Mexico">Mexico</MenuItem>
                                                    <MenuItem value="France">France</MenuItem>
                                                    <MenuItem value="Germany">Germany</MenuItem>
                                                </TextField>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                        <div className="inventual-form-field">
                                            <h5>Select Biller</h5>
                                            <div className="inventual-select-field-style">
                                                <TextField
                                                    select
                                                    required
                                                    label="Select"
                                                    defaultValue=""
                                                    value={selectBiller}
                                                    onChange={(e)=> setSelectBiller(e.target.value)}
                                                    SelectProps={{
                                                        displayEmpty: true,
                                                        renderValue: (value: any) => {
                                                            if (value === '') {
                                                                return <em>Select Biller</em>;
                                                            }
                                                            return value;
                                                        },
                                                    }}
                                                >
                                                    <MenuItem value="">
                                                        <em>Select Biller</em>
                                                    </MenuItem>
                                                    <MenuItem value="Shane Watson">Shane Watson</MenuItem>
                                                    <MenuItem value="David Warner">David Warner</MenuItem>
                                                    <MenuItem value="David Miller">David Miller</MenuItem>
                                                    <MenuItem value="Hashim Amla">Hashim Amla</MenuItem>
                                                    <MenuItem value="Imran Tahir">Imran Tahir</MenuItem>
                                                </TextField>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12">
                                        <div className="inventual-select-field">
                                            <div className="inventual-form-field">
                                                <h5>Select Product</h5>
                                                <div className="inventual-input-field-style search-field">
                                                    <input
                                                        type="text"
                                                        ref={newSaleInputRef}
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
                                    <div className="col-span-12">
                                        <div className="inventual-add-adjustment-table mt-5 overflow-y-scroll xl:overflow-hidden">
                                            <div className="inventual-common-small-table mt-0.5 w-[1150px] xl:w-full">
                                                <table>
                                                    <thead>
                                                        <tr className='bg-lightest'>
                                                            <th>Image</th>
                                                            <th>Products</th>
                                                            <th>Batch No</th>
                                                            <th>Unit</th>
                                                            <th>Price</th>
                                                            <th>Quantity</th>
                                                            <th>Discount</th>
                                                            <th>Tax</th>
                                                            <th>Sub Total</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            activeItems.length > 0 ? (
                                                                activeItems.map((product) => <tr key={product.id}>
                                                                    <td>
                                                                        <div className="new-sale-search-img">
                                                                            <Image src={product.image} width={30} height={30} alt={product.title} />
                                                                        </div>
                                                                    </td>
                                                                    <td>{product.title}</td>
                                                                    <td>{product.batchNo}</td>
                                                                    <td>{product.unit}</td>
                                                                    <td>${product.price}</td>
                                                                    <td>
                                                                        <div className="inventual-addsale-product-qty">
                                                                            <span className='flex items-center'>
                                                                                <button type='button' onClick={() => handleDecrement(product.id)}><i className="fa-regular fa-minus"></i></button>
                                                                                <p>{product.quantity}</p>
                                                                                <button type='button' onClick={() => handleIncreament(product.id)}><i className="fa-regular fa-plus"></i></button>
                                                                            </span>
                                                                        </div>
                                                                    </td>
                                                                    <td>{product.discount}%</td>
                                                                    <td>{product.tax}%</td>
                                                                    <td>${calculateSubtotal(product)}</td>
                                                                    <td>
                                                                        <div className="inventual-addsale-product-action">
                                                                            <button
                                                                                onClick={() => handleRemoveRowData(product.id)}
                                                                                className="product-delete-btn"
                                                                            >
                                                                                <i className="fa-regular fa-xmark"></i>
                                                                            </button>
                                                                        </div>
                                                                    </td>
                                                                </tr>)
                                                            ) : <tr>
                                                                <td colSpan={10} className='text-center'>Data not found</td>
                                                            </tr>
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="inventual-addsale-product-cost text-end pt-9 pb-9 border border-t-0 border-border">
                                            <ul>
                                                <li className="px-4 py-2.5 border-b border-solid border-border">
                                                    <span className="text-[15px] font-normal text-heading w-40 inline-block">
                                                        Total Amount
                                                        <span className="float-end">:</span>
                                                    </span>
                                                    <span className="text-[15px] font-normal text-heading inline-block">${calculateTotal()}</span>
                                                </li>
                                                <li className="px-4 py-2.5 border-b border-solid border-border bg-lightest">
                                                    <span className="text-[15px] font-normal text-heading w-40 inline-block">
                                                        Order Tax
                                                        <span className="float-end">:</span>
                                                    </span>
                                                    <span className="text-[15px] font-normal text-heading inline-block">+${calculateTax()}</span>
                                                </li>
                                                <li className="px-4 py-2.5 border-b border-solid border-border">
                                                    <span className="text-[15px] font-normal text-heading w-40 inline-block">
                                                        Discount
                                                        <span className="float-end">:</span>
                                                    </span>
                                                    <span className="text-[15px] font-normal text-heading inline-block">-${calculateDiscount()}</span>
                                                </li>
                                                <li className="px-4 py-2.5 border-b border-solid border-border bg-lightest">
                                                    <span className="text-[15px] font-normal text-heading w-40 inline-block">
                                                        Shipping
                                                        <span className="float-end">:</span>
                                                    </span>
                                                    <span className="text-[15px] font-normal text-heading inline-block">${shippingAmount}</span>
                                                </li>
                                                <li className="px-4 py-2.5">
                                                    <span className="text-[15px] font-bold text-heading w-40 inline-block">
                                                        Grand Total
                                                        <span className="float-end font-normal">:</span>
                                                    </span>
                                                    <span className="text-[15px] font-bold text-heading inline-block">${calculateGrandTotal()}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6">
                                        <div className="inventual-form-field">
                                            <h5>Shipping</h5>
                                            <div className="inventual-input-field-style has-icon-outline">
                                                <input
                                                    type="text"
                                                    placeholder='0'
                                                    value={shippingAmount}
                                                    onChange={handleShippingValue}
                                                />
                                                <span className='inventual-input-icon'><span>$</span></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6">
                                        <div className="inventual-form-field">
                                            <h5>Sale Status</h5>
                                            <div className="inventual-select-field-style">
                                                <TextField
                                                    select
                                                    label="Select"
                                                    defaultValue=""
                                                    SelectProps={{
                                                        displayEmpty: true,
                                                        renderValue: (value: any) => {
                                                            if (value === '') {
                                                                return <em>Select Status</em>;
                                                            }
                                                            return value;
                                                        },
                                                    }}
                                                >
                                                    <MenuItem value="">
                                                        <em>Select Status</em>
                                                    </MenuItem>
                                                    <MenuItem value="Complete">Complete</MenuItem>
                                                    <MenuItem value="Incomplete">Incomplete</MenuItem>
                                                    <MenuItem value="Drafts">Drafts</MenuItem>
                                                </TextField>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12">
                                        <div className="inventual-form-field">
                                            <h5>Sales Note:</h5>
                                            <div className="inventual-input-field-style">
                                                <textarea placeholder='Write your note...'></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 flex justify-end">
                                        <button type="submit" className="inventual-btn">Create Invoice</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default SaleInvoiceList;