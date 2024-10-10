"use client"
import React, { useState } from 'react';
import { MenuItem, TextField } from '@mui/material';
import { toast } from 'react-toastify';

const AddCustomer = () => {
    const [customerName, setCustomerName] = useState('')
    const [customerGroup, setCustomerGroup] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')
    const [address, setAddress] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [rewardPoint, setRewardPoint] = useState('')

    const handleAddCustomer = (e: any) => {
        e.preventDefault();
        try {
            toast.success("Customer Created successfully!");
            setCustomerName('');
            setCustomerGroup('');
            setPhone('');
            setEmail('');
            setCountry('');
            setCity('');
            setAddress('');
            setZipCode('');
            setRewardPoint('');
        } catch {
            toast.error("Failed to create Customer. Please try again later.");
        }

    }

    return (
        <>
            <div className="inventual-content-area px-4 sm:px-7 max2Xl:pb-0 pb-[180px]">
                <div className="inventual-addcustomer-area bg-white p-5 sm:p-7 custom-shadow rounded-8 mt-7">
                    <form onSubmit={handleAddCustomer}>
                        <div className="grid grid-cols-12 gap-y-7 sm:gap-7">
                            <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                <div className="inventual-form-field">
                                    <h5>Customer Name</h5>
                                    <div className="inventual-input-field-style">
                                        <input
                                            required
                                            value={customerName}
                                            onChange={(e) => setCustomerName(e.target.value)}
                                            type="name"
                                            placeholder='Walk - in - customer'
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                <div className="inventual-form-field">
                                    <h5>Customer Group</h5>
                                    <div className="inventual-select-field-style">
                                        <TextField
                                            select
                                            required
                                            value={customerGroup}
                                            onChange={(e) => setCustomerGroup(e.target.value)}
                                            label="Select"
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
                                            <MenuItem value="General">General</MenuItem>
                                            <MenuItem value="Walk In">Walk In</MenuItem>
                                            <MenuItem value="Local">Local</MenuItem>
                                            <MenuItem value="Foreign">Foreign</MenuItem>
                                        </TextField>
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
                                    <h5>Country</h5>
                                    <div className="inventual-input-field-style">
                                        <input
                                            required
                                            value={country}
                                            onChange={(e) => setCountry(e.target.value)}
                                            type="text"
                                            placeholder='United States'
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                <div className="inventual-form-field">
                                    <h5>City</h5>
                                    <div className="inventual-input-field-style">
                                        <input
                                            required
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                            type="text"
                                            placeholder='New York'
                                        />
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
                                            placeholder='New York'
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
                                    <h5>Reward Point</h5>
                                    <div className="inventual-input-field-style">
                                        <input
                                            required
                                            value={rewardPoint}
                                            onChange={(e) => setRewardPoint(e.target.value)}
                                            type="number"
                                            placeholder='456'
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 flex justify-end">
                                <button type="submit" className="inventual-btn">Create Customer</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddCustomer;