"use client"
import React, { useState } from 'react';
import { Input, TextField, FormControl } from '@mui/material';
import { useAddSupplierMutation } from '@/services/People/Supplier';
import { toast } from 'react-toastify';
import { IMaskInput } from 'react-imask';
import { CustomProps } from '@/interFace/interFace';

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
    const [error, setError] = useState(false);
    const [addSupplier] = useAddSupplierMutation();

    //handle form
    const handleSupplierForm =  async(e: any) => {
        e.preventDefault();
        const supplierData = {
            supplierName, email, phoneNumber: phone, city, country, address, zipCode,
            supplierCode, company
        }
        try {
            await addSupplier(supplierData).unwrap();
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
        } catch (error: any) {
            if (error?.data?.message) {
                toast.error(error?.data?.message);
                setSupplierName('');
                setSupplierCode('');
                setPhone('');
                setEmail('');
                setCountry('');
                setCity('');
                setAddress('');
                setZipCode('');
                setCompany('');
            } else {
                // Fallback error message
                toast.error("Failed to create Supplier. Please try again later.");
            }
        }

    };

    const TextMaskCustom = React.forwardRef<HTMLInputElement, CustomProps>(
        function TextMaskCustom(props, ref) {
            const { onChange, ...other } = props;
            return (
                <IMaskInput
                    {...other}
                    mask="(#00) 000-0000"
                    definitions={{ '#': /[1-9]/ }}
                    inputRef={ref}
                    onComplete={(value: any) => onChange({ target: { name: props.name, value } })}
                    overwrite
                />
            );
        }
    );


    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const email = e.target.value;
        setEmail(email);
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setError(!emailPattern.test(email));
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
                                        <FormControl fullWidth>
                                            <TextField
                                                fullWidth
                                                type="name"
                                                required
                                                value={supplierName}
                                                placeholder='Supplier 01'
                                                variant="outlined"
                                                inputProps={{ maxLength: 150 }}
                                                onChange={(e) => setSupplierName(e.target.value)} />
                                        </FormControl>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                <div className="inventual-formFour-field">
                                    <div className="inventual-input-field-style">
                                        <h5>Phone</h5>
                                        <FormControl fullWidth>
                                            <Input
                                                value={phone}
                                                placeholder="231 2343-2432"
                                                onChange={(e) => setPhone(e.target.value)}
                                                name="textmask"
                                                id="formatted-text-mask-input"
                                                inputComponent={TextMaskCustom as any}
                                            />
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
                                                value={email}
                                                placeholder="supplier01@gmail.con"
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
                                    <h5>Country</h5>
                                    <div className="inventual-input-field-style">
                                        <FormControl fullWidth>
                                            <TextField
                                                fullWidth
                                                type="text"
                                                required
                                                value={country}
                                                placeholder="United Kindgom"
                                                variant="outlined"
                                                inputProps={{ maxLength: 30 }}
                                                onChange={(e) => setCountry(e.target.value)}
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
                                                value={city}
                                                placeholder="London"
                                                variant="outlined"
                                                inputProps={{ maxLength: 80 }}
                                                onChange={(e) => setCity(e.target.value)}
                                            />
                                        </FormControl>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                <div className="inventual-form-field">
                                    <h5>Address</h5>
                                    <div className="inventual-input-field-style">
                                        <FormControl fullWidth>
                                            <TextField
                                                fullWidth
                                                type="text"
                                                required
                                                value={address}
                                                placeholder='Boulevard 101'
                                                variant="outlined"
                                                inputProps={{ maxLength: 160 }}
                                                onChange={(e) => setAddress(e.target.value)}
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
                                                value={zipCode}
                                                placeholder='SE20-5ET'
                                                variant="outlined"
                                                inputProps={{ maxLength: 20 }}
                                                onChange={(e) => setZipCode(e.target.value)}
                                            />
                                        </FormControl>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                <div className="inventual-form-field">
                                    <h5>Company</h5>
                                    <div className="inventual-input-field-style">
                                        <FormControl fullWidth>
                                            <TextField
                                                fullWidth
                                                type="text"
                                                required
                                                value={company}
                                                placeholder='Apple'
                                                variant="outlined"
                                                inputProps={{ maxLength: 160 }}
                                                onChange={(e) => setCompany(e.target.value)}
                                            />
                                        </FormControl>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                <div className="inventual-form-field">
                                    <h5>Supplier Code</h5>
                                    <div className="inventual-input-field-style">
                                        <TextField
                                            fullWidth
                                            type="number"
                                            value={supplierCode}
                                            placeholder="456"
                                            variant="outlined"
                                            inputProps={{ min: 1, max: 100000}} 
                                            onChange={(e) => {
                                                const value = e.target.value;
                                              
                                                if (/^\d*$/.test(value)) {
                                                    setSupplierCode(value);
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                if (!/[0-9]/.test(e.key) && e.key !== "Backspace") {
                                                    e.preventDefault();
                                                }
                                            }}
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