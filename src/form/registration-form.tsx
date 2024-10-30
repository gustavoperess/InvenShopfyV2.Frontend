"use client"
import React, { useState } from 'react';
import logo from '../../public/assets/img/logo/login-logo.png'
import FilledInput from '@mui/material/FilledInput';
import InputAdornment from '@mui/material/InputAdornment';
import { IconButton, MenuItem, TextField,FormControl } from '@mui/material';
import Image from 'next/image';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Link from 'next/link'
import { useFormik } from 'formik';
import { signup_schema } from '@/utils/validation-schema';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import ErrorMassage from './input-form-error';
import { useUserRegisterMutation } from '@/services/Authentication/Authentication';
import { useGetAllRolesQuery } from '@/services/Role/Role';

interface roleData {
    id: number;
    name: string;
}


const RegistrationFrom = () => {
    const [registerUser] = useUserRegisterMutation();
    const router = useRouter()
    const [role, setRole] = useState("")
    const { data: rolesData } = useGetAllRolesQuery();

    //form password field
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    //form password field

    const { handleSubmit, handleBlur, handleChange, values, errors, touched, resetForm } = useFormik({
        initialValues: {
            name: "",
            userName: "",
            email: "",
            password: "",
            phone: "",
            selectRole: ""
        },
        validationSchema: signup_schema,
        onSubmit: async (values) => {
            const credentials = {
                Name: values.name,
                UserName: values.userName,
                Email: values.email,
                PasswordHash: values.password,
                PhoneNumber: values.phone,
                RoleName: role
            };
            try {
                await registerUser(credentials).unwrap();
                resetForm();
                toast.success("Register Successfully");
                router.push("/")

            } catch (error: any) {
                toast.warning(error.message);
            }
        }
    })


    return (
        <>
            <div className="inventual-login-area flex justify-center items-center w-full min-h-screen h-full">
                <div className="inventual-login-wrapper">
                    <div className="inventual-login-logo text-center mb-12">
                        <Image src={logo} style={{ width: 'auto', height: "73px" }} alt="logo img" />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="inventual-input-field-style mb-5">
                            <div className="inventual-form-field">
                                <div className="inventual-input-field-style has-icon">
                                    <input type="text"
                                        onChange={handleChange}
                                        defaultValue={values.userName}
                                        onBlur={handleBlur}
                                        name='name'
                                        id='name'
                                        placeholder='Name'
                                        required
                                    />
                                    <span className='inventual-input-icon'><i className="fa-regular fa-user"></i></span>
                                </div>
                                {touched.name && <ErrorMassage ErrorMsg={errors.name} />}
                            </div>
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
                                        placeholder='Username'
                                        required
                                    />
                                    <span className='inventual-input-icon'><i className="fa-regular fa-user"></i></span>
                                </div>
                                {touched.userName && <ErrorMassage ErrorMsg={errors.userName} />}
                            </div>
                        </div>
                        <div className="inventual-input-field-style mb-5">
                            <div className="inventual-form-field">
                                <div className="inventual-input-field-style has-icon">
                                    <input type="email"
                                        onChange={handleChange}
                                        defaultValue={values.email}
                                        onBlur={handleBlur}
                                        name='email'
                                        id='email'
                                        placeholder='Email'
                                        required
                                    />
                                    <span className='inventual-input-icon'><i className="far fa-envelope"></i></span>
                                </div>
                                {touched.email && <ErrorMassage ErrorMsg={errors.email} />}
                            </div>
                        </div>
                        <div className="inventual-input-field-style mb-5">
                            <div className="inventual-form-field">
                                <div className="inventual-input-field-style has-icon">
                                    <input type="tel"
                                        onChange={handleChange}
                                        defaultValue={values.phone}
                                        onBlur={handleBlur}
                                        name='phone'
                                        id='phone'
                                        placeholder='Phone'
                                        required
                                    />
                                    <span className='inventual-input-icon'><i className="far fa-phone-alt"></i></span>
                                </div>
                                {touched.phone && <ErrorMassage ErrorMsg={errors.phone} />}
                            </div>
                        </div>
                        <div className="inventual-select-field-style mb-5">
                            <FormControl fullWidth>
                                <TextField
                                    label="Select"
                                    select
                                    required
                                    helperText="Please select a Role"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    SelectProps={{
                                        displayEmpty: true,
                                        renderValue: (value) => {
                                            const selectedRole = rolesData?.find(
                                                (role: roleData) => role.id === Number(value)
                                            );
                                            return selectedRole ? selectedRole.name : <em>Select Role</em>;
                                        },
                                    }}>
                                    {rolesData && rolesData.length > 0 ? (
                                        rolesData.map((role: roleData) => (
                                            <MenuItem key={role.id} value={role.id}>
                                                {role.name}
                                            </MenuItem>
                                        ))
                                    ) : (
                                        <MenuItem value="">
                                            <em>No roles Available</em>
                                        </MenuItem>
                                    )}
                                </TextField>
                            </FormControl>
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

                        <div className="inventual-login-btn mb-7">
                            <button type='submit' className='inventual-btn w-full'>Register</button>
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
                    <div className="inventual-login-footer">
                        <div className="inventual-login-footer-account text-center">
                            <span className="text-[16px] inline-block text-body">
                                Have not an account? <Link className="text-[16px] text-primary" href="/">Login</Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );

};

export default RegistrationFrom;