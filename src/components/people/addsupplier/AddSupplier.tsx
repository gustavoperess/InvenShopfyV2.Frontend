"use client"
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const AddSupplier = () => {


    const [supplierName, setSupplierName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')
    const [address, setAddress] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [company, setCompany] = useState('')
    const [supplierCode, setSupplierCode] = useState('')
    //handle form
    const handleSupplierForm = (e: any) => {
        e.preventDefault();
        try {
            toast.success("Supplier Created successfully!");
            setSupplierName('');
            setSupplierCode('');
            setPhone('');
            setEmail('');
            setCountry('');
            setCity('');
            setAddress('');
            setZipCode('');
            setCompany('');
            setSupplierCode('');
        } catch {
            toast.error("Failed to create Supplier. Please try again later.");
        }

    };

    return (
        <>
            <div className="inventual-content-area px-4 sm:px-7 max2Xl:pb-0 pb-[170px]">
                <div className="inventual-addsupplier-area bg-white p-5 sm:p-7 custom-shadow rounded-8 mt-7">
                    <form onSubmit={handleSupplierForm}>
                        <div className="grid grid-cols-12 gap-y-7 sm:gap-7">
                            <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                <div className="inventual-form-field">
                                    <h5>Supplier Name</h5>
                                    <div className="inventual-input-field-style">
                                        <input
                                            required
                                            value={supplierName}
                                            onChange={(e) => setSupplierName(e.target.value)}
                                            type="name"
                                            placeholder='Joseph Tylor'
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
                                            placeholder='Malmate Station'
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
                                    <h5>Company</h5>
                                    <div className="inventual-input-field-style">
                                        <input
                                            required
                                            value={company}
                                            onChange={(e) => setCompany(e.target.value)}
                                            type="text"
                                            placeholder='Topylo Technology'
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                <div className="inventual-form-field">
                                    <h5>Supplier Code</h5>
                                    <div className="inventual-input-field-style">
                                        <input
                                            required
                                            value={supplierCode}
                                            onChange={(e) => setSupplierCode(e.target.value)}
                                            type="number"
                                            placeholder='101'
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

export default AddSupplier;