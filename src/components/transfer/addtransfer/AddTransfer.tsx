"use client"
import React, { useState, useEffect } from 'react';
import { MenuItem, TextField } from '@mui/material';
import DatePicker from "react-datepicker";
import { toast } from 'react-toastify';
import { useGetWarehouseNamesQuery, useGetTotalQuantityByProductAndWarehouseIdQuery } from '@/services/Warehouse/Warehouse';
import { useGetProductByNameQuery } from '@/services/Product/Product';
import { useGetMangerAdminUsersQuery } from '@/services/Role/Role';
import { useCreateTransferMutation } from '@/services/Transfer/Transfer';
import { TWarehouseInterface, TtransferInterface } from '@/interFace/interFace';


const AddTransfer = () => {
    const [transferDate, setTransferDate] = useState(new Date());
    const [productName, setProductName] = useState('');
    const [productCode, setProductCode] = useState('');
    const [productId, setProductId] = useState<number | null>();
    const [quantity, setQuantity] = useState("");
    const [reason, setReason] = useState('');
    const [fromWarehouse, setFromWarehouse] = useState('');
    const [toWarhouse, setToWarehouse] = useState('');
    const [transferNote, setTransferNote] = useState('');
    const [status, setStatus] = useState('');
    const [userAdmin, setUserAdmin] = useState({ userId: '', userName: '' });
    const [suggestions, setSuggestions] = useState<TtransferInterface[]>([]);
    const [fetchSuggestions, setFetchSuggestions] = useState(true);
    const { data: warehouseData } = useGetWarehouseNamesQuery({ pageNumber: 1, pageSize: 25 });
    const { data: quantityByWarehouseData } = useGetTotalQuantityByProductAndWarehouseIdQuery(
        { warehouseId: Number(fromWarehouse) ?? 0, productId: productId ?? 0 },
        { skip: !fromWarehouse || !productId }
    );
    const [createTransfer] = useCreateTransferMutation();
    const { data: userAdminData } = useGetMangerAdminUsersQuery();


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

    const handleSuggestionSelect = (suggestion: TtransferInterface) => {
        setProductName(suggestion.title);
        setProductId(suggestion.id)
        setProductCode(suggestion.productCode)
        setSuggestions([]);
        setFetchSuggestions(false);
    };

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


    const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedUserId = e.target.value;
        const selectedUser = userAdminData.find((user: any) => user.userId === selectedUserId);

        if (selectedUser) {
            setUserAdmin({ userId: selectedUser.userId, userName: selectedUser.userName });
        }

    }

    //handle transfer data
    const handleTransferData = async (e: any) => {
        e.preventDefault();
        let date = formatDate(transferDate)

        const transferDataForm = {
            transferDate: date, fromWarehouseId: fromWarehouse, toWarehouseId: toWarhouse, quantity, reason,
            productId, transferNote, transferStatus: status, authorizedBy: userAdmin.userName
        }
        try {
            await createTransfer(transferDataForm).unwrap();
            toast.success("Transfer Created successfully!");
            setTransferDate(new Date())
            setProductCode('');
            setProductName('');
            setUserAdmin({ userId: '', userName: '' })
            setTransferNote('')
            setProductCode('')
            setToWarehouse('')
            setFromWarehouse("")
            setQuantity('')
            setReason('');
            setStatus('');
        } catch (error: any) {
            if (error?.data?.message) {
                toast.error(error?.data?.message);
            } else {
                // Fallback error message
                toast.error("Failed to create Transfer. Please try again later.");
            }
        }
    }


 

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
                                                value={userAdmin.userId}
                                                helperText="Please select a manager that authorized the transfer"
                                                onChange={handleUserChange}
                                                SelectProps={{
                                                    displayEmpty: true,
                                                    renderValue: () => {
                                                        return userAdmin.userName ? userAdmin.userName : <em>Select Admin/Manager</em>;
                                                    },
                                                }}>
                                                {userAdminData && userAdminData.length > 0 ? (
                                                    userAdminData.map((userAdmin: any) => (
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
                            <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-3">
                                <div className="inventual-form-field">
                                    <div className="inventual-select-field">
                                        <h5>From Warehouse</h5>
                                        <div className="inventual-select-field-style">
                                            <TextField
                                                select
                                                label="Select"
                                                required
                                                value={fromWarehouse}
                                                onChange={(e) => setFromWarehouse(e.target.value)}
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
                            <div className="col-span-12 md:col-span-4 lg:col-span-4 xl:col-span-3">
                                <div className="inventual-form-field">
                                    <div className="inventual-select-field">
                                        <h5>To Warehouse</h5>
                                        <div className="inventual-select-field-style">
                                            <TextField
                                                select
                                                label="Select"
                                                required
                                                value={toWarhouse}
                                                onChange={(e) => setToWarehouse(e.target.value)}
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
                            <div className="col-span-12 md:col-span-4 lg:col-span-4 xl:col-span-3">
                                <div className="inventual-form-field">
                                    <div className="inventual-select-field">
                                        <h5>Quantity</h5>
                                        <div className="inventual-input-field-style">
                                            <TextField
                                                fullWidth
                                                type="number"
                                                required
                                                placeholder='20'
                                                value={quantity}
                                                variant="outlined"
                                                inputProps={{ min: 1, max: quantityByWarehouseData?.data.quantity }}
                                                onChange={(e) => setQuantity(e.target.value)}

                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-4 lg:col-span-4 xl:col-span-3">
                                <div className="inventual-formTree-field">
                                    <h5>Quantity in stock</h5>
                                    <div className="inventual-input-field-style">
                                        <TextField
                                            required
                                            value={quantityByWarehouseData?.data.quantity !== undefined ? quantityByWarehouseData.data.quantity : ""}
                                            disabled={quantityByWarehouseData?.data.quantity !== undefined}
                                            style={{
                                                backgroundColor: quantityByWarehouseData?.data.quantity !== undefined ? '#e0e0e0' : 'inherit',
                                                color: quantityByWarehouseData?.data.quantity !== undefined ? '#757575' : 'inherit',
                                                width: '100%',
                                            }}>
                                        </TextField>
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
                                                <MenuItem value="InTransit">In Transit</MenuItem>
                                            </TextField>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12">
                                <div className="inventual-input-field-style">
                                    <TextField
                                        fullWidth
                                        multiline
                                        rows={4}
                                        value={transferNote}
                                        placeholder='Transfer Notes...'
                                        inputProps={{ maxLength: 500 }}
                                        onChange={(e) => setTransferNote(e.target.value)}
                                    />
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