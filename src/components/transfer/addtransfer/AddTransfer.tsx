"use client"
import React, { useState } from 'react';
import { MenuItem, TextField } from '@mui/material';
import DatePicker from "react-datepicker";
import { toast } from 'react-toastify';


const AddTransfer = () => {

    const [startDate, setStartDate] = useState<Date | null>(null);
    const [reference, setReference] = useState('');
    const [productName, setProductName] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [authorize, setAuthorize] = useState('');
    const [reason, setReason] = useState('');
    const [fromWarehouse, setFromWarehouse] = useState('');
    const [toWarhouse, setToWarehouse] = useState('');
    const [status, setStatus] = useState('');


    //handle transfer data
    const handleTransferData = (e: any) => {
        e.preventDefault();
        try {
            toast.success("Transfer Created successfully!");
            setStartDate(null);
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

    return (
        <>
            <div className="inventual-content-area px-4 sm:px-7">
                <div className="inventual-add-transfer-area bg-white p-5 sm:p-7 custom-shadow rounded-8 mt-7">
                    <form onSubmit={handleTransferData}>
                        <div className="grid grid-cols-12 gap-y-7 sm:gap-7">
                            <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
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
                                            placeholderText="DD/MM/YYYY"
                                            className="w-full"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                <div className="inventual-form-field">
                                    <h5>Reference</h5>
                                    <div className="inventual-input-field-style">
                                        <input
                                            required
                                            value={reference}
                                            onChange={(e) => setReference(e.target.value)}
                                            type="text"
                                            placeholder='S-324354356564'
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                <div className="inventual-form-field">
                                    <h5>Product Name</h5>
                                    <div className="inventual-input-field-style">
                                        <input
                                            required
                                            value={productName}
                                            onChange={(e) => setProductName(e.target.value)}
                                            type="text"
                                            placeholder='Denim Jeans'
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
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
                            <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                <div className="inventual-form-field">
                                    <h5>Authorized By</h5>
                                    <div className="inventual-input-field-style">
                                        <input
                                            required
                                            value={authorize}
                                            onChange={(e) => setAuthorize(e.target.value)}
                                            type="text"
                                            placeholder='Emily Johnson'
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                <div className="inventual-form-field">
                                    <h5>Reason</h5>
                                    <div className="inventual-input-field-style">
                                        <input
                                            required
                                            value={reason}
                                            onChange={(e) => setReason(e.target.value)}
                                            type="text"
                                            placeholder='Stock Rebalancing'
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                <div className="inventual-select-field">
                                    <div className="inventual-form-field">
                                        <h5>From Warehouse</h5>
                                        <div className="inventual-select-field-style">
                                            <TextField
                                                select
                                                required
                                                value={fromWarehouse}
                                                onChange={(e) => setFromWarehouse(e.target.value)}
                                                label="Select"
                                                defaultValue=""
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
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                <div className="inventual-select-field">
                                    <div className="inventual-form-field">
                                        <h5>To Warehouse</h5>
                                        <div className="inventual-select-field-style">
                                            <TextField
                                                select
                                                label="Select"
                                                defaultValue=""
                                                required
                                                value={toWarhouse}
                                                onChange={(e) => setToWarehouse(e.target.value)}
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
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
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