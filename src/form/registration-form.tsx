"use client"
import React, { useState } from 'react';
import logo from '../../public/assets/img/logo/login-logo.png'
import InputAdornment from '@mui/material/InputAdornment';
import { IconButton, MenuItem, TextField, FormControl, Input } from '@mui/material';
import Image from 'next/image';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useUserRegisterMutation } from '@/services/Authentication/Authentication';
import { useGetAllRolesQuery } from '@/services/Role/Role';
import { CustomProps, TRoleInterface } from '@/interFace/interFace';
import { IMaskInput } from 'react-imask';


const RegistrationFrom = () => {
    const [registerUser] = useUserRegisterMutation();
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [userName, setUserName] = useState('');
    const router = useRouter()
    const [role, setRole] = useState("")
    const { data: rolesData } = useGetAllRolesQuery();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordErrorTwo, setPasswordErrorTwo] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [emailError, setEmailError] = useState(false);

    //form password field
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    // handle password change 
    const handleConfirmPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setConfirmPassword(value);
        setPasswordError(password !== value);
    };


    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const password = e.target.value;
        setPassword(password);
        const passwordPatern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        setPasswordErrorTwo(!passwordPatern.test(password));
    }

    // handle email change 
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const email = e.target.value;
        setEmail(email);
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmailError(!emailPattern.test(email));
    };


    const [showConfirmPassowrd, setShowConfirmPassowrd] = useState(false);
    const handleClickConfirmShowPassword = () => setShowConfirmPassowrd((show) => !show);
    const handleMouseDownConfirmPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleUserData = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password == confirmPassword) {
            const userData = { name, email, phoneNumber: phone, roleId: role || 0, gender, userName, passwordHash: password }

            try {
                await registerUser(userData).unwrap();
                toast.success("User Created successfully!");
                setPhone('');
                setEmail('');
                setName("")
                setGender('');
                setUserName('');
                setPassword('');
                setRole('');
            } catch (error: any) {
                if (error?.data) {
                    toast.error(error?.data);
                } else {
                    // Fallback error message
                    toast.error("Failed to create User. Please try again later.")
                }
            }
        } else {

            toast.error("Passwords don't match");
        }

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


    return (
        <>
            <div className="invenShopfy-login-area flex justify-center items-center w-full min-h-screen h-full">
                <div className="invenShopfy-login-wrapper">
                    <div className="invenShopfy-login-logo text-center mb-12">
                        <Image src={logo} style={{ width: 'auto', height: "73px" }} alt="logo img" />
                    </div>
                    <form onSubmit={handleUserData}>
                        <div className="invenShopfy-input-field-style mb-5">
                            <div className="invenShopfy-form-field">
                                <div className="invenShopfy-input-field-style has-icon">
                                    <FormControl fullWidth>
                                        <TextField
                                            fullWidth
                                            placeholder="Full Name"
                                            variant="outlined"
                                            type="text"
                                            value={name}
                                            required
                                            inputProps={{ maxLength: 80 }}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                     <span className='invenShopfy-input-icon'><i className="fa-regular fa-user"></i></span>
                                </FormControl>
                                </div>
                            </div>
                        </div>
                        <div className="invenShopfy-input-field-style mb-5">
                            <div className="invenShopfy-form-field">
                                <div className="invenShopfy-input-field-style has-icon">
                                    <FormControl fullWidth>
                                        <TextField
                                            fullWidth
                                            placeholder="Username"
                                            variant="outlined"
                                            type="text"
                                            value={userName}
                                            required
                                            inputProps={{ maxLength: 80 }}
                                            onChange={(e) => setUserName(e.target.value)}
                                        />
                                        <span className='invenShopfy-input-icon'><i className="fa-regular fa-user"></i></span>
                                    </FormControl>
                                </div>
                            </div>
                        </div>
                        <div className="invenShopfy-input-field-style mb-5">
                            <div className="invenShopfy-form-field">
                                <div className="invenShopfy-input-field-style has-icon">
                                    <FormControl fullWidth>
                                        <TextField
                                            fullWidth
                                            type="email"
                                            required
                                            value={email}
                                            placeholder="Email"
                                            variant="outlined"
                                            inputProps={{ maxLength: 80 }}
                                            onChange={handleEmailChange}
                                            error={emailError}
                                            helperText={emailError ? "Please enter a valid email address" : ""}
                                        />
                                        <span className='invenShopfy-input-icon'><i className="far fa-envelope"></i></span>
                                    </FormControl>
                                </div>
                            </div>
                        </div>
                        <div className="invenShopfy-input-field-style mb-5">
                            <div className="invenShopfy-formFour-field">
                                <div className="invenShopfy-input-field-style">
                                    <FormControl fullWidth>
                                        <Input
                                            value={phone}
                                            placeholder="+231 2343-2432"
                                            onChange={(e) => setPhone(e.target.value)}
                                            name="textmask"
                                            inputProps={{ maxLength: 80 }}
                                            id="formatted-text-mask-input"
                                            inputComponent={TextMaskCustom as any}
                                        />
                                        <span className='invenShopfy-input-icon'><i className="far fa-phone-alt"></i></span>
                                    </FormControl>
                                </div>
                            </div>
                        </div>
                        <div className="invenShopfy-input-field-style mb-5">
                            <div className="invenShopfy-select-field">
                                <div className="invenShopfy-select-field-style">
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
                                                    return <em>Select Gender</em>;
                                                }
                                                return value;
                                            },
                                        }}>
                                        <MenuItem value="">
                                            <em>Select Gender</em>
                                        </MenuItem>
                                        <MenuItem value="Male">Male</MenuItem>
                                        <MenuItem value="Female">Female</MenuItem>
                                    </TextField>
                                </div>
                            </div>
                        </div>
                        <div className="invenShopfy-select-field-style mb-5">
                            <FormControl fullWidth>
                                <TextField
                                    label="Select"
                                    select
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    SelectProps={{
                                        displayEmpty: true,
                                        renderValue: (value: any) => {
                                            const selectedRole = rolesData?.data.find((role: TRoleInterface) => role.id === value);
                                            return selectedRole ? selectedRole.roleName : <em>Select Role</em>;
                                        },
                                        MenuProps: {
                                            PaperProps: {
                                                style: {
                                                    maxHeight: '200px',  
                                                    overflowY: 'auto',   
                                                },
                                            },
                                        },
                                    }}>
                                    {rolesData && rolesData.data.length > 0 ? (
                                        rolesData.data.map((role: TRoleInterface) => (
                                            <MenuItem key={role.id} value={role.id}>
                                                {role.roleName}
                                            </MenuItem>
                                        ))
                                    ) : (
                                        <MenuItem value="0">
                                            <em>Not role assigned</em>
                                        </MenuItem>
                                    )}
                                </TextField>
                            </FormControl>
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
                                            error={passwordErrorTwo}
                                            helperText={
                                                passwordErrorTwo
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
                                                            edge="end"
                                                        >
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
                        <div className="invenShopfy-input-field-style invenShopfy-input-field-style-eye mb-5">
                            <div className="invenShopfy-form-field">
                                <div className="invenShopfy-input-eye-style">
                                    <FormControl fullWidth>
                                        <TextField
                                            type={showConfirmPassowrd ? 'text' : 'password'}
                                            name="password"
                                            required
                                            value={confirmPassword}
                                            onChange={handleConfirmPassword}
                                            error={passwordError}
                                            helperText={passwordError ? "Passwords do not match" : ""}
                                            placeholder="Confirm your password"
                                            variant="filled"
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickConfirmShowPassword}
                                                            onMouseDown={handleMouseDownConfirmPassword}
                                                            edge="end">
                                                            {showConfirmPassowrd ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </FormControl>
                                </div>
                            </div>
                        </div>

                        <div className="invenShopfy-login-btn mb-7">
                            <button type='submit' className='invenShopfy-btn w-full'>Register</button>
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
                    <div className="invenShopfy-login-footer">
                        <div className="invenShopfy-login-footer-account text-center">
                            <span className="text-[16px] inline-block text-body">
                                Already have an account? <Link className="text-[16px] text-primary" href="/">Login</Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default RegistrationFrom;



