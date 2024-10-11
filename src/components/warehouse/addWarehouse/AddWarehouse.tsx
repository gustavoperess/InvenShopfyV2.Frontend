"use client"
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useCreateWarehouseMutation } from '@/services/Warehouse/Warehouse';

const AddWarehouse = () => {
    const [addWarehouse] = useCreateWarehouseMutation();
    const [warehouseName, setWarehouseName] = useState<string>('');
    const [warehousePhoneNumber, setWarehousePhoneNumber] = useState<string>('');
    const [warehouseEmail, setWarehouseEmailAddress] = useState<string>('');
    const [warehouseCity, setWarehouseCity] = useState<string>('');
    const [warehouseCountry, setWarehouseCountry] = useState<string>('');
    const [warehouseZipCode, setWarehouseZipCode] = useState<string>('');
    const [warehouseOpeningNotes, setWarehouseOpeningNotes] = useState<string>('');

    //handle Warehouse data
    const handleWarehosueData = async (e: React.FormEvent<HTMLFormElement>) => {
        const warehouseData = { warehouseName, warehousePhoneNumber, warehouseEmail,warehouseCity, warehouseCountry, warehouseZipCode, warehouseOpeningNotes };
        e.preventDefault();
        try {
            await addWarehouse(warehouseData).unwrap();
            toast.success("Warehouse Created successfully!");
            setWarehouseName('');
            setWarehousePhoneNumber('');
            setWarehouseEmailAddress('');
            setWarehouseCity('');  
            setWarehouseCountry(''); 
            setWarehouseZipCode(''); 
            setWarehouseOpeningNotes('');
        } catch {
            console.log("Error occurred while adding a Warehouse", e);
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
                                            value={warehousePhoneNumber}
                                            onChange={(e) => setWarehousePhoneNumber(e.target.value)}
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
                                            value={warehouseEmail}
                                            onChange={(e) => setWarehouseEmailAddress(e.target.value)}
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
                                            value={warehouseCity}
                                            onChange={(e) => setWarehouseCity(e.target.value)}
                                            type="text"
                                            placeholder='London'
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
                                            value={warehouseCountry}
                                            onChange={(e) => setWarehouseCountry(e.target.value)}
                                            type="text"
                                            placeholder='United Kingdom'
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
                                            value={warehouseZipCode}
                                            onChange={(e) => setWarehouseZipCode(e.target.value)}
                                            type="number"
                                            placeholder='SE20-5ET'
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12">
                                <div className="inventual-form-field">
                                    <h5>Notes</h5>
                                    <div className="inventual-input-field-style">
                                        <textarea
                                            required
                                            value={warehouseOpeningNotes}
                                            onChange={(e) => setWarehouseOpeningNotes(e.target.value)}
                                            placeholder='Notes....'
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