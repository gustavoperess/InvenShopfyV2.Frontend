"use client"
import React, { useState } from 'react';
import logo from '../../public/assets/img/logo/login-logo.png'
import Image from 'next/image';
import Link from 'next/link'
import { TextField, FormControl } from '@mui/material';

const ForgotPasswordFrom = () => {

    return (
        <div className="inventual-login-area flex justify-center items-center w-full min-h-screen h-full">
            <div className="inventual-login-wrapper">
                <div className="inventual-login-logo text-center mb-12">
                    <Image src={logo}  style={{ width: 'auto', height: "73px" }} alt="logo img" />
                </div>
                <div className="inventual-input-field-style mb-5">
                    <div className="inventual-form-field">
                        <div className="inventual-input-field-style has-icon">
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
                                <span className='inventual-input-icon'><i className="far fa-envelope"></i></span>
                            </FormControl>

                        </div>
                    </div>
                </div>
                <div className="inventual-login-btn mb-7">
                    <Link className='inventual-btn w-full' href="#">Send</Link>
                </div>
                <div className="inventual-login-footer">
                    <div className="inventual-login-footer-account text-center">
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