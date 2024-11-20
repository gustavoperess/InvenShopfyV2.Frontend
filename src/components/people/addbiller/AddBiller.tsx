"use client"
import React, { useState, useEffect } from 'react';
import { MenuItem, TextField, FormControl, Input } from '@mui/material';
import DatePicker from "react-datepicker"; import { toast } from 'react-toastify';
import { useGetAllWarehousesQuery } from '@/services/Warehouse/Warehouse';
import { useAddBillerMutation } from '@/services/People/Biller';
import { IMaskInput } from 'react-imask';
import { TWarehouseInterface, CustomProps } from '@/interFace/interFace';




const AddBiller = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [billerPhoneNumber, setBillerPhoneNumber] = useState<string>("");
    const [country, setCountry] = useState('');
    const [identification, setIdentification] = useState('');
    const [selectWarehouse, setSelectWarehosue] = useState('')
    const [address, setAddress] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [billerCode, setBillerCode] = useState('');
    const [error, setError] = useState(false);
    const [addBiller] = useAddBillerMutation();
    const { data: warehouseData } = useGetAllWarehousesQuery({ pageNumber: 1, pageSize: 25 });


    const handleBillerForm = async (e: any) => {
        e.preventDefault();
        let date = formatDate(startDate)

        const billerData = {
            name, dateOfJoin: date, email, phoneNumber: billerPhoneNumber, identification, address, country,
            zipCode, billerCode, warehouseId: selectWarehouse
        }
       
        try {
            await addBiller(billerData).unwrap();
            toast.success("Biller Created successfully!");
            setStartDate(new Date());
            setName('');
            setBillerPhoneNumber('');
            setEmail('');
            setSelectWarehosue('');
            setAddress('');
            setZipCode('');
            setBillerCode('');
        } catch (error: any) {
            if (error?.data?.message) {
                toast.error(error?.data?.message);
            } else {
                // Fallback error message
                toast.error("Failed to create Biller. Please try again later.");
            }
        }

    };

    useEffect(() => {

        if (selectWarehouse && warehouseData.data.length > 0 && !selectWarehouse) {
            setSelectWarehosue(warehouseData.data[0].id);
        }


    }, [warehouseData, selectWarehouse]);



    // handle Date
    const handleDateChange = (date: Date | null) => {
        setStartDate(date || new Date());
    };

    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
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
                <div className="inventual-create-payment-area bg-white p-5 sm:p-7 custom-shadow rounded-8 mt-7">
                    <form onSubmit={handleBillerForm}>
                        <div className="grid grid-cols-12 gap-y-7 sm:gap-7">
                            <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                <div className="inventual-form-field">
                                    <h5>Name</h5>
                                    <div className="inventual-input-field-style">
                                        <FormControl fullWidth>
                                            <TextField
                                                fullWidth
                                                type="name"
                                                required
                                                value={name}
                                                placeholder='Seller name'
                                                variant="outlined"
                                                inputProps={{ maxLength: 150 }}
                                                onChange={(e) => setName(e.target.value)} />
                                        </FormControl>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                <div className="inventual-formTwo-field">
                                    <h5>Date of Join</h5>
                                    <div className="inventual-input-field-style">
                                        <DatePicker
                                            selected={startDate}
                                            required
                                            onChange={handleDateChange}
                                            showYearDropdown
                                            showMonthDropdown
                                            useShortMonthInDropdown
                                            showPopperArrow={false}
                                            peekNextMonth
                                            dropdownMode="select"
                                            isClearable
                                            placeholderText="DD/MM/YYYY"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                <div className="inventual-formFour-field">
                                    <div className="inventual-input-field-style">
                                        <h5>Phone</h5>
                                        <FormControl fullWidth>
                                            <Input
                                                value={billerPhoneNumber}
                                                placeholder="+231 2343-2432"
                                                onChange={(e) => setBillerPhoneNumber(e.target.value)}
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
                                                placeholder="Seller01@gmail.con"
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
                                    <h5>NID or Passport Number</h5>
                                    <div className="inventual-input-field-style">
                                        <FormControl fullWidth>
                                            <TextField
                                                fullWidth
                                                type="text"
                                                required
                                                value={identification}
                                                placeholder="345090-1930"
                                                variant="outlined"
                                                inputProps={{ maxLength: 30 }}
                                                onChange={(e) => setIdentification(e.target.value)}
                                            />
                                        </FormControl>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                <div className="inventual-form-field">
                                    <h5>Warehouse</h5>
                                    <div className="inventual-select-field-style">
                                        <TextField
                                            select
                                            label="Select"
                                            required
                                            value={selectWarehouse}
                                            onChange={(e) => setSelectWarehosue(e.target.value)}
                                            SelectProps={{
                                                displayEmpty: true,
                                                renderValue: (value: any) => {
                                                    const selectedWarehouse = warehouseData?.data.find((warehouse: TWarehouseInterface) => warehouse.id === value);
                                                    return selectedWarehouse ? selectedWarehouse.warehouseName : <em>Select Warehouse</em>;
                                                },
                                            }}>
                                            {warehouseData && warehouseData.data.length > 0 ? (
                                                warehouseData.data.map((warehouse: TWarehouseInterface) => (
                                                    <MenuItem key={warehouse.id} value={warehouse.id}>
                                                        {warehouse.warehouseName}
                                                    </MenuItem>
                                                ))
                                            ) : (
                                                <MenuItem value="">
                                                    <em>No Warehouse Available</em>
                                                </MenuItem>
                                            )}
                                        </TextField>
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
                                                inputProps={{ maxLength: 80 }}
                                                onChange={(e) => setAddress(e.target.value)}
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
                                    <h5>Biller Code</h5>
                                    <div className="inventual-input-field-style">
                                        <TextField
                                            fullWidth
                                            type="number"
                                            value={billerCode}
                                            placeholder="4561738"
                                            variant="outlined"
                                            inputProps={{ min: 1, max: 100000000 }}
                                            onChange={(e) => {
                                                const value = e.target.value;

                                                if (/^\d*$/.test(value)) {
                                                    setBillerCode(value);
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

export default AddBiller;