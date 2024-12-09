"use client"
import React, { useState, useCallback } from 'react';
import { MenuItem, TextField, FormControl, Input } from '@mui/material';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Accept, useDropzone } from "react-dropzone";
import { useGetAllRolesQuery } from '@/services/Role/Role';
import { useUserRegisterMutation } from '@/services/Authentication/Authentication';
import { toast } from 'react-toastify';
import { TRoleInterface, CustomProps } from '@/interFace/interFace';
import { IMaskInput } from 'react-imask';


const AddEmployeeList = () => {
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userImage, setUserImage] = useState<string | null>(null);
    const [role, setRole] = useState('');

    const [emailError, setEmailError] = useState(false);
    const [passwordErrorTwo, setPasswordErrorTwo] = useState(false);
    const [registerUser] = useUserRegisterMutation()
    const [passwordError, setPasswordError] = useState(false);
    const { data: rolesData } = useGetAllRolesQuery();

    // form password field
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const [showConfirmPassowrd, setShowConfirmPassowrd] = useState(false);
    const handleClickConfirmShowPassword = () => setShowConfirmPassowrd((show) => !show);
    const handleMouseDownConfirmPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };



    // uploaded images
    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            const reader = new FileReader();

            reader.onloadend = () => {
                const base64String = reader.result as string; // Cast to string
                const base64WithoutPrefix = base64String.split(',')[1];
                setUserImage(base64WithoutPrefix);
                // setProductImage(`data:${dataUrl}`);
            };

            reader.readAsDataURL(file); // Read the file as Data URL (Base64)
        }
    }, []);

    const accept: Accept = {
        'image/*': []
    };
    const { getRootProps, getInputProps } = useDropzone({ onDrop, accept });


    // handle email change 
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const email = e.target.value;
        setEmail(email);
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmailError(!emailPattern.test(email));
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

    const handleUserData = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password == confirmPassword) {
            const userData = { name, email, gender, phoneNumber: phone, profilePicture: userImage, roleId: role, userName, passwordHash: password }
            try {
                await registerUser(userData).unwrap();
                toast.success("User Created successfully!");
                setPhone('');
                setEmail('');
                setGender('');
                setName('');
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


    return (
        <>
            <div className="invenShopfy-content-area px-4 sm:px-7 max2Xl:pb-0 pb-[170px]">
                <div className="invenShopfy-adduser-area bg-white p-5 sm:p-7 custom-shadow rounded-8 mt-7">
                    <form onSubmit={handleUserData}>
                        <div className="grid grid-cols-12 gap-y-7 sm:gap-7">
                            <div className="col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-4">
                                <div className="invenShopfy-product-dragdrop ngx-file-drop__drop-zone text-center border border-dashed border-primary bg-[#F8FAFF] p-4"
                                    style={{ padding: '10px', marginBottom: '10px' }}>
                                    <div {...getRootProps({ className: 'dropzone-two' })}>
                                        <input {...getInputProps()} />
                                        {userImage ? (
                                            <img src={`data:image/jpeg;base64,${userImage}`} alt="Selected" className="preview-image"
                                                style={{ maxHeight: '300px', width: 'auto', objectFit: 'contain' }}
                                            />
                                        ) : (
                                            <>
                                                <h3 className="text-[20px] font-semibold text-heading mb-4">Drop User image here</h3>
                                                <span className="block text-[20px] font-semibold text-heading mb-7">Or</span>
                                                <button type="submit" className="invenShopfy-btn">Browse Picture</button>
                                                <span className="text-[14px] text-heading font-medium block pt-7">Allowed JPEG, JPG & PNG format  |  Max 100 mb</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-8">
                                <div className="grid grid-cols-12 gap-y-7 sm:gap-7">
                                    <div className="col-span-12 md:col-span-6 xl:col-span-12">
                                        <div className="invenShopfy-form-field">
                                            <h5>Full Name</h5>
                                            <div className="invenShopfy-input-field-style">
                                                <FormControl fullWidth>
                                                    <TextField
                                                        fullWidth
                                                        placeholder="Joseph"
                                                        variant="outlined"
                                                        type="text"
                                                        value={name}
                                                        required
                                                        inputProps={{ maxLength: 80 }}
                                                        onChange={(e) => setName(e.target.value)}
                                                    />
                                                </FormControl>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6">
                                        <div className="invenShopfy-select-field">
                                            <div className="invenShopfy-form-field">
                                                <h5>Username</h5>
                                                <div className="invenShopfy-input-field-style">
                                                    <FormControl fullWidth>
                                                        <TextField
                                                            fullWidth
                                                            placeholder="Joseph"
                                                            variant="outlined"
                                                            type="text"
                                                            value={userName}
                                                            required
                                                            inputProps={{ maxLength: 80 }}
                                                            onChange={(e) => setUserName(e.target.value)}
                                                        />
                                                    </FormControl>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6">
                                        <div className="invenShopfy-select-field">
                                            <div className="invenShopfy-form-field">
                                                <h5>Email</h5>
                                                <div className="invenShopfy-input-field-style">
                                                    <FormControl fullWidth>
                                                        <TextField
                                                            fullWidth
                                                            type="email"
                                                            required
                                                            value={email}
                                                            placeholder="Joseph@invenShopfy.com"
                                                            variant="outlined"
                                                            inputProps={{ maxLength: 80 }}
                                                            onChange={handleEmailChange}
                                                            error={emailError}
                                                            helperText={emailError ? "Please enter a valid email address" : ""}
                                                        />
                                                    </FormControl>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                        <div className="invenShopfy-formFour-field">
                                            <div className="invenShopfy-form-field">
                                                <h5>Phone</h5>
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
                                                </FormControl>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                        <div className="invenShopfy-form-field">
                                            <h5>Gender</h5>
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
                                        <div className="invenShopfy-form-field">
                                            <h5>Gender</h5>
                                            <div className="invenShopfy-select-field-style">
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
                                                        }}>
                                                        {rolesData && rolesData.data.length > 0 ? (
                                                            rolesData.data.map((role: TRoleInterface) => (
                                                                <MenuItem key={role.id} value={role.id}>
                                                                    {role.roleName}
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
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6">
                                        <div className="invenShopfy-input-field-style invenShopfy-input-field-style-eye">
                                            <div className="invenShopfy-form-field">
                                                <h5>Password</h5>
                                                <div className="invenShopfy-input-eye-style">
                                                    <FormControl fullWidth>
                                                        <TextField
                                                            type={showPassword ? 'text' : 'password'}
                                                            name="password"
                                                            required
                                                            value={password}
                                                            onChange={handlePasswordChange}
                                                            placeholder="Enter your password"
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
                                    </div>
                                    <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6">
                                        <div className="invenShopfy-input-field-style invenShopfy-input-field-style-eye">
                                            <div className="invenShopfy-form-field">
                                                <h5>Confirm Password</h5>
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
                                                                            edge="end"
                                                                        >
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
                                    </div>
                                    <div className="col-span-12 flex justify-end">
                                        <button type="submit" className="invenShopfy-btn">Create Now</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div >
            </div >
        </>
    );
};

export default AddEmployeeList;
