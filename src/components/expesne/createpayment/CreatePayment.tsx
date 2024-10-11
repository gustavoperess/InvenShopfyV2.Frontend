"use client"
import React, { useState } from 'react';
import { MenuItem, TextField } from '@mui/material';
import DatePicker from "react-datepicker"; import { toast } from 'react-toastify';
;

const CreatePayment = () => {

    const [startDate, setStartDate] = useState<Date | null>(null);
    const [voucherNo, setVoucherNo] = useState('');
    const [amount, setAmount] = useState(0);
    const [paymentType, setPaymentType] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [status, setStatus] = useState('');

    const handleCreatePayment = (e: any) => {
        e.preventDefault();
        try {
            toast.success("Payment Created successfully!");
            setStartDate(null);
            setVoucherNo('');
            setAmount(0);
            setPaymentType('');
            setPaymentType('');
            setCardNumber('');
            setStatus('');
        } catch {
            toast.error("Failed to create Payment. Please try again later.");
        }
    };
    return (
        <>
            <div className="inventual-content-area px-4 sm:px-7 max2Xl:pb-0 pb-[170px]">
                <div className="inventual-create-payment-area bg-white p-5 sm:p-7 custom-shadow rounded-8 mt-7">
                    <form onSubmit={handleCreatePayment}>
                        <div className="grid grid-cols-12 gap-y-7 sm:gap-7">
                            <div className="col-span-12">
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
                                            <h5>Voucher No</h5>
                                            <div className="inventual-input-field-style">
                                                <input
                                                    required
                                                    value={voucherNo}
                                                    onChange={(e) => setVoucherNo(e.target.value)}
                                                    type="text"
                                                    placeholder='787'
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
                                                    type="text"
                                                    placeholder='4,470'
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                        <div className="inventual-form-field">
                                            <h5>Payment Type</h5>
                                            <div className="inventual-select-field-style">
                                                <TextField
                                                    select
                                                    label="Select"
                                                    required
                                                    value={paymentType}
                                                    onChange={(e) => setPaymentType(e.target.value)}
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
                                                    <MenuItem value="Card">Card</MenuItem>
                                                    <MenuItem value="Cash">Cash</MenuItem>
                                                    <MenuItem value="Bank">Bank</MenuItem>
                                                </TextField>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                        <div className="inventual-form-field">
                                            <h5>Card Number</h5>
                                            <div className="inventual-input-field-style">
                                                <input
                                                    required
                                                    value={cardNumber}
                                                    onChange={(e) => setCardNumber(e.target.value)}
                                                    type="number"
                                                    placeholder='XXXX   XXXX   XXXX   XXXX'
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
                                                    <MenuItem value="Paid">Paid</MenuItem>
                                                    <MenuItem value="Unpaid">Unpaid</MenuItem>
                                                    <MenuItem value="Draft">Draft</MenuItem>
                                                </TextField>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12">
                                        <div className="inventual-form-field">
                                            <h5>Purchase Note:</h5>
                                            <div className="inventual-input-field-style">
                                                <textarea placeholder='Write your message'></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 flex justify-end">
                                        <button type="submit" className="inventual-btn">Pay Now</button>
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

export default CreatePayment;