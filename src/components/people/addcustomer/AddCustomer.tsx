"use client"
import React, { useState } from 'react';
import { MenuItem, TextField, FormControl, Input } from '@mui/material';
import { useAddCustomerMutation } from '@/services/People/Customer';
import { toast } from 'react-toastify';
import { IMaskInput } from 'react-imask';
import { CustomProps } from '@/interFace/interFace';


const AddCustomer = () => {
    const [customerName, setCustomerName] = useState('')
    const [customerGroup, setCustomerGroup] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')
    const [address, setAddress] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [rewardPoint, setRewardPoint] = useState<number | undefined>(undefined);
    const [error, setError] = useState(false);
    const [addCustomer] = useAddCustomerMutation();

    const handleAddCustomer = async (e: any) => {
        e.preventDefault();
        const customerData = {
            customerName, email, phoneNumber: phone, city, country, address, zipCode,
            rewardPoint, customerGroup
        }
        try {
            await addCustomer(customerData).unwrap();
            toast.success("Customer Created successfully!");
            setCustomerName('');
            setCustomerGroup('');
            setPhone('');
            setEmail('');
            setCountry('');
            setCity('');
            setAddress('');
            setZipCode('');
            setRewardPoint(undefined);
        } catch (error: any) {
            if (error?.data?.message) {
                toast.error(error?.data?.message);
                setCustomerName('');
                setCustomerGroup('');
                setPhone('');
                setEmail('');
                setCountry('');
                setCity('');
                setAddress('');
                setZipCode('');
                setRewardPoint(undefined);
            } else {
                // Fallback error message
                toast.error("Failed to create Customer. Please try again later.");
            }
        }
    }

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



    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setRewardPoint(value === '' ? undefined : Number(value)); 
        }
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const email = e.target.value;
        setEmail(email);
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setError(!emailPattern.test(email));
    };
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!/[0-9]/.test(e.key) && e.key !== "Backspace") {
            e.preventDefault();
        }
    }


    return (
        <>
            <div className="invenShopfy-content-area px-4 sm:px-7 max2Xl:pb-0 pb-[180px]">
                <div className="invenShopfy-addcustomer-area bg-white p-5 sm:p-7 custom-shadow rounded-8 mt-7">
                    <form onSubmit={handleAddCustomer}>
                        <div className="grid grid-cols-12 gap-y-7 sm:gap-7">
                            <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                <div className="invenShopfy-form-field">
                                    <h5>Customer Name</h5>
                                    <div className="invenShopfy-input-field-style">
                                        <FormControl fullWidth>
                                            <TextField
                                                fullWidth
                                                type="text"
                                                required
                                                value={customerName}
                                                placeholder='Walk - in - customer'
                                                variant="outlined"
                                                inputProps={{ maxLength: 150 }}
                                                onChange={(e) => setCustomerName(e.target.value)} />
                                        </FormControl>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                <div className="invenShopfy-form-field">
                                    <h5>Customer Group</h5>
                                    <div className="invenShopfy-select-field-style">
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
                                <div className="invenShopfy-formFour-field">
                                    <div className="invenShopfy-input-field-style">
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
                                <div className="invenShopfy-form-field">
                                    <h5>Email</h5>
                                    <div className="invenShopfy-input-field-style">
                                        <FormControl fullWidth>
                                            <TextField
                                                fullWidth
                                                type="email"
                                                required
                                                value={email}
                                                placeholder="customer01@gmail.con"
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
                                <div className="invenShopfy-form-field">
                                    <h5>Country</h5>
                                    <div className="invenShopfy-input-field-style">
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
                                <div className="invenShopfy-form-field">
                                    <h5>City</h5>
                                    <div className="invenShopfy-input-field-style">
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
                                <div className="invenShopfy-form-field">
                                    <h5>Address</h5>
                                    <div className="invenShopfy-input-field-style">
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
                                <div className="invenShopfy-form-field">
                                    <h5>Zip Code</h5>
                                    <div className="invenShopfy-input-field-style">
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
                                <div className="invenShopfy-form-field">
                                    <h5>Reward Point</h5>
                                    <div className="invenShopfy-input-field-style">
                                        <FormControl fullWidth>
                                         <TextField
                                            fullWidth
                                            type="number"
                                            value={rewardPoint !== undefined ? rewardPoint : ''} 
                                            placeholder="456"
                                            variant="outlined"
                                            inputProps={{ min: 1, max: 100000}} 
                                            onChange={handleChangeName}
                                            onKeyDown={handleKeyDown}
                                        />
                                        </FormControl>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 flex justify-end">
                                <button type="submit" className="invenShopfy-btn">Create Customer</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddCustomer;