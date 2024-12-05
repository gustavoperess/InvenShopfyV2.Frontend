"use client"

import React, { useState } from 'react';
//form password field
import IconButton from '@mui/material/IconButton';
import FilledInput from '@mui/material/FilledInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
//form password field

const FormElements = () => {
    //form password field
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
        <div className="invenShopfy-common-card mb-5">
            <form onSubmit={dummyData}>
                <div className="grid grid-cols-12 sm:gap-x-[30px] gap-y-[18px]">
                    <div className="col-span-12 md:col-span-6">
                        <div className="invenShopfy-form-field">
                            <h5>Input Style</h5>
                            <div className="invenShopfy-input-field-style">
                                <input type="text" placeholder='Steven Smith' />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-6">
                        <div className="invenShopfy-form-field">
                            <h5>Email Style</h5>
                            <div className="invenShopfy-input-field-style">
                                <input type="email" placeholder='Steven@gmail.com' />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-6">
                        <div className="invenShopfy-form-field">
                            <h5>Eye Style</h5>
                            <div className="invenShopfy-input-eye-style">
                                <FilledInput
                                    type={showPassword ? 'text' : 'password'}
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
                    <div className="col-span-12 md:col-span-6">
                        <div className="invenShopfy-form-field">
                            <h5>Input With Icon</h5>
                            <div className="invenShopfy-input-field-style has-icon">
                                <input type="text" placeholder='User name' />
                                <span className='invenShopfy-input-icon'><i className="fa-regular fa-user"></i></span>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-6">
                        <div className="invenShopfy-form-field">
                            <h5>Input With Icon</h5>
                            <div className="invenShopfy-input-field-style has-icon-outline">
                                <input type="text" placeholder='User name' />
                                <span className='invenShopfy-input-icon'><span>&</span></span>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-6">
                        <div className="invenShopfy-form-field">
                            <h5>Input With Icon</h5>
                            <div className="invenShopfy-input-field-style has-icon-outline">
                                <input type="text" placeholder='User name' />
                                <span className='invenShopfy-input-icon'><span>$</span></span>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12">
                        <div className="invenShopfy-form-field">
                            <h5>Input Type File</h5>
                            <div className="invenShopfy-input-field-file-choose">
                                <input type="file" id="fileUploadN" />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12">
                        <div className="invenShopfy-form-field">
                            <h5>Textarea Style</h5>
                            <div className="invenShopfy-input-field-style">
                                <textarea placeholder='Write your message'></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default FormElements;