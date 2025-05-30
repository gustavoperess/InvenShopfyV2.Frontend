"use client"
import { FilledInput, IconButton, InputAdornment, FormControl, TextField } from '@mui/material';
import { Password, Visibility, VisibilityOff } from '@mui/icons-material';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import logo from '../../public/assets/img/logo/login-logo.png';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation'
import { useUserLoginMutation } from '@/services/Authentication/Authentication';


const LoginForm = () => {
    //form password field
    const router = useRouter()
    const [loginUser] = useUserLoginMutation();
    const [userName, setUsername] = useState("Joseph")
    const [isBtnDisable, setBtnDisable] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [password, setPassword] = useState('InvenShopfy123!');
    const [passwordError, setPasswordError] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    //form password field

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const password = e.target.value;
        setPassword(password);
        const passwordPatern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        setPasswordError(!passwordPatern.test(password));
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const userData = { userName, password }
        try {
            await loginUser(userData).unwrap();
            toast.success("Login Successfully");
            setUsername('');
            setPassword('');
            router.push("/dashboard")
        } catch (error: any) {
            if (error?.data) {
                toast.error(error?.data);
            } else {
                // Fallback error message
                toast.error("Failed Log In. Please try again later.")
            }
        }
    }



    return (
        <>
            <form onSubmit={handleSubmit} className="invenShopfy-login-wrapper">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-center">
                    <p className="text-red-800 text-sm font-bold">
                        Please note<br/>
                        This application is hosted on Azure and may experience a cold start.<br />
                        Please be patient while the application loads. <br />
                        It will only take a few seconds to log in 😊
                    </p>
                </div>
                <div className="invenShopfy-login-logo text-center mb-12">
                    <Image src={logo}  style={{ width: 'auto', height: 'auto' }} alt="logo img" />
                </div>
                <div className="invenShopfy-input-field-style mb-5">
                    <div className="invenShopfy-form-field">
                        <div className="invenShopfy-input-field-style has-icon">
                            <FormControl fullWidth>
                                <TextField
                                    fullWidth
                                    placeholder="Email or username"
                                    variant="outlined"
                                    type="text"
                                    value={userName}
                                    required
                                    inputProps={{ maxLength: 80 }}
                                    onChange={(e) => setUsername(e.target.value)}

                                />
                                <span className='invenShopfy-input-icon'><i className="fa-regular fa-user"></i></span>
                            </FormControl>
                        </div>
                    </div>
                </div>
                <div className="invenShopfy-input-field-style invenShopfy-input-field-style-eye mb-5">
                    <div className="invenShopfy-form-field">
                        <div className="invenShopfy-input-eye-style">
                            <FormControl fullWidth>
                                <TextField
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    required
                                    value={password}
                                    onChange={handlePasswordChange}
                                    placeholder="Enter your password"
                                    variant="filled"
                                    error={passwordError}
                                    helperText={
                                        passwordError
                                            ? "Password must be at least eight characters, including at least one letter, one number, and one special character."
                                            : ""
                                    }
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end">
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </FormControl>
                        </div>
                    </div>
                </div>
                {/* Display login error message */}
                {loginError && <p className="text-red-500 text-center mb-5">{loginError}</p>}
                <div className="invenShopfy-login-footer-forgot mb-5">
                    <Link className="text-[16px] inline-block text-primary" href="/forgotpassword">Forgot Password?</Link>
                </div>
                <div className="invenShopfy-login-btn mb-7">
                    <button type="submit" className="invenShopfy-btn w-full" disabled={isBtnDisable}>Log in</button>
                </div>
                <div className="invenShopfy-login-footer">
                    <div className="invenShopfy-login-footer-account text-center">
                        <span className="text-[16px] inline-block text-body">
                            Do not have an account? <Link className="text-[16px] text-primary" href="/registration">Register</Link>
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