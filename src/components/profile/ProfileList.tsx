"use client"
import React, { useState } from 'react';
import { FilledInput, IconButton, InputAdornment, MenuItem, TextField, FormControl, Input, InputLabel } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Image from 'next/image';
import { IMaskInput } from 'react-imask';
import { useGetCurrentUserQuery } from '@/services/User/User';
import { CustomProps } from '@/interFace/interFace';

const ProfileList = () => {
    //form password field
    const { data: userData, error: userError, isLoading: userLoading, refetch } = useGetCurrentUserQuery();
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false);
    const [userName, setUserName] = useState<string>(userData?.userName || '');
    const [userPhoneNumber, setUserPhoneNumber] = useState<string>(userData?.phoneNumber || '');
    const [userEmail, setUserEmail] = useState<string>(userData?.email || '');
    const [error, setError] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    //form password field

    const dummyData = (e: any) => {
        e.preventDefault();
    };
    console.log(userData, userName)

    const splitname = (fullName: string) => {
        if (userData) {
            const words = fullName.split(" ");
            const firstName = words[0];
            const lastName = words[words.length - 1];
            return `${firstName} ${lastName}`;
        }
        return '';
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const email = e.target.value;
        setUserEmail(email);
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setError(!emailPattern.test(email));
    };



    const TextMaskCustom = React.forwardRef<HTMLInputElement, CustomProps>(
        function TextMaskCustom(props, ref) {
            const { onChange, ...other } = props;
            return (
                <IMaskInput
                    {...other}
                    mask="(#00) 000-0000"
                    definitions={{'#': /[1-9]/}}
                    inputRef={ref}
                    onComplete={(value: any) => onChange({ target: { name: props.name, value } })}
                    overwrite
                />
            );
        }
    );


    return (
        <>
            <div className="inventual-content-area px-4 sm:px-7">
                <div className="inventual-create-payment-area bg-white p-5 sm:p-7 custom-shadow rounded-8">

                    <div className="inventual-profile-area">
                        <div className="inventual-profile-wrapper flex items-center flex-wrap gap-x-12 gap-y-5 mb-14">
                            <div className="inventual-profile-info flex flex-wrap items-center gap-5">
                                <div className="inventual-profile-info-img">
                                    {userLoading ? (
                                        <div>Loading...</div>
                                    )
                                        : userError ? (
                                            <div>Error loading user data</div>
                                        ) :
                                            <Image src={userData?.profilePicture} className="rounded" height={120} width={120} alt='profilePicture' priority />
                                    }
                                </div>
                                <div className="inventual-profile-info-text">
                                    {userLoading ? (
                                        <div>Loading...</div>
                                    )
                                        : userError ? (
                                            <div>Error loading user data</div>
                                        ) :
                                            <h4 className="text-heading font-bold text-[20px] md:text-[24px] mb-1">{splitname(userData?.fullName)}</h4>

                                    }
                                    <span className="text-[16px]">{userData?.roles[0]}</span>
                                </div>
                            </div>
                            {/* <div className="inventual-profile-info-btn">
                                <button type="submit" className="inventual-outline-btn">Edit Profile </button>
                            </div> */}
                        </div>
                        <div className="grid grid-cols-12 gap-y-7 sm:gap-7">
                            <div className="col-span-12">
                                <div className="grid grid-cols-12 gap-y-7 sm:gap-7">
                                    <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                        <div className="inventual-form-field">
                                            <h5>Full name</h5>
                                            <div className="inventual-input-field-style">
                                                <TextField
                                                    fullWidth
                                                    type="text"
                                                    variant="outlined"
                                                    value={userName}
                                                    placeholder={userData?.fullName}>
                                                </TextField>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                    <div className="inventual-formFour-field">
                                            <div className="inventual-input-field-style">
                                                <h5>Phone</h5>
                                                <FormControl fullWidth>
                                                    <Input
                                                        autoFocus
                                                        value={userPhoneNumber}
                                                        placeholder={userData?.phoneNumber}
                                                        onChange={(e) => setUserPhoneNumber(e.target.value)}
                                                        name="textmask"
                                                        id="formatted-text-mask-input"
                                                        inputComponent={TextMaskCustom as any}
                                                    />
                                                </FormControl>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                        <div className="inventual-form-field">
                                            <h5>Email</h5>
                                            <div className="inventual-input-field-style">
                                                <TextField
                                                    fullWidth
                                                    type="email"
                                                    value={userEmail}
                                                    placeholder={userData?.email}
                                                    variant="outlined"
                                                    inputProps={{ maxLength: 80 }}
                                                    onChange={handleEmailChange}
                                                    error={error}
                                                    helperText={error ? "Please enter a valid email address" : ""}
                                                />

                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 xl:col-span-4 md:col-span-6">
                                        <div className="inventual-select-field">
                                            <div className="inventual-form-field">
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
                                                                    return <em>{userData?.gender}</em>;
                                                                }
                                                                return value;
                                                            },
                                                        }}>
                                                        <MenuItem value="Male">Male</MenuItem>
                                                        <MenuItem value="Female">Female</MenuItem>
                                                    </TextField>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                        <div className="inventual-form-field">
                                            <h5>Username</h5>
                                            <div className="inventual-input-field-style">
                                                <TextField
                                                    fullWidth
                                                    type="text"
                                                    variant="outlined"
                                                    value={userName}
                                                    placeholder={userData?.userName}>
                                                </TextField>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                        <div className="inventual-formTree-field">
                                            <h5>Joing Data</h5>
                                            <div className="inventual-select-field-style">
                                                <TextField

                                                    disabled={userData?.dateOfJoin !== ''}
                                                    placeholder={userData?.dateOfJoin.split("T")[0]}>
                                                </TextField>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                        <div className="inventual-form-field">
                                            <h5>Current Password</h5>
                                            <div className="inventual-input-eye-style">
                                                <FilledInput
                                                    type={showPassword ? 'text' : 'password'}
                                                    name='password'
                                                    placeholder="Enter your current password"
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
                                    <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                        <div className="inventual-form-field">
                                            <h5>New Password</h5>
                                            <div className="inventual-input-eye-style">
                                                <FilledInput
                                                    type={showPassword ? 'text' : 'password'}
                                                    name='password'
                                                    placeholder="Enter your new password"
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