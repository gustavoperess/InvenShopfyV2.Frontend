"use client"
import React, { useState } from 'react';
import logo from '../../public/assets/img/logo/login-logo.png'
import Image from 'next/image';
import Link from 'next/link'
import { TextField, FormControl } from '@mui/material';

const ForgotPasswordFrom = () => {

    return (
        <div className="invenShopfy-login-area flex justify-center items-center w-full min-h-screen h-full">
            <div className="invenShopfy-login-wrapper">
                <div className="invenShopfy-login-logo text-center mb-12">
                    <Image src={logo}  style={{ width: 'auto', height: "73px" }} alt="logo img" />
                </div>
                <div className="invenShopfy-input-field-style mb-5">
                    <div className="invenShopfy-form-field">
                        <div className="invenShopfy-input-field-style has-icon">
                            <FormControl fullWidth>
                                <TextField
                                    fullWidth
                                    type="text"
                                    required
                                    // value={warehouseName}
                                    placeholder="Email"
                                    variant="outlined"
                                    inputProps={{ maxLength: 50 }}
                                // onChange={(e) => setWarehouseName(e.target.value)}  
                                />
                                <span className='invenShopfy-input-icon'><i className="far fa-envelope"></i></span>
                            </FormControl>

                        </div>
                    </div>
                </div>
                <div className="invenShopfy-login-btn mb-7">
                    <Link className='invenShopfy-btn w-full' href="#">Send</Link>
                </div>
                <div className="invenShopfy-login-footer">
                    <div className="invenShopfy-login-footer-account text-center">
                        <span className="text-[16px] inline-block text-body">
                            Back to <Link className="text-[16px] text-primary" href="/">Login</Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default ForgotPasswordFrom;