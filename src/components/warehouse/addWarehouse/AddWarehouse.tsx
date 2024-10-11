"use client"
import React, { useState } from 'react';
import { MenuItem, TextField } from '@mui/material';
import { toast } from 'react-toastify';


const AddWarehouse = () => {

    const [warehouseName, setWarehouseName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [address, setAddress] = useState('');

    //handle Warehouse data
    const handleWarehosueData = (e: any) => {
        e.preventDefault();
        try {
            toast.success("Warehouse Created successfully!");
            setWarehouseName('');
            setPhone('');
            setEmail('');
            setCity('');
            setCountry('');
            setZipCode('');
            setAddress('');

        } catch {
            toast.error("Failed to create Warehouse. Please try again later.");
        }

    }

    return (
        <>
            <div className="inventual-content-area px-4 sm:px-7">
                <div className="inventual-add-warehouse-area bg-white p-5 sm:p-7 custom-shadow rounded-8 mt-7">
                    <form onSubmit={handleWarehosueData}>
                        <div className="grid grid-cols-12 gap-y-7 sm:gap-7">
                            <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                <div className="inventual-form-field">
                                    <h5>Name</h5>
                                    <div className="inventual-input-field-style">
                                        <input
                                            required
                                            value={warehouseName}
                                            onChange={(e) => setWarehouseName(e.target.value)}
                                            type="text"
                                            placeholder='Warehouse 1'
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
                                            type="number"
                                            placeholder=' +234 23432432'
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
                                            type="text"
                                            placeholder='info@example.com'
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
                                <div className="inventual-select-field">
                                    <div className="inventual-form-field">
                                        <h5>Country</h5>
                                        <div className="inventual-select-field-style">
                                            <TextField
                                                select
                                                required
                                                value={country}
                                                onChange={(e) => setCountry(e.target.value)}
                                                label="Select"
                                                defaultValue=""
                                                SelectProps={{
                                                    displayEmpty: true,
                                                    renderValue: (value: any) => {
                                                        if (value === '') {
                                                            return <em>Select Country</em>;
                                                        }
                                                        return value;
                                                    },
                                                }}
                                            >
                                                <MenuItem value="">
                                                    <em>Select Country</em>
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
                                <div className="inventual-form-field">
                                    <h5>Zip Code</h5>
                                    <div className="inventual-input-field-style">
                                        <input
                                            required
                                            value={zipCode}
                                            onChange={(e) => setZipCode(e.target.value)}
                                            type="number"
                                            placeholder='85701'
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12">
                                <div className="inventual-form-field">
                                    <h5>Address</h5>
                                    <div className="inventual-input-field-style">
                                        <textarea
                                            required
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            placeholder='2751 Polk Street, Tucson'
                                        ></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 flex justify-end">
                                <button type="submit" className="inventual-btn">Create Warehouse</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddWarehouse;