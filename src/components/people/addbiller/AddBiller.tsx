"use client"
import React, { useState } from 'react';
import { MenuItem, TextField } from '@mui/material';
import DatePicker from "react-datepicker";import { toast } from 'react-toastify';
;

const AddBiller = () => {

    const [startDate, setStartDate] = useState<Date | null>(null);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [warhouse, setWarehouse] = useState('');
    const [address, setAddress] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [billerCode, setBillerCode] = useState('');

    const handleBillerForm = (e: any) => {
        e.preventDefault();
        try {
            toast.success("Biller Created successfully!");
            setStartDate(null);
            setName('');
            setPhone('');
            setEmail('');
            setWarehouse('');
            setAddress('');
            setZipCode('');
            setBillerCode('');
        } catch {
            toast.error("Failed to create Biller. Please try again later.");
        }

    };
    return (
        <>
            <div className="inventual-content-area px-4 sm:px-7 max2Xl:pb-0 pb-[170px]">
                <div className="inventual-create-payment-area bg-white p-5 sm:p-7 custom-shadow rounded-8 mt-7">
                    <form onSubmit={handleBillerForm}>
                        <div className="grid grid-cols-12 gap-y-7 sm:gap-7">
                            <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                <div className="inventual-form-field">
                                    <h5>Name</h5>
                                    <div className="inventual-input-field-style">
                                        <input
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            type="name"
                                            placeholder='William Tylor'
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                <div className="inventual-form-field">
                                    <h5>Date of Join</h5>
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
                                            placeholderText="Start Date"
                                            className="w-full"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                <div className="inventual-form-field">
                                    <h5>Phone</h5>
                                    <div className="inventual-input-field-style">
                                        <input
                                            required
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            type="tel"
                                            placeholder='00 000 000 000'
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                <div className="inventual-form-field">
                                    <h5>Email</h5>
                                    <div className="inventual-input-field-style">
                                        <input
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            type="email"
                                            placeholder='joseph@example.com'
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                <div className="inventual-form-field">
                                    <h5>NID or Passport Number</h5>
                                    <div className="inventual-input-field-style multiple-field">
                                        <input type="text" placeholder='0' />
                                        <input type="text" placeholder='0' />
                                        <input type="text" placeholder='0' />
                                        <input type="text" placeholder='0' />
                                        <input type="text" placeholder='0' />
                                        <input type="text" placeholder='0' />
                                        <input type="text" placeholder='0' />
                                        <input type="text" placeholder='0' />
                                        <input type="text" placeholder='0' />
                                        <input type="text" placeholder='0' />
                                        <input type="text" placeholder='0' />
                                        <input type="text" placeholder='0' />
                                        <input type="text" placeholder='0' />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                <div className="inventual-form-field">
                                    <h5>Warehouse</h5>
                                    <div className="inventual-select-field-style">
                                        <TextField
                                            required
                                            value={warhouse}
                                            onChange={(e) => setWarehouse(e.target.value)}
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
                                            <MenuItem value="Warehouse 1">Warehouse 1</MenuItem>
                                            <MenuItem value="Warehouse 2">Warehouse 2</MenuItem>
                                            <MenuItem value="Warehouse 3">Warehouse 3</MenuItem>
                                            <MenuItem value="Warehouse 4">Warehouse 4</MenuItem>
                                            <MenuItem value="Warehouse 5">Warehouse 5</MenuItem>
                                        </TextField>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                <div className="inventual-form-field">
                                    <h5>Address</h5>
                                    <div className="inventual-input-field-style">
                                        <input
                                            required
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            type="text"
                                            placeholder='Malmate Station, New York, USA'
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                <div className="inventual-form-field">
                                    <h5>Zip Code</h5>
                                    <div className="inventual-input-field-style">
                                        <input
                                            required
                                            value={zipCode}
                                            onChange={(e) => setZipCode(e.target.value)}
                                            type="text"
                                            placeholder='48756'
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                <div className="inventual-form-field">
                                    <h5>Biller Code</h5>
                                    <div className="inventual-input-field-style">
                                        <input
                                            required
                                            value={billerCode}
                                            onChange={(e) => setBillerCode(e.target.value)}
                                            type="text"
                                            placeholder='BW1-00570'
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 flex justify-end">
                                <button type="submit" className="inventual-btn">Create Now</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddBiller;