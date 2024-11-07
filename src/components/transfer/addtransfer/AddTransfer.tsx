"use client"
import React, { useState, useEffect } from 'react';
import { MenuItem, TextField } from '@mui/material';
import DatePicker from "react-datepicker";
import { toast } from 'react-toastify';
import { useGetAllWarehousesQuery } from '@/services/Warehouse/Warehouse';
import { useGetProductByNameQuery } from '@/services/Product/Product';
import { useGetMangerAdminUsersQuery } from '@/services/Role/Role';


interface ReferenceInterface {
    id: number;
    title: string
    productCode: string;
    stockQuantity: number;
}

interface warehouseInterface {
    id: number;
    warehouseName: string;

}


interface userAdminInterface {
    userId: number;
    userName: string;
    roleName: string;
}


const AddTransfer = () => {

    const [transferDate, setTransferDate] = useState(new Date());
    const [reference, setReference] = useState('');
    const [productName, setProductName] = useState('');
    const [productCode, setProductCode] = useState('');
    const [warehouse, setWarehouse] = useState<number | null>();
    const [productId, setProductId] = useState<number | null>();
    const [productQuantityInStock, setProductQuantityInStock] = useState<number | null>();
    const [selectWarehouse, setSelectWarehosue] = useState('')
    const [quantity, setQuantity] = useState(0);
    const [authorize, setAuthorize] = useState('');
    const [reason, setReason] = useState('');
    const [fromWarehouse, setFromWarehouse] = useState('');
    const [toWarhouse, setToWarehouse] = useState('');
    const [status, setStatus] = useState('');
    const [fetchSuggestions, setFetchSuggestions] = useState(true);
    const { data: warehouseData } = useGetAllWarehousesQuery({ pageNumber: 1, pageSize: 25 });
    const [userAdmin, setUserAdmin] = useState('')
    const { data: userAdminData } = useGetMangerAdminUsersQuery();

    const [suggestions, setSuggestions] = useState<ReferenceInterface[]>([]);


    //debounce function
    const debouncedSearchTerm = useDebounce(productName, 500);

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
        skip: !debouncedSearchTerm.trim().length || !fetchSuggestions, // Skip API call if fetchSuggestions is false
    });
   

    useEffect(() => {
        if (productSuggestionsData) {
            setSuggestions(productSuggestionsData.data || []);
        }
    }, [productSuggestionsData]);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProductName(e.target.value);
        setFetchSuggestions(true);
    };

    const handleSuggestionSelect = (suggestion: ReferenceInterface) => {
        setProductName(suggestion.title);
        setProductId(suggestion.id)
        setProductQuantityInStock(suggestion.stockQuantity)
        setProductCode(suggestion.productCode)
        setSuggestions([]);
        setFetchSuggestions(false);
    };


    useEffect(() => {
        if (warehouse && warehouseData.data.length > 0 && !warehouse) {
            setWarehouse(warehouseData.data[0].id);
        }
    }, [warehouseData, warehouse]);



    //handle transfer data
    const handleTransferData = (e: any) => {
        e.preventDefault();
        try {
            toast.success("Transfer Created successfully!");
            setTransferDate(new Date())
            setReference('');
            setProductName('');
            setQuantity(0);
            setReason('');
            setFromWarehouse('');
            setToWarehouse('');
            setStatus('');
        } catch {
            toast.error("Failed to create Transfer. Please try again later.");
        }
    }
    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    // handle Date
    const handleDateChange = (date: Date | null) => {
        setTransferDate(date || new Date());
    };
    
    const handleSuggestionQuantity = () => {
   
        if (productId != undefined && productId > 0) {
            console.log(productName)
            console.log(productId)
            console.log(productQuantityInStock)
            console.log(warehouseData)
        }
        // if (productSuggestionsData.data.length > 0) {
        //   
        // }
    }
    handleSuggestionQuantity()
    return (
        <>
            <div className="inventual-content-area px-4 sm:px-7">
                <div className="inventual-add-transfer-area bg-white p-5 sm:p-7 custom-shadow rounded-8 mt-7">
                    <form onSubmit={handleTransferData}>
                        <div className="grid grid-cols-12 gap-y-7 sm:gap-7">
                            <div className="col-span-12">
                                <div className="inventual-form-field">
                                    <h5>Search by Product Name</h5>
                                    <div className="inventual-input-field-style search-field">
                                        <TextField
                                            fullWidth
                                            placeholder="Macbook..."
                                            variant="outlined"
                                            value={productName}
                                            onChange={handleNameChange}
                                        />
                                        {suggestions.length > 0 && (
                                            <div className='search-dropdown dropdown-scroll'>
                                                <ul>
                                                    {suggestions.map((product) => (
                                                        <li key={product.id} onClick={() => handleSuggestionSelect(product)}>
                                                            <p className='title'>{product.title}</p>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                <div className="inventual-formTwo-field">
                                    <h5>Date</h5>
                                    <div className="inventual-input-field-style">
                                        <DatePicker
                                            selected={transferDate}
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
                                <div className="inventual-formTree-field">
                                    <h5>Product Code</h5>
                                    <div className="inventual-select-field-style">
                                        <TextField
                                            required
                                            value={productCode}
                                            disabled={productCode !== ''}
                                            style={{
                                                backgroundColor: productCode !== '' ? '#e0e0e0' : 'inherit',
                                                color: productCode !== '' ? '#757575' : 'inherit',
                                                width: '100%',
                                            }}
                                        >
                                        </TextField>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                <div className="inventual-form-field">
                                    <div className="inventual-select-field">
                                        <h5>Authorized By</h5>
                                        <div className="inventual-select-field-style">
                                            <TextField
                                                select
                                                label="Select"
                                                required
                                                value={userAdmin}
                                                helperText="Please select a manager that authorized the transfer"
                                                onChange={(e) => setUserAdmin(e.target.value)}
                                                SelectProps={{
                                                    displayEmpty: true,
                                                    renderValue: (value: any) => {
                                                        const selectedUserAdmin = userAdminData?.find((userAdmin: userAdminInterface) => userAdmin.userId === value);
                                                        return selectedUserAdmin ? selectedUserAdmin.userName : <em>Select Admin/Manager</em>;
                                                    },
                                                }}>
                                                {userAdminData && userAdminData.length > 0 ? (
                                                    userAdminData.map((userAdmin: userAdminInterface) => (
                                                        <MenuItem key={userAdmin.userId} value={userAdmin.userId}>
                                                            {userAdmin.userName}
                                                        </MenuItem>
                                                    ))
                                                ) : (
                                                    <MenuItem value="">
                                                        <em>No admin/manager Available</em>
                                                    </MenuItem>
                                                )}
                                            </TextField>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-4 lg:col-span-4 xl:col-span-3">
                                <div className="inventual-form-field">
                                    <div className="inventual-select-field">
                                        <h5>From Warehouse</h5>
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
                                                        return selectedWarehouse ? selectedWarehouse.warehouseName : <em>Select Warehouse</em>;
                                                    },
                                                }}>
                                                {warehouseData && warehouseData.data.length > 0 ? (
                                                    warehouseData.data.map((warehouse: warehouseInterface) => (
                                                        <MenuItem key={warehouse.id} value={warehouse.id}>
                                                            {warehouse.warehouseName}
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
                            <div className="col-span-12 md:col-span-4 lg:col-span-4 xl:col-span-3">
                                <div className="inventual-form-field">
                                    <div className="inventual-select-field">
                                        <h5>To Warehouse</h5>
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
                                                        return selectedWarehouse ? selectedWarehouse.warehouseName : <em>Select Warehouse</em>;
                                                    },
                                                }}>
                                                {warehouseData && warehouseData.data.length > 0 ? (
                                                    warehouseData.data.map((warehouse: warehouseInterface) => (
                                                        <MenuItem key={warehouse.id} value={warehouse.id}>
                                                            {warehouse.warehouseName}
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
                            <div className="col-span-12 md:col-span-4 lg:col-span-4 xl:col-span-3">
                                <div className="inventual-form-field">
                                    <h5>Quantity</h5>
                                    <div className="inventual-input-field-style">
                                        <input
                                            required
                                            value={quantity}
                                            onChange={(e) => setQuantity(Number(e.target.value))}
                                            type="number"
                                            placeholder='1500'
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-4 lg:col-span-4 xl:col-span-3">
                                <div className="inventual-formTree-field">
                                    <h5>Quantity in stock</h5>
                                    <div className="inventual-input-field-style">
                                        {/* <TextField
                                                required
                                                value={billerName}
                                                disabled={billerName !== ''}
                                                style={{
                                                    backgroundColor: billerName !== '' ? '#e0e0e0' : 'inherit',
                                                    color: billerName !== '' ? '#757575' : 'inherit',
                                                    width: '100%',
                                                }}>
                                            </TextField> */}
                                    </div>
                                </div>
                            </div>
                        
                            <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6">
                                <div className="inventual-form-field">
                                <h5>Reason</h5>
                                    <div className="inventual-input-field-style search-field">
                                        <TextField
                                            fullWidth
                                            placeholder='Stock Rebalancing'
                                            variant="outlined"
                                            value={reason}
                                            onChange={(e) => setReason(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6">
                                <div className="inventual-select-field">
                                    <div className="inventual-form-field">
                                        <h5>Status</h5>
                                        <div className="inventual-select-field-style">
                                            <TextField
                                                select
                                                label="Select"
                                                required
                                                value={status}
                                                onChange={(e) => setStatus(e.target.value)}
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
                                                <MenuItem value="Completed">Completed</MenuItem>
                                                <MenuItem value="Pending">Pending</MenuItem>
                                                <MenuItem value="Sent">Sent</MenuItem>
                                            </TextField>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12">
                                <div className="inventual-form-field">
                                    <h5>Transfer Note:</h5>
                                    <div className="inventual-input-field-style">
                                        <textarea placeholder='Type Note...'></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 flex justify-end">
                                <button type="submit" className="inventual-btn">Create Transfer</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddTransfer;