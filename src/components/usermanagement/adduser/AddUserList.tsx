"use client"
import React, { useState } from 'react';
import { MenuItem, TextField } from '@mui/material';
import { FilledInput, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Image from 'next/image';
import { toast } from 'react-toastify';

const AddUserList = () => {

    // form password field
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    // form password field

    // uploaded images
    const [fileUrl, setFileUrl] = useState<string>('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const fileId = URL.createObjectURL(file);
            setFileUrl(fileId);
        }
    };

    const handleRemove = () => {
        setFileUrl('');
    };


    // handle user form data
    const [supplierName, setSupplierName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const handleUserData = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            toast.success("User Created successfully!");
            setSupplierName('');
            setPhone('');
            setEmail('');
            setGender('');
            setUserName('');
            setPassword('');
            setRole('');
            setFileUrl('');
        } catch {
            toast.error("Failed to create User. Please try again later.");
        }
    };

    return (
        <>
            <div className="inventual-content-area px-4 sm:px-7 max2Xl:pb-0 pb-[170px]">
                <div className="inventual-adduser-area bg-white p-5 sm:p-7 custom-shadow rounded-8 mt-7">
                    <form onSubmit={handleUserData}>
                        <div className="grid grid-cols-12 gap-y-7 sm:gap-7">
                            <div className="col-span-12">
                                <div className="inventual-input-field-style flex maxSm:flex-wrap gap-5 relative">
                                    <div className="inventual-input-field-file-image image-1">
                                        <label htmlFor="fileUpload">
                                            {fileUrl ? "Image Uploaded" : "Upload Profile Image"}
                                        </label>
                                        <input
                                            type="file"
                                            id="fileUpload"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                    {fileUrl && (
                                        <div className="inventual-drag-product-img">
                                            <Image src={fileUrl} width={60} height={60} alt="Uploaded Image" className="object-cover" />
                                            <button type="button" className='inventual-inventual-drag-close' onClick={handleRemove}>X</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                <div className="inventual-form-field">
                                    <h5>Supplier Name</h5>
                                    <div className="inventual-input-field-style">
                                        <input
                                            required
                                            value={supplierName}
                                            onChange={(e) => setSupplierName(e.target.value)}
                                            type="text"
                                            placeholder='Joseph Tylor'
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                <div className="inventual-select-field">
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
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                <div className="inventual-select-field">
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
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                <div className="inventual-form-field">
                                    <h5>Gender</h5>
                                    <div className="inventual-select-field-style">
                                        <TextField
                                            select
                                            label="Select"
                                            required
                                            value={gender}
                                            onChange={(e) => setGender(e.target.value)}
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
                                            <MenuItem value="Male">Male</MenuItem>
                                            <MenuItem value="Female">Female</MenuItem>
                                        </TextField>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                <div className="inventual-select-field">
                                    <div className="inventual-form-field">
                                        <h5>Username</h5>
                                        <div className="inventual-input-field-style">
                                            <input
                                                required
                                                value={userName}
                                                onChange={(e) => setUserName(e.target.value)}
                                                type="text"
                                                placeholder='Tylor Biller'
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                <div className="inventual-input-field-style inventual-input-field-style-eye">
                                    <div className="inventual-form-field">
                                        <h5>Password</h5>
                                        <div className="inventual-input-eye-style">
                                            <FilledInput
                                                type={showPassword ? 'text' : 'password'}
                                                name='password'
                                                required
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="Enter your password"
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                <div className="inventual-form-field">
                                    <h5>Role</h5>
                                    <div className="inventual-select-field-style">
                                        <TextField
                                            select
                                            label="Select"
                                            defaultValue=""
                                            required
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                            SelectProps={{
                                                displayEmpty: true,
                                                renderValue: (value: any) => {
                                                    if (value === '') {
                                                        return <em>Select Role</em>;
                                                    }
                                                    return value;
                                                },
                                            }}
                                        >
                                            <MenuItem value="">
                                                <em>Select Role</em>
                                            </MenuItem>
                                            <MenuItem value="Supervisor">Supervisor</MenuItem>
                                            <MenuItem value="Officer">Officer</MenuItem>
                                            <MenuItem value="Manager">Manager</MenuItem>
                                        </TextField>
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

export default AddUserList;
