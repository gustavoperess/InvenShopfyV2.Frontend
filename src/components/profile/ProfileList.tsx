"use client"
import React, { useState } from 'react';
import { FilledInput, IconButton, InputAdornment, MenuItem, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Image from 'next/image';
import adminUser from '../../../public/assets/img/user/user-profile.png';

const ProfileList = () => {
    //form password field
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    //form password field

    const dummyData = (e: any) => {
        e.preventDefault();
    };

    return (
        <>
            <div className="inventual-content-area px-4 sm:px-7">
                <div className="inventual-create-payment-area bg-white p-5 sm:p-7 custom-shadow rounded-8">
                    <div className="inventual-profile-area">
                        <div className="inventual-profile-wrapper flex items-center flex-wrap gap-x-12 gap-y-5 mb-14">
                            <div className="inventual-profile-info flex flex-wrap items-center gap-5">
                                <div className="inventual-profile-info-img">
                                    <Image src={adminUser} style={{ width: "120px", height: '120px'}} alt="user not found" />
                                </div>
                                <div className="inventual-profile-info-text">
                                    <h4 className="text-heading font-bold text-[20px] md:text-[24px] mb-1">Shane Watson</h4>
                                    <span className="text-[16px]">Admin User</span>
                                </div>
                            </div>
                            <div className="inventual-profile-info-btn">
                                <button type="submit" className="inventual-outline-btn">Edit Profile </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-12 gap-7">
                            <div className="col-span-12">
                                <div className="grid grid-cols-12 gap-x-7">
                                    <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                        <div className="inventual-form-field">
                                            <h5>Supplier Name</h5>
                                            <div className="inventual-input-field-style">
                                                <input type="name" placeholder='Walk - in - customer' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                        <div className="inventual-select-field mb-7">
                                            <div className="inventual-form-field">
                                                <h5>Phone</h5>
                                                <div className="inventual-input-field-style">
                                                    <input type="tel" placeholder='00 000 000 000' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                        <div className="inventual-select-field mb-7">
                                            <div className="inventual-form-field">
                                                <h5>Email</h5>
                                                <div className="inventual-input-field-style">
                                                    <input type="email" placeholder='shane@example.com' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                        <div className="inventual-form-field mb-5">
                                            <h5>Gender</h5>
                                            <div className="inventual-select-field-style">
                                                <TextField
                                                    select
                                                    label="Select"
                                                    defaultValue=""
                                                    SelectProps={{
                                                        displayEmpty: true,
                                                        renderValue: (value: any) => {
                                                            if (value === '') {
                                                                return <em>Select Gender</em>;
                                                            }
                                                            return value;
                                                        },
                                                    }}
                                                >
                                                    <MenuItem value="">
                                                        <em>Select Gender</em>
                                                    </MenuItem>
                                                    <MenuItem value="Male">Male</MenuItem>
                                                    <MenuItem value="Female">Female</MenuItem>
                                                </TextField>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                        <div className="inventual-select-field mb-7">
                                            <div className="inventual-form-field">
                                                <h5>Username</h5>
                                                <div className="inventual-input-field-style">
                                                    <input type="text" placeholder='Shane_Watson' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                        <div className="inventual-form-field">
                                            <h5>Password</h5>
                                            <div className="inventual-input-eye-style">
                                                <FilledInput
                                                    type={showPassword ? 'text' : 'password'}
                                                    name='password'
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
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                        <div className="inventual-form-field mb-5">
                                            <h5>Role</h5>
                                            <div className="inventual-select-field-style">
                                                <TextField
                                                    select
                                                    label="Select"
                                                    defaultValue=""
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
                                                    <MenuItem value="Admin">Admin</MenuItem>
                                                    <MenuItem value="User">User</MenuItem>
                                                </TextField>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                        <div className="inventual-select-field mb-7">
                                            <div className="inventual-form-field">
                                                <h5>Company Name</h5>
                                                <div className="inventual-input-field-style">
                                                    <input type="text" placeholder='Topylo' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                        <div className="inventual-select-field mb-7">
                                            <div className="inventual-form-field">
                                                <h5>Address</h5>
                                                <div className="inventual-input-field-style">
                                                    <input type="text" placeholder='5874 Street Park, New York, USA' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12">
                                        <button type="submit" className="inventual-btn">Update Profile</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileList;