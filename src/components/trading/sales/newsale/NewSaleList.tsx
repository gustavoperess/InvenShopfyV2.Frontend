"use client"
import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { MenuItem, TextField, InputAdornment } from '@mui/material';
import DatePicker from "react-datepicker";
import { toast } from 'react-toastify';
import { NumericFormat } from 'react-number-format';
import { useCreateSaleMutation } from '@/services/Sales/Sales';
import { useGetWarehouseNamesQuery } from '@/services/Warehouse/Warehouse';
import { useGetCustomerNamesQuery } from '@/services/People/Customer';
// import { useGetBillerNamesQuery } from '@/services/People/Biller';
import { useGetAllBillersNewQuery } from '@/services/User/User';
import { useGetProductByNameQuery } from '@/services/Product/Product';
import { TProductInterface, TWarehouseInterface, TCustomerInterface, MoneyFormat, TBillerInterfaceTwo } from '@/interFace/interFace';


const NewSaleList = () => {
    const [saleDate, setSaleDate] = useState(new Date());
    const [product, setProduct] = useState<string>("");
    const [productName, setProductName] = useState<string>("");
    const [shippingCost, setShippingCost] = useState<number | undefined>();
    const [discount, setDiscount] = useState<number | undefined>();
    const [saleStatus, setSalesStatus] = useState<string>("");
    const [saleNote, setSaleNote] = useState<string>("");
    const [staffNote, setStaffNote] = useState<string>("");
    const [productInformation, setProductInformation] = useState<TProductInterface[]>([]);
    const [suggestions, setSuggestions] = useState<TProductInterface[]>([]);
    const [customerId, setCustomerId] = useState('')
    const [warehouseId, setWarehouseId] = useState('')
    const [billerId, setBillerId] = useState('')

    // funcitons
    const debouncedSearchTerm = useDebounce(productName, 500);


    const [addSale] = useCreateSaleMutation();


    //datas

    const { data: customerData } = useGetCustomerNamesQuery({ pageNumber: 1, pageSize: 25 });
    const { data: billerDataNew } = useGetAllBillersNewQuery();
    const { data: warehouseData } = useGetWarehouseNamesQuery({ pageNumber: 1, pageSize: 25 });
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchResults, setSearchResults] = useState<TProductInterface[]>([]);
    const [activeItemIds, setActiveItemIds] = useState<number[]>([]);
    const [activeItems, setActiveItems] = useState<TProductInterface[]>([]);
  
   

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
 

    const selectSuggestion = (suggestion: Omit<TProductInterface, 'quantitySold' | 'totalAmountSold'>) => {
        const existingProductIndex = productInformation.findIndex(product => product.productName === suggestion.productName);
        if (existingProductIndex !== -1) {
            setProductInformation(prev => {
                const updatedProducts = prev.map((product, index) => {
                    if (index === existingProductIndex && product.stockQuantity > 0) {
                        return {
                            ...product,
                            stockQuantity: product.stockQuantity - 1,
                            quantitySold: product.quantitySold + 1,
                            totalAmountSold: product.totalAmountSold + product.productPrice
                        };
                    }
                    return product;
                });
                return updatedProducts;
            });
        } else {
            if (suggestion.stockQuantity > 0) {
                setProductInformation(prev => [
                    ...prev,
                    { ...suggestion, quantitySold: 1, totalAmountSold: suggestion.productPrice, stockQuantity: suggestion.stockQuantity - 1}
                ]);

            } else {
                setProductInformation(prev => [
                    ...prev,
                    { ...suggestion, quantitySold: 0, totalAmountSold: suggestion.productPrice }
                ]);
            }
        }

        // Additional updates
        setSuggestions([]);
        setProduct("");
    };


    //handler for close search with close btn
    const handleSearchClose = () => {
        setSearchQuery('');
        setSearchResults([]);
    };

    //hendle increament 
    const handleIncrement = (increaseId: any, e: React.MouseEvent<HTMLButtonElement>) => {
        let newQuantity = Number(e.currentTarget.getAttribute('data-quantity')) + 1;
        setProductInformation((prevData) => prevData.map((item) => {

            if (increaseId === item.id) {
                return {
                    ...item,
                    quantitySold: newQuantity,
                    stockQuantity: item.stockQuantity - 1 >= 1 ? item.stockQuantity - 1 : 1
                }   
            }
            return item
        }))
    };

    //handle decreament
    const handleDecrement = (decreaseId: any, e: React.MouseEvent<HTMLButtonElement>) => {
        let newQuantity = Number(e.currentTarget.getAttribute('data-quantity')) - 1;
        if (newQuantity >= 0) {
        setProductInformation((prevData) => prevData.map((item) => {
            if (decreaseId === item.id) {
                return {
                    ...item,
                    quantitySold: newQuantity,
                    stockQuantity: item.stockQuantity + 1
                   
                }
            }
            return item
        }))
        }
    };

    // calculate order tax
    const calculateTheAmountOfProductsAdded = () => {
        if (productInformation.length > 0) {
            return productInformation.reduce((accumulator, item) => {
                return item.stockQuantity > 0 
                    ? accumulator + item.quantitySold 
                    : accumulator;
            }, 0);
        } 
    };

    //claculate discount
    const calculateDiscount = () => {
        return productInformation.reduce((totalDiscount) => {
            if (discount != undefined) {
                if(shippingCost != undefined) {
                    return ((calculateTotal() + shippingCost ) * discount ) / 100
                } else {
                    return ((calculateTotal()) * discount ) / 100
                }
            } else {
                return totalDiscount;
            }
        }, 0)
    }


    // calculate total sum of all subtotals
    const calculateTotal = () => {
        return productInformation.reduce((total, item) => {
            if (item.stockQuantity > 0) {
                return total + item.productPrice * item.quantitySold;
            } 
            return total;
        }, 0);
    }
   
     // calculate order tax
     const calculateTotalTax = () => {
        return productInformation.reduce((total, item) => {
            if (item.quantitySold != undefined) {
                return (((item.productPrice * item.quantitySold) * item.taxPercentage) / 100) + total;
            }
            return total;
        }, 0);
    }

    const calculateProfit = useMemo(() => {
        return productInformation.reduce((total, item) => {
           
            if (item.quantitySold != undefined) {
                let firstNumber = Number(item.marginRange.split("%")[0]);
                let lastNumber = Number(item.marginRange.split(" ")[item.marginRange.split(" ").length - 1].split("%")[0]);
                let randomNumber = Math.floor(Math.random() * (lastNumber - firstNumber + 1)) + firstNumber;
                if (!isNaN(firstNumber) && !isNaN(lastNumber)) {
                    return ((item.productPrice * item.quantitySold * randomNumber) / 100) + total;
                }
            }
            return total;
        }, 0);
    }, [productInformation]);  

 
     const calculateGrandTotal = useMemo(() => {
        const total = calculateTotal();
        const discount = calculateDiscount();
        const tax = calculateTotalTax();
    
        if (shippingCost != undefined) {
            return (total + tax + shippingCost + calculateProfit) - discount;
        } else {
            return total - discount;
        }
    }, [calculateTotal, calculateDiscount, calculateTotalTax, shippingCost, calculateProfit]);




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
    // handle Date
    const handleDateChange = (date: Date | null) => {
        setSaleDate(date || new Date());
    };

    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    //handle new Sale Form submission
    const handleNewSaleForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let productIdPlusQuantity: { [key: number]: number } = {};
        productInformation.forEach(product => {
            if (product.quantitySold > 0) {
                productIdPlusQuantity[product.id] = product.quantitySold; 
            }
        });
        let date = formatDate(saleDate)

        const saleData = {customerId, warehouseId, productIdPlusQuantity, discount,
            billerId, saleDate: date, shippingCost, staffNote, saleNote, saleStatus, taxAmount: calculateTotalTax(),
            totalAmount: calculateGrandTotal, profitAmount: calculateProfit }

        try {
            await addSale(saleData).unwrap();
            toast.success("Sale Created successfully!");
                setActiveItems([]);
                setActiveItemIds([]);
                setSaleDate(new Date());
                setWarehouseId("")
                setCustomerId("")
                setBillerId("")
                setSalesStatus("")
                setSaleNote("")
                setStaffNote("")
                setProductInformation([])
                setDiscount(undefined)
                setShippingCost(undefined)
        } catch (error: any) {
            if (error?.data?.message) {
                toast.error(error?.data?.message);
            } 
            else {
                // Fallback error message
                toast.error("Failed to create Sale. Please try again later.");
            }
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
                                    <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-3">
                                        <div className="inventual-formTwo-field">
                                            <h5>Date</h5>
                                            <div className="inventual-input-field-style">
                                                <DatePicker
                                                    selected={saleDate}
                                                    required
                                                    onChange={handleDateChange}
                                                    showYearDropdown
                                                    showMonthDropdown
                                                    useShortMonthInDropdown
                                                    showPopperArrow={false}
                                                    peekNextMonth
                                                    dropdownMode="select"
                                                    isClearable
                                                    placeholderText="DD/MM/YYYY"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-3">
                                        <div className="inventual-select-field">
                                            <div className="inventual-form-field">
                                                <h5>Select Customer</h5>
                                                <div className="inventual-select-field-style">
                                                    <TextField
                                                        select
                                                        label="Select"
                                                        required
                                                        value={customerId}
                                                        onChange={(e) => setCustomerId(e.target.value)}
                                                        SelectProps={{
                                                            displayEmpty: true,
                                                            renderValue: (value: any) => {
                                                                const selectedCustomer = customerData?.data.find((customer: TCustomerInterface) => customer.id === value);
                                                                return selectedCustomer ? selectedCustomer.name : <em>Select Customer</em>;
                                                            },
                                                        }}>
                                                        {customerData && customerData.data.length > 0 ? (
                                                            customerData.data.map((customer: TCustomerInterface) => (
                                                                <MenuItem key={customer.id} value={customer.id}>
                                                                    {customer.customerName}
                                                                </MenuItem>
                                                            ))
                                                        ) : (
                                                            <MenuItem value="">
                                                                <em>No Customer Available</em>
                                                            </MenuItem>
                                                        )}
                                                    </TextField>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-3">
                                        <div className="inventual-select-field">
                                            <div className="inventual-form-field">
                                                <h5>Select Warehouse</h5>
                                                <div className="inventual-select-field-style">
                                                    <TextField
                                                        select
                                                        label="Select"
                                                        required
                                                        value={warehouseId}
                                                        onChange={(e) => setWarehouseId(e.target.value)}
                                                        SelectProps={{
                                                            displayEmpty: true,
                                                            renderValue: (value: any) => {
                                                                const selectedWarehouse = warehouseData?.data.find((warehouse: TWarehouseInterface) => warehouse.id === value);
                                                                return selectedWarehouse ? selectedWarehouse.warehouseTitle : <em>Select Warehouse</em>;
                                                            },
                                                        }}>
                                                        {warehouseData && warehouseData.data.length > 0 ? (
                                                            warehouseData.data.map((warehouse: TWarehouseInterface) => (
                                                                <MenuItem key={warehouse.id} value={warehouse.id}>
                                                                    {warehouse.warehouseTitle}
                                                                </MenuItem>
                                                            ))
                                                        ) : (
                                                            <MenuItem value="">
                                                                <em>No Warehouse Available</em>
                                                            </MenuItem>
                                                        )}
                                                    </TextField>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-3">
                                        <div className="inventual-select-field">
                                            <div className="inventual-form-field">
                                                <h5>Select Biller</h5>
                                                <div className="inventual-select-field-style">
                                                    <TextField
                                                        select
                                                        label="Select"
                                                        required
                                                        value={billerId}
                                                        onChange={(e) => setBillerId(e.target.value)}
                                                        SelectProps={{
                                                            displayEmpty: true,
                                                            renderValue: (value: any) => {
                                                                const selectedBiller = billerDataNew?.find((biller: TBillerInterfaceTwo) => biller.userId === value);
                                                                return selectedBiller ? selectedBiller.userName : <em>Select Biller</em>;
                                                            },
                                                        }}>
                                                        {billerDataNew && billerDataNew?.length > 0 ? (
                                                            billerDataNew.map((biller: TBillerInterfaceTwo) => (
                                                                <MenuItem key={biller.userId} value={biller.userId}>
                                                                    {biller.userName}
                                                                </MenuItem>
                                                            ))
                                                        ) : (
                                                            <MenuItem value="">
                                                                <em>No Biller Available</em>
                                                            </MenuItem>
                                                        )}
                                                    </TextField>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12">
                                        <div className="inventual-select-field">
                                            <div className="inventual-form-field">
                                                <h5>Select Product</h5>
                                                <div className="inventual-input-field-style search-field">
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
                                    <div className="col-span-12">
                                        <div className="inventual-add-adjustment-table mt-5 overflow-y-scroll xl:overflow-hidden">
                                            <div className="inventual-common-small-table mt-0.5 w-[1150px] xl:w-full">
                                                <table>
                                                    <thead>
                                                        <tr className='bg-lightest'>
                                                            <th>Id</th>
                                                            <th>Image</th>
                                                            <th>Product</th>
                                                            <th>Code</th>
                                                            <th>Category</th>
                                                            <th>Price</th>
                                                            <th>Stock Amount</th>
                                                            <th>Tax</th>
                                                            <th>Margin Range</th>
                                                            <th>Quantity Sold</th>
                                                            <th>Expired</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            productInformation.length > 0 ? (
                                                                productInformation.map((product) => <tr key={product.id}>
                                                                    <td>{product.id}</td>
                                                                    <td>
                                                                        <div className="new-sale-search-img">
                                                                            <Image src={product.productImage} width={30} height={30} alt={product.productName} />
                                                                        </div>
                                                                    </td>
                                                                    <td>{product.productName}</td>
                                                                    <td>{product.productCode}</td>
                                                                    <td>{product.mainCategory} [{product.subcategory}]</td>
                                                                     <td>{MoneyFormat.format(product.productPrice)}</td>
                                                                    <td>{product.stockQuantity}</td>
                                                                    <td>{product.taxPercentage}%</td>
                                                                    <td>{product.marginRange}</td>
                                                                    <td>
                                                                    {product.stockQuantity > 0 ? (
                                                                            <div className="inventual-addsale-product-qty">
                                                                                <span className='flex items-center'>
                                                                                    <button type='button' data-quantity={product.quantitySold} onClick={(e) => handleDecrement(product.id, e)}>
                                                                                        <i className="fa-regular fa-minus"></i>
                                                                                    </button>
                                                                                    <p>{product.quantitySold}</p>
                                                                                    <button type='button' data-quantity={product.quantitySold} onClick={(e) => handleIncrement(product.id, e)}>
                                                                                        <i className="fa-regular fa-plus"></i>
                                                                                    </button>
                                                                                </span>
                                                                            </div>
                                                                     ) : ( <p>Product out of stock</p>      
                                                                     )}
                                                                    </td>
                                                                    <td>{product.expired ? "Yes" : "No"}</td>
                                                                    <td>
                                                                        <div className="inventual-addsale-product-action">
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
                                        <div className="inventual-addsale-product-cost text-end pt-9 pb-9 border border-t-0 border-border">
                                            <ul>
                                                <li className="px-4 py-2.5 border-b border-solid border-border">
                                                    <span className="text-[15px] font-normal text-heading w-40 inline-block">
                                                        Total Amount
                                                        <span className="float-end">:</span>
                                                    </span>
                                                    <span className="text-[15px] font-normal text-heading inline-block">{MoneyFormat.format(calculateTotal())}</span>
                                                </li>
                                                <li className="px-4 py-2.5 border-b border-solid border-border bg-lightest">
                                                    <span className="text-[15px] font-normal text-heading w-40 inline-block">
                                                        Number of Products
                                                        <span className="float-end">:</span>
                                                    </span>
                                                    <span className="text-[15px] font-normal text-heading inline-block">{calculateTheAmountOfProductsAdded()}</span>
                                                </li>
                                                <li className="px-4 py-2.5 border-b border-solid border-border">
                                                    <span className="text-[15px] font-normal text-heading w-40 inline-block">
                                                        Discount
                                                        <span className="float-end">:</span>
                                                    </span>
                                                    <span className="text-[15px] font-normal text-heading inline-block">{MoneyFormat.format(calculateDiscount())}</span>
                                                </li>
                                                <li className="px-4 py-2.5 border-b border-solid border-border bg-lightest">
                                                    <span className="text-[15px] font-normal text-heading w-40 inline-block">
                                                        Shipping
                                                        <span className="float-end">:</span>
                                                    </span>
                                                    <span className="text-[15px] font-normal text-heading inline-block">{MoneyFormat.format(shippingCost || 0)}</span>
                                                </li>
                                                <li className="px-4 py-2.5 border-b border-solid border-border bg-lightest">
                                                    <span className="text-[15px] font-normal text-heading w-40 inline-block">
                                                        Tax
                                                        <span className="float-end">:</span>
                                                    </span>
                                                    <span className="text-[15px] font-normal text-heading inline-block">{MoneyFormat.format(calculateTotalTax())}</span>
                                                </li>
                                                <li className="px-4 py-2.5 border-b border-solid border-border bg-lightest">
                                                    <span className="text-[15px] font-normal text-heading w-40 inline-block">
                                                        Profit
                                                        <span className="float-end">:</span>
                                                    </span>
                                                    <span className="text-[15px] font-normal text-heading inline-block">{MoneyFormat.format(calculateProfit)}</span>
                                                </li>
                                                <li className="px-4 py-2.5">
                                                    <span className="text-[15px] font-bold text-heading w-40 inline-block">
                                                        Grand Total
                                                        <span className="float-end font-normal">:</span>
                                                    </span>
                                                    <span className="text-[15px] font-bold text-heading inline-block">{MoneyFormat.format(calculateGrandTotal)}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                        <div className="inventual-form-field">
                                            <h5>Shipping Cost</h5>
                                            <NumericFormat
                                                customInput={TextField}
                                                thousandSeparator=","
                                                required
                                                decimalSeparator="."
                                                decimalScale={2}
                                                fixedDecimalScale
                                                value={shippingCost ?? ''}
                                                onValueChange={(values) => {
                                                    setShippingCost(values.floatValue);
                                                }}
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start">£</InputAdornment>,
                                                }}
                                                inputProps={{ min: 0.01, max: 1000000 }}
                                                fullWidth
                                                variant="outlined"
                                                placeholder="50.00"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                        <div className="inventual-form-field">
                                            <h5>Discount</h5>
                                            <NumericFormat
                                                customInput={TextField}
                                                thousandSeparator=","
                                                required
                                                decimalSeparator="."
                                                decimalScale={2}
                                                fixedDecimalScale
                                                value={discount ?? ''}
                                                onValueChange={(values) => {
                                                    setDiscount(values.floatValue);
                                                }}
                                                InputProps={{
                                                    startAdornment: <InputAdornment position="start">%</InputAdornment>,
                                                }}
                                                inputProps={{
                                                    placeholder: "5",
                                                }}
                                                isAllowed={(values) => {
                                                    const { floatValue } = values;
                                                    return floatValue === undefined || (floatValue >= 0 && floatValue <= 100);
                                                }}
                                                fullWidth
                                                variant="outlined"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                        <div className="inventual-form-field">
                                            <h5>Sale Status</h5>
                                            <div className="inventual-select-field-style">
                                                <TextField
                                                    select
                                                    label="Select"
                                                    required
                                                    value={saleStatus}
                                                    onChange={(e) => setSalesStatus(e.target.value)}
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
                                                    <MenuItem value="Completed">Completed</MenuItem>
                                                    <MenuItem value="Incompleted">Incompleted</MenuItem>
                                                </TextField>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6">
                                        <div className="inventual-input-field-style">
                                            <TextField
                                                fullWidth
                                                multiline
                                                rows={4}
                                                value={saleNote}
                                                placeholder='Sale Notes'
                                                inputProps={{ maxLength: 500 }}
                                                onChange={(e) => setSaleNote(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6">
                                        <div className="inventual-input-field-style">
                                            <TextField
                                                fullWidth
                                                multiline
                                                rows={4}
                                                value={staffNote}
                                                placeholder='Staff Notes'
                                                inputProps={{ maxLength: 500 }}
                                                onChange={(e) => setStaffNote(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-12 flex justify-end">
                                        <button type="submit" className="inventual-btn">Create Sale</button>
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

export default NewSaleList;