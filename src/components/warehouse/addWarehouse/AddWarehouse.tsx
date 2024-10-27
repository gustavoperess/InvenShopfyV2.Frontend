"use client"
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useCreateWarehouseMutation } from '@/services/Warehouse/Warehouse';
import { TextField, FormControl } from '@mui/material';
import { kMaxLength } from 'buffer';

const AddWarehouse = () => {
    const [addWarehouse] = useCreateWarehouseMutation();
    const [warehouseName, setWarehouseName] = useState<string>('');
    const [warehousePhoneNumber, setWarehousePhoneNumber] = useState<string>('');
    const [warehouseEmail, setWarehouseEmailAddress] = useState<string>('');
    const [warehouseCity, setWarehouseCity] = useState<string>('');
    const [warehouseCountry, setWarehouseCountry] = useState<string>('');
    const [warehouseZipCode, setWarehouseZipCode] = useState<string>('');
    const [warehouseOpeningNotes, setWarehouseOpeningNotes] = useState<string>('');
    const [error, setError] = useState(false);

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
        } 
        catch (error: any) {
            if (error?.data?.message) {
                toast.error(error?.data?.message);
            } else {
                // Fallback error message
                toast.error("Failed to create Warehouse. Please try again later.");
            }
        }
    }


    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const email = e.target.value;
        setWarehouseEmailAddress(email);
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setError(!emailPattern.test(email));  
    };


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
                                    <FormControl fullWidth>
                                        <TextField 
                                            fullWidth
                                            type="text"
                                            required
                                            value={warehouseName}
                                            placeholder="Warehouse 1"
                                            variant="outlined"
                                            inputProps={{ maxLength: 50 }}
                                            onChange={(e) => setWarehouseName(e.target.value)}/>
                                    </FormControl>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                <div className="inventual-form-field">
                                    <h5>Phone</h5>
                                    <div className="inventual-input-field-style">
                                    <FormControl fullWidth>
                                        <TextField  // NEED TO CHECK PHONE NUMBER REQUIREMENTS 
                                            fullWidth
                                            type="number"
                                            required
                                            value={warehousePhoneNumber}
                                            placeholder="+234 23432432"
                                            variant="outlined"
                                            inputProps={{ maxLength: 80 }}
                                            onChange={(e) => setWarehousePhoneNumber(e.target.value)}/>
                                    </FormControl>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                <div className="inventual-form-field">
                                    <h5>Email</h5>
                                    <div className="inventual-input-field-style">
                                    <FormControl fullWidth>
                                        <TextField  
                                            fullWidth
                                            type="email"
                                            required
                                            value={warehouseEmail}
                                            placeholder="Warehouse01@gmail.con"
                                            variant="outlined"
                                            inputProps={{ maxLength: 80 }}
                                            onChange={handleEmailChange}
                                            error={error}
                                            helperText={error ? "Please enter a valid email address" : ""}
                                            />
                                    </FormControl>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                <div className="inventual-form-field">
                                    <h5>City</h5>
                                    <div className="inventual-input-field-style">
                                    <FormControl fullWidth>
                                        <TextField  
                                            fullWidth
                                            type="text"
                                            required
                                            value={warehouseCity}
                                            placeholder="London"
                                            variant="outlined"
                                            inputProps={{ maxLength: 80 }}
                                            onChange={(e) => setWarehouseCity(e.target.value)}
                                            />
                                    </FormControl>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                <div className="inventual-form-field">
                                    <h5>Country</h5>
                                    <div className="inventual-input-field-style">
                                    <FormControl fullWidth>
                                        <TextField  
                                            fullWidth
                                            type="text"
                                            required
                                            value={warehouseCountry}
                                            placeholder='United Kingdom'
                                            variant="outlined"
                                            inputProps={{ maxLength: 80 }}
                                            onChange={(e) => setWarehouseCountry(e.target.value)}
                                            />
                                    </FormControl>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                <div className="inventual-form-field">
                                    <h5>Zip Code</h5>
                                    <div className="inventual-input-field-style">
                                    <FormControl fullWidth>
                                        <TextField  
                                            fullWidth
                                            type="text"
                                            required
                                            value={warehouseZipCode}
                                            placeholder='SE20-5ET'
                                            variant="outlined"
                                            inputProps={{ maxLength: 20 }}
                                            onChange={(e) => setWarehouseZipCode(e.target.value)}
                                            />
                                    </FormControl>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12">
                                <div className="inventual-input-field-style">
                                    <FormControl fullWidth>
                                        <TextField  
                                            fullWidth
                                            multiline
                                            rows={4}
                                            value={warehouseOpeningNotes}
                                            placeholder='Notes....'
                                            inputProps={{ maxLength: 500 }}
                                            onChange={(e) => setWarehouseOpeningNotes(e.target.value)}
                                            />
                                    </FormControl>
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