"use client"
import React, { useState } from 'react';
import { MenuItem, TextField } from '@mui/material';
import DatePicker from "react-datepicker";
import { toast } from 'react-toastify';

const AddExpenseList = () => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [expense, setExpense] = useState<string>('');
    const [selectWarehouse, setSelectWarehouse] = useState<string>('');
    const [selectExpenseType, setSelectExpenseType] = useState<string>('');
    const [selectCategory, setSelectCategory] = useState<string>('');
    const [voucherNo, setVoucherNo] = useState<string>('');
    const [amount, setAmount] = useState<number>(0);
    const [selectStatus, setSelectStatus] = useState('');
    const [selectTax, setSelectTax] = useState<number>(0);
    const [shipping, setShipping] = useState<number>(0);

    //handle shipping value
    const handleShippingValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        const shippingAmount = parseFloat(event.target.value);
        setShipping(isNaN(shippingAmount)? 0 : shippingAmount);
    }

    const handleExpenseListData = (event: any) => {
        event.preventDefault();
        try {
            toast.success("Expense Created successfully!");
            setStartDate(null);
            setExpense('');
            setSelectWarehouse('');
            setSelectExpenseType('');
            setSelectCategory('');
            setVoucherNo('');
            setAmount(0);
            setSelectStatus('');
            setSelectTax(0);
            setShipping(0);
        } catch {
            toast.error("Failed to create Expense. Please try again later.");
        }
    }

    return (
        <>
            <div className="inventual-content-area px-4 sm:px-7 max2Xl:pb-0 pb-[170px]">
                <div className="inventual-add-expense-area bg-white p-5 sm:p-7 custom-shadow rounded-8 mt-7">
                    <form onSubmit={handleExpenseListData}>
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
                                    <h5>Expense</h5>
                                    <div className="inventual-input-field-style">
                                        <input
                                            required
                                            type="text"
                                            value={expense}
                                            onChange={(e) => setExpense(e.target.value)}
                                            placeholder='LED Bulb'
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                <div className="inventual-form-field">
                                    <h5>Warehouse</h5>
                                    <div className="inventual-select-field-style">
                                        <TextField
                                            select
                                            required
                                            label="Select"
                                            value={selectWarehouse}
                                            onChange={(e) => setSelectWarehouse(e.target.value)}
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
                                    <h5>Expense Type</h5>
                                    <div className="inventual-select-field-style">
                                        <TextField
                                            select
                                            required
                                            label="Select"
                                            value={selectExpenseType}
                                            onChange={(e) => setSelectExpenseType(e.target.value)}
                                            defaultValue=""
                                            SelectProps={{
                                                displayEmpty: true,
                                                renderValue: (value: any) => {
                                                    if (value === '') {
                                                        return <em>Select Expense</em>;
                                                    }
                                                    return value;
                                                },
                                            }}
                                        >
                                            <MenuItem value="">
                                                <em>Select Expense</em>
                                            </MenuItem>
                                            <MenuItem value="Direct Expense">Direct Expense</MenuItem>
                                            <MenuItem value="Draft Expense">Draft Expense</MenuItem>
                                        </TextField>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                <div className="inventual-form-field">
                                    <h5>Category</h5>
                                    <div className="inventual-select-field-style">
                                        <TextField
                                            select
                                            required
                                            label="Select"
                                            value={selectCategory}
                                            onChange={(e) => setSelectCategory(e.target.value)}
                                            defaultValue=""
                                            SelectProps={{
                                                displayEmpty: true,
                                                renderValue: (value: any) => {
                                                    if (value === '') {
                                                        return <em>Select Type</em>;
                                                    }
                                                    return value;
                                                },
                                            }}
                                        >
                                            <MenuItem value="">
                                                <em>Select Type</em>
                                            </MenuItem>
                                            <MenuItem value="Shoe">Shoe</MenuItem>
                                            <MenuItem value="Cloth">Cloth</MenuItem>
                                            <MenuItem value="Bag">Bag</MenuItem>
                                            <MenuItem value="Computer">Computer</MenuItem>
                                            <MenuItem value="Laptop">Laptop</MenuItem>
                                        </TextField>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                <div className="inventual-form-field">
                                    <h5>Voucher No</h5>
                                    <div className="inventual-input-field-style">
                                        <input
                                            required
                                            value={voucherNo}
                                            onChange={(e) => setVoucherNo(e.target.value)}
                                            type="number"
                                            placeholder='748'
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                <div className="inventual-form-field">
                                    <h5>Amount</h5>
                                    <div className="inventual-input-field-style">
                                        <input
                                            required
                                            value={amount}
                                            onChange={(e) => setAmount(Number(e.target.value))}
                                            type="number"
                                            placeholder='4,470'
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                <div className="inventual-form-field">
                                    <h5>Status</h5>
                                    <div className="inventual-select-field-style">
                                        <TextField
                                            select
                                            required
                                            label="Select"
                                            value={selectStatus}
                                            onChange={(e) => setSelectStatus(e.target.value)}
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
                                            <MenuItem value="Paid">Paid</MenuItem>
                                            <MenuItem value="Partial">Partial</MenuItem>
                                            <MenuItem value="Due">Due</MenuItem>
                                        </TextField>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                <div className="inventual-form-field">
                                    <h5>Tax</h5>
                                    <div className="inventual-select-field-style">
                                        <TextField
                                            select
                                            required
                                            label="Select"
                                            value={selectTax}
                                            onChange={(e) => setSelectTax(Number(e.target.value))}
                                            defaultValue=""
                                            SelectProps={{
                                                displayEmpty: true,
                                                renderValue: (value: any) => {
                                                    if (value === '') {
                                                        return <em>Select Tax</em>;
                                                    }
                                                    return value;
                                                },
                                            }}
                                        >
                                            <MenuItem value="">
                                                <em>Select Tax</em>
                                            </MenuItem>
                                            <MenuItem value={5}>Vat (5%)</MenuItem>
                                            <MenuItem value={8}>Vat (8%)</MenuItem>
                                            <MenuItem value={10}>Vat (10%)</MenuItem>
                                            <MenuItem value={15}>Vat (15%)</MenuItem>
                                        </TextField>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                <div className="inventual-form-field">
                                    <h5>Shipping</h5>
                                    <div className="inventual-input-field-style has-icon-outline">
                                        <input
                                            required
                                            value={shipping}
                                            onChange={handleShippingValue}
                                            type="text"
                                            placeholder='0'
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12">
                                <div className="inventual-form-field ">
                                    <h5>Expense Note:</h5>
                                    <div className="inventual-input-field-style">
                                        <textarea placeholder='Write your message'></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 flex justify-end">
                                <button type="submit" className="inventual-btn">Create Expense</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddExpenseList;
