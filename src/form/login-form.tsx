"use client"
import { FilledInput, IconButton, InputAdornment } from '@mui/material';
import { Password, Visibility, VisibilityOff } from '@mui/icons-material';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import logo from '../../public/assets/img/logo/login-logo.png';
import { useFormik } from 'formik';
import { login_schema } from '@/utils/validation-schema';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation'
import ErrorMassage from './input-form-error';
import { useUserLoginMutation } from '@/services/Authentication/Authentication';
import { string } from 'yup';

const LoginForm = () => {
    //form password field
    const router = useRouter()
    const [loginUser] = useUserLoginMutation();
    const [isBtnDisable, setBtnDisable] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    //form password field

    const { handleSubmit,handleChange, handleBlur, values, errors, touched, resetForm } = useFormik({
        initialValues: {
            userName: '',
            password: ''
        },
        validationSchema: login_schema,
        onSubmit: async (values) => {
            try {
                const credentials = {
                    Email: values.userName,
                    Password: values.password
                };
                await loginUser(credentials).unwrap();
                resetForm();
                toast.success("Login Successfully");
                setBtnDisable(true)
                router.push("/dashboard")
            } catch (error: any) {
                console.log("THIS HERE")
                toast.warning(error.message);
            }
        }
    })

    return (
        <>
            <form onSubmit={handleSubmit} className="inventual-login-wrapper">
                <div className="inventual-login-logo text-center mb-12">
                    <Image src={logo} style={{ width: 'auto', height: 'auto' }} alt="logo img" />
                </div>
                <div className="inventual-input-field-style mb-5">
                    <div className="inventual-form-field">
                        <div className="inventual-input-field-style has-icon">
                            <input type="text"
                                onChange={handleChange}
                                defaultValue={values.userName}
                                onBlur={handleBlur}
                                name='userName'
                                id='userName'
                                placeholder='User name'
                                required
                            />
                            {touched.userName && <ErrorMassage ErrorMsg={errors.userName} />}
                            <span className='inventual-input-icon'><i className="fa-regular fa-user"></i></span>
                        </div>
                    </div>
                </div>
                <div className="inventual-input-field-style inventual-input-field-style-eye mb-5">
                    <div className="inventual-form-field">
                        <div className="inventual-input-eye-style">
                            <FilledInput
                                type={showPassword ? 'text' : 'password'}
                                name='password'
                                onChange={handleChange}
                                defaultValue={values.password}
                                onBlur={handleBlur}
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
                            {touched.password && <ErrorMassage ErrorMsg={errors.password} />}
                        </div>
                    </div>
                </div>
                <div className="inventual-login-footer-forgot mb-5">
                    <Link className="text-[16px] inline-block text-primary" href="/forgotpassword">Forgot Password?</Link>
                </div>
                <div className="inventual-login-btn mb-7">
                     <button type="submit" className="inventual-btn w-full" disabled={isBtnDisable}>Log in</button>
                </div>
                <div className="inventual-login-footer">
                    <div className="inventual-login-footer-account text-center">
                        <span className="text-[16px] inline-block text-body">
                            Don't have an account? <Link className="text-[16px] text-primary" href="/registration">Register</Link>
                        </span>
                    </div>
                </div>
            </form>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    );
};

export default LoginForm;