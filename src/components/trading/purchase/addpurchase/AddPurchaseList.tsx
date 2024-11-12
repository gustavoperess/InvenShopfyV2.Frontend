"use client"
import React, { useEffect, useRef, useState } from 'react';
import { MenuItem, TextField, InputAdornment } from '@mui/material';
import DatePicker from "react-datepicker";
import product_data from '@/data/product-data';
import { TProduct } from '@/interFace/interFace';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { NumericFormat } from 'react-number-format';
import { useGetProductByNameQuery } from '@/services/Product/Product';
import { useGetWarehouseNamesQuery } from '@/services/Warehouse/Warehouse';
import { useGetSuppliersNameQuery } from '@/services/People/Supplier';
import { useCreatePurchaseMutation } from '@/services/Purchase/Purchase';

interface productInterface {
    id: number;
    title: string;
    productImage: string;
    category: string;
    productCode: number,
    stockQuantity: number,
    subcategory: string,
    price: number;
    expired: boolean;
    totalAmountbougth: number,
    quantityBought: number | undefined;
    taxPercentage: number;
}

interface warehouseInterface {
    id: number;
    warehouseTitle: string;

}
interface supplierInterface {
    id: number;
    name: string;

}

let MoneyFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'GBP',
});

const AddPurchaseList = () => {
    const [purchaseDate, setPurchaseDate] = useState(new Date());
    const [warehouse, setWarehouse] = useState<number | null>();
    const [selectWarehouse, setSelectWarehosue] = useState('')
    const [selectedSupplier, setSelectedSupplier] = useState('')
    const [activeItemIds, setActiveItemIds] = useState<number[]>([]);
    const [activeItems, setActiveItems] = useState<TProduct[]>([]);
    const [purchaseStatus, setPurchaseStatus] = useState<string>("");
    const [productName, setProductName] = useState<string>("");
    const [purchaseNote, setPurchaseNote] = useState<string>("");
    const [shippingCost, setShippingCost] = useState<number | undefined>();
 
    const [supplier, setSupplier] = useState('')
    const [productInformation, setProductInformation] = useState<productInterface[]>([]);
    const [suggestions, setSuggestions] = useState<productInterface[]>([]);
    const [product, setProduct] = useState<string>("");
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchResults, setSearchResults] = useState<TProduct[]>([]);
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

    useEffect(() => {
        if (supplierData && supplierData.data.length > 0 && !supplier) {
            setSupplier(supplierData.data[0].id);
        }
        if (warehouse && warehouseData.data.length > 0 && !warehouse) {
            setWarehouse(warehouseData.data[0].id);
        }


    }, [warehouseData, warehouse, supplierData, supplier]);





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


    const handleRemoveProduct = (productId: number) => {
        setProductInformation((prevProducts) =>
            prevProducts.filter((product) => product.id !== productId)
        );
    };

   
    // calculate order tax
    const calculateTotalTax = () => {
        return productInformation.reduce((total, item) => {
            if (item.quantityBought != undefined) {
                return (((item.price * item.quantityBought) * item.taxPercentage) / 100) + total;
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
                return total + item.price * item.quantityBought;
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
            warehouseId: selectWarehouse, supplierId: selectedSupplier,
            purchaseStatus, shippingCost, purchaseNote, TotalAmountBought: calculateGrandTotal(), 
            totalTax: calculateTotalTax()
       
        }
        try {
            await addPurchase(formData).unwrap();
            setPurchaseDate(new Date())
            setSelectWarehosue("")
            setSelectedSupplier("")
            setShippingCost(undefined)
            setPurchaseStatus("")
            setProductInformation([])
            setPurchaseNote("")
            toast.success("Purchase Created successfully!");

        } catch {
            toast.error("Failed to  create Purchase. Please try again later.");
        }
    }

    const selectSuggestion = (suggestion: productInterface) => {
        const existingProductIndex = productInformation.findIndex(product => product.title === suggestion.title);
        if (existingProductIndex !== -1) {
            setProductInformation(prev => {
                const updatedProducts = prev.map((product, index) => {
                    if (index === existingProductIndex) {
                        return {
                            ...product,
                            totalAmountbougth: product.totalAmountbougth * product.price
                        };
                    }
                    return product;
                });
                return updatedProducts;
            });
        } else {
            setProductInformation(prev => [...prev, { ...suggestion, quantityBougth: 0, totalAmountbougth: suggestion.price }]);
        }

        // Additional updates
        setSuggestions([]);
        setProduct("");
    };


    const handleAmountChange = (increaseId: any, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const inputValue = event.target.value;
        const newQuantity = inputValue === "" ? undefined : Number(inputValue);

        setProductInformation((prevData) =>
            prevData.map((item) => {
                if (increaseId === item.id) {
                    const adjustedStock = item.quantityBought !== undefined
                        ? item.stockQuantity + ((newQuantity || 0) - (item.quantityBought || 0))
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
                <div className="inventual-content-area px-4 sm:px-7">
                    <div className="inventual-add-purchase-area bg-white p-5 sm:p-7 custom-shadow rounded-8 mt-7">
                        <div className="grid grid-cols-12 gap-y-5 sm:gap-7">
                            <div className="col-span-12">
                                <div className="grid grid-cols-12 gap-y-5 sm:gap-7">
                                    <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                        <div className="inventual-formTwo-field">
                                            <h5>Date</h5>
                                            <div className="inventual-input-field-style">
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
                                        <div className="inventual-form-field">
                                            <div className="inventual-select-field">
                                                <h5>Select Warehouse</h5>
                                                <div className="inventual-select-field-style">
                                                    <TextField
                                                        select
                                                        label="Select"
                                                        required
                                                        value={selectWarehouse}
                                                        onChange={(e) => setSelectWarehosue(e.target.value)}
                                                        SelectProps={{
                                                            displayEmpty: true,
                                                            renderValue: (value: any) => {
                                                                const selectedWarehouse = warehouseData?.data.find((warehouse: warehouseInterface) => warehouse.id === value);
                                                                return selectedWarehouse ? selectedWarehouse.warehouseTitle : <em>Select Warehouse</em>;
                                                            },
                                                        }}>
                                                        {warehouseData && warehouseData.data.length > 0 ? (
                                                            warehouseData.data.map((warehouse: warehouseInterface) => (
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
                                        <div className="inventual-select-field">
                                            <div className="inventual-form-field">
                                                <h5>Select Supplier</h5>
                                                <div className="inventual-select-field-style">
                                                    <TextField
                                                        select
                                                        label="Select"
                                                        required
                                                        value={selectedSupplier}
                                                        onChange={(e) => setSelectedSupplier(e.target.value)}
                                                        SelectProps={{
                                                            displayEmpty: true,
                                                            renderValue: (value: any) => {
                                                                const selectedSupplier = supplierData?.data.find((supplier: supplierInterface) => supplier.id === value);
                                                                return selectedSupplier ? selectedSupplier.name : <em>Select Supplier</em>;
                                                            },
                                                        }}>
                                                        {supplierData && supplierData.data.length > 0 ? (
                                                            supplierData.data.map((supplier: supplierInterface) => (
                                                                <MenuItem key={supplier.id} value={supplier.id}>
                                                                    {supplier.name}
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
                                                                                    <Image src={product?.productImage == "" ? "https://res.cloudinary.com/dououppib/image/upload/v1709830638/PLANTS/placeholder_ry6d8v.webp" : product?.productImage} width={30} height={30} alt={product.title} />
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
                                                            <th>Id</th>
                                                            <th>Image</th>
                                                            <th>Product</th>
                                                            <th>Code</th>
                                                            <th>Category</th>
                                                            <th>Sub-Category</th>
                                                            <th>Price</th>
                                                            <th>Stock</th>
                                                            <th>Tax</th>
                                                            <th>Quantity</th>
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
                                                                            <Image src={product.productImage} width={30} height={30} alt={product.title} />
                                                                        </div>
                                                                    </td>
                                                                    <td>{product.title}</td>
                                                                    <td>{product.productCode}</td>
                                                                    <td>{product.category}</td>
                                                                    <td>{product.subcategory}</td>
                                                                    <td>{MoneyFormat.format(product.price)}</td>
                                                                    <td>{product.stockQuantity}</td>
                                                                    <td>{product.taxPercentage}%</td>
                                                                    <td>
                                                                        <TextField
                                                                            fullWidth
                                                                            type='number'
                                                                            placeholder="Enter quantity"
                                                                            variant="outlined"
                                                                            value={product.quantityBought !== undefined ? product.quantityBought : ""}
                                                                            onChange={(e) => handleAmountChange(product.id, e)}
                                                                        />
                                                                    </td>
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
                                    <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-3">
                                        <div className="inventual-form-field">
                                            <h5>Purchase Status</h5>
                                            <div className="inventual-select-field-style">
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
                                                    <MenuItem value="Complete">Complete</MenuItem>
                                                    <MenuItem value="Incomplete">Incomplete</MenuItem>
                                                    <MenuItem value="Drafts">Drafts</MenuItem>
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
                                                value={purchaseNote}
                                                placeholder='Staff Notes'
                                                inputProps={{ maxLength: 500 }}
                                                onChange={(e) => setPurchaseNote(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-12 flex justify-end">
                                        <button type="submit" className="inventual-btn">Create Purchase</button>
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