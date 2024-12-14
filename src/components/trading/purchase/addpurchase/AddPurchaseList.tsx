"use client"
import React, { useEffect, useRef, useState } from 'react';
import { MenuItem, TextField, InputAdornment } from '@mui/material';
import DatePicker from "react-datepicker";
import { toast } from 'react-toastify';
import Image from 'next/image';
import { NumericFormat } from 'react-number-format';
import { useGetProductByNameQuery } from '@/services/Product/Product';
import { useGetWarehouseNamesQuery } from '@/services/Warehouse/Warehouse';
import { useGetSuppliersNameQuery } from '@/services/People/Supplier';
import { useCreatePurchaseMutation } from '@/services/Purchase/Purchase';
import { TProductInterface, TWarehouseInterface, TSupplierInterface, MoneyFormat } from '@/interFace/interFace';


const AddPurchaseList = () => {
    const [purchaseDate, setPurchaseDate] = useState(new Date());
    const [warehouseId, setWarehouseId] = useState('')
    const [supplierId, setSupplierId] = useState('')
    const [activeItemIds, setActiveItemIds] = useState<number[]>([]);
    const [activeItems, setActiveItems] = useState<TProductInterface[]>([]);
    const [purchaseStatus, setPurchaseStatus] = useState<string>("");
    const [productName, setProductName] = useState<string>("");
    const [purchaseNote, setPurchaseNote] = useState<string>("");
    const [shippingCost, setShippingCost] = useState<number | undefined>();
    const [productInformation, setProductInformation] = useState<TProductInterface[]>([]);
    const [suggestions, setSuggestions] = useState<TProductInterface[]>([]);
    const [product, setProduct] = useState<string>("");
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchResults, setSearchResults] = useState<TProductInterface[]>([]);
    const [addPurchase] = useCreatePurchaseMutation();
    const { data: supplierData } = useGetSuppliersNameQuery({ pageNumber: 1, pageSize: 25 });
    const { data: warehouseData } = useGetWarehouseNamesQuery({ pageNumber: 1, pageSize: 25 });

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



    //handler for close search with close btn
    const handleSearchClose = () => {
        setSuggestions([]);
    };


    const handleRemoveProduct = (productId: number) => {
        setProductInformation((prevProducts) =>
            prevProducts.filter((product) => product.id !== productId)
        );
    };

   
    // calculate order tax
    const calculateTotalTax = () => {
        return productInformation.reduce((total, item) => {
            if (item.quantityBought != undefined) {
                return (((item.productPrice * item.quantityBought) * item.taxPercentage) / 100) + total;
            }
            return total;
        }, 0);
    }
   

    // calculate total sum of all subtotals
    const calculateGrandTotal = () => {
        if (shippingCost != undefined) {
            return calculateTotal() + shippingCost + calculateTotalTax();
        } else {
            return calculateTotal() + calculateTotalTax();
        }
    }
    //  calculates the number of items addeed
    const calculateTheAmountOfProductsAdded = () => {
        if (productInformation.length > 0) {
            return productInformation.reduce((accumulator, item) => {
                return item.quantityBought != undefined
                    ? accumulator + item.quantityBought
                    : accumulator;

            }, 0);
        }
    };


    // calculate total sum of all subtotals
    const calculateTotal = () => {
        return productInformation.reduce((total, item) => {
            if (item.quantityBought != undefined) {
                return total + item.productPrice * item.quantityBought;
            }
            return total;
        }, 0);
    }

    // handle Date
    const handleDateChange = (date: Date | null) => {
        setPurchaseDate(date || new Date());
    };

    const onTypeChangeForProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setProduct(value);
        setProductName(value);
    };


    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };



    const handleNewSaleForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let date = formatDate(purchaseDate)
        let productIdPlusQuantity: { [key: number]: number | undefined } = {};
        productInformation.forEach(product => {
            productIdPlusQuantity[product.id] = product.quantityBought;
        });
        const formData = {
            purchaseDate: date, productIdPlusQuantity, totalNumberOfProducts: calculateTheAmountOfProductsAdded(),
            warehouseId, supplierId,
            purchaseStatus, shippingCost, purchaseNote, TotalAmountBought: calculateGrandTotal(), 
            totalTax: calculateTotalTax()
        }
        try {
            await addPurchase(formData).unwrap();
            setPurchaseDate(new Date())
            setWarehouseId("")
            setSupplierId("")
            setShippingCost(undefined)
            setPurchaseStatus("")
            setProductInformation([])
            setPurchaseNote("")
            toast.success("Purchase Created successfully!");
        } catch (error: any) {
            if (error?.data?.message) {
                toast.error(error?.data?.message);
            } 
            else {
                toast.error("Failed to create Sale. Please try again later.");
            } 
        }
    }

    const selectSuggestion = (suggestion: TProductInterface) => {
        const existingProductIndex = productInformation.findIndex(product => product.productName === suggestion.productName);
        if (existingProductIndex !== -1) {
            setProductInformation(prev => {
                const updatedProducts = prev.map((product, index) => {
                    if (index === existingProductIndex) {
                        return {
                            ...product,
                            totalAmountbougth: product.totalAmountbougth * product.productPrice
                        };
                    }
                    return product;
                });
                return updatedProducts;
            });
        } else {
            setProductInformation(prev => [...prev, { ...suggestion, quantityBougth: 0, totalAmountbougth: suggestion.productPrice }]);
        }

        // Additional updates
        setSuggestions([]);
        setProduct("");
    };


    const handleAmountChange = (
        increaseId: any,
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        const inputValue = event.target.value;
        const newQuantity = inputValue === "" ? undefined : Number(inputValue);

        if (newQuantity !== undefined && newQuantity < 0) {
          return; 
        }
      
        setProductInformation((prevData) =>
          prevData.map((item) => {
            if (increaseId === item.id) {
              const adjustedStock =
                item.quantityBought !== undefined
                  ? item.stockQuantity +
                    ((newQuantity || 0) - (item.quantityBought || 0))
                  : item.stockQuantity + (newQuantity || 0);
      
              return {
                ...item,
                quantityBought: newQuantity,
                stockQuantity: Math.max(adjustedStock, 0),
              };
            }
            return item;
          })
        );
      };
      
    return (
        <>
            <form onSubmit={handleNewSaleForm}>
                <div className="invenShopfy-content-area px-4 sm:px-7">
                    <div className="invenShopfy-add-purchase-area bg-white p-5 sm:p-7 custom-shadow rounded-8 mt-7">
                        <div className="grid grid-cols-12 gap-y-5 sm:gap-7">
                            <div className="col-span-12">
                                <div className="grid grid-cols-12 gap-y-5 sm:gap-7">
                                    <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                        <div className="invenShopfy-formTwo-field">
                                            <h5>Date</h5>
                                            <div className="invenShopfy-input-field-style">
                                                <DatePicker
                                                    selected={purchaseDate}
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
                                    <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                        <div className="invenShopfy-form-field">
                                            <div className="invenShopfy-select-field">
                                                <h5>Select Warehouse</h5>
                                                <div className="invenShopfy-select-field-style">
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
                                                            MenuProps: {
                                                                PaperProps: {
                                                                    style: {
                                                                        maxHeight: '200px',  
                                                                        overflowY: 'auto',   
                                                                    },
                                                                },
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
                                    <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                        <div className="invenShopfy-select-field">
                                            <div className="invenShopfy-form-field">
                                                <h5>Select Supplier</h5>
                                                <div className="invenShopfy-select-field-style">
                                                    <TextField
                                                        select
                                                        label="Select"
                                                        required
                                                        value={supplierId}
                                                        onChange={(e) => setSupplierId(e.target.value)}
                                                        SelectProps={{
                                                            displayEmpty: true,
                                                            renderValue: (value: any) => {
                                                                const selectedSupplier = supplierData?.data.find((supplier: TSupplierInterface) => supplier.id === value);
                                                                return selectedSupplier ? selectedSupplier.supplierName : <em>Select Supplier</em>;
                                                            },
                                                            MenuProps: {
                                                                PaperProps: {
                                                                    style: {
                                                                        maxHeight: '200px',  
                                                                        overflowY: 'auto',   
                                                                    },
                                                                },
                                                            },
                                                        }}>
                                                        {supplierData && supplierData.data.length > 0 ? (
                                                            supplierData.data.map((supplier: TSupplierInterface) => (
                                                                <MenuItem key={supplier.id} value={supplier.id}>
                                                                    {supplier.supplierName}
                                                                </MenuItem>
                                                            ))
                                                        ) : (
                                                            <MenuItem value="">
                                                                <em>No Suppliers Available</em>
                                                            </MenuItem>
                                                        )}
                                                    </TextField>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-6">
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
                                                                                    <Image src={product?.productImage} 
                                                                                    alt={product.productName}
                                                                                    width="0"
                                                                                    height="0"
                                                                                    sizes="100vw"
                                                                                    style={{ maxHeight: '50px', width: '50px', objectFit: 'contain' }}
                                                                                    
                                                                                    />
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
                                        <div className="invenShopfy-add-adjustment-table mt-5 overflow-y-scroll xl:overflow-hidden">
                                            <div className="invenShopfy-common-small-table mt-0.5 w-[1150px] xl:w-full">
                                                <table>
                                                    <thead>
                                                        <tr className='bg-lightest'>
                                                            <th>Id</th>
                                                            <th>Image</th>
                                                            <th>Product</th>
                                                            <th>Code</th>
                                                            <th>Category</th>
                                                            <th>Sub-Category</th>
                                                            <th>Price</th>
                                                            <th>Stock</th>
                                                            <th>Tax</th>
                                                            <th>Qty</th>
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
                                                                            <Image 
                                                                            src={product.productImage} 
                                                                            alt={product.productName}
                                                                            width="0"
                                                                            height="0"
                                                                            sizes="100vw"
                                                                            style={{ maxHeight: '50px', width: '50px', objectFit: 'contain' }}
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                    <td>{product.productName}</td>
                                                                    <td>{product.productCode}</td>
                                                                    <td>{product.category}</td>
                                                                    <td>{product.subcategory}</td>
                                                                    <td>{MoneyFormat.format(product.productPrice)}</td>
                                                                    <td>{product.stockQuantity}</td>
                                                                    <td>{product.taxPercentage}%</td>
                                                                    <td>
                                                                        <TextField
                                                                            fullWidth
                                                                            type='number'
                                                                            placeholder="Enter qty"
                                                                            variant="outlined"
                                                                            value={product.quantityBought !== undefined ? product.quantityBought : ""}
                                                                            onChange={(e) => handleAmountChange(product.id, e)}
                                                                        />
                                                                    </td>
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
                                        <div className="invenShopfy-addsale-product-cost text-end pt-9 pb-9 border border-t-0 border-border">
                                            <ul>
                                                <li className="px-4 py-2.5 border-b border-solid border-border bg-lightest">
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
                                                <li className="px-4 py-2.5">
                                                    <span className="text-[15px] font-bold text-heading w-40 inline-block">
                                                        Grand Total
                                                        <span className="float-end font-normal">:</span>
                                                    </span>
                                                    <span className="text-[15px] font-bold text-heading inline-block">{MoneyFormat.format(calculateGrandTotal())}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-3">
                                        <div className="invenShopfy-form-field">
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
                                    <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-3">
                                        <div className="invenShopfy-form-field">
                                            <h5>Purchase Status</h5>
                                            <div className="invenShopfy-select-field-style">
                                                <TextField
                                                    select
                                                    label="Select"
                                                    required
                                                    value={purchaseStatus}
                                                    onChange={(e) => setPurchaseStatus(e.target.value)}
                                                    SelectProps={{
                                                        displayEmpty: true,
                                                        renderValue: (value: any) => {
                                                            if (value === '') {
                                                                return <em>Purchase Status</em>;
                                                            }
                                                            return value;
                                                        },
                                                    }}>
                                                    <MenuItem value="">
                                                        <em>Purchase Status</em>
                                                    </MenuItem>
                                                    <MenuItem value="Completed">Completed</MenuItem>
                                                    <MenuItem value="Incompleted">Incompleted</MenuItem>
                                                    <MenuItem value="Drafts">Drafts</MenuItem>
                                                </TextField>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6">
                                        <div className="invenShopfy-input-field-style">
                                            <TextField
                                                fullWidth
                                                multiline
                                                rows={4}
                                                value={purchaseNote}
                                                placeholder='Staff Notes'
                                                inputProps={{ maxLength: 500 }}
                                                onChange={(e) => setPurchaseNote(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-12 flex justify-end">
                                        <button type="submit" className="invenShopfy-btn">Create Purchase</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default AddPurchaseList;