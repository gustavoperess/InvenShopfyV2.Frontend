"use client"
import React, { useState, useCallback, useEffect } from 'react';
import { FilledInput, IconButton, InputAdornment, MenuItem, TextField, FormControl, Input } from '@mui/material';
import { Accept, useDropzone } from "react-dropzone";
import { useRouter } from 'next/navigation';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Image from 'next/image';
import { IMaskInput } from 'react-imask';
import { useGetCurrentUserQuery } from '@/services/User/User';
import { CustomProps } from '@/interFace/interFace';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { useUpdateUserMutation } from '@/services/User/User';
import { toast } from 'react-toastify';

const ProfileList = () => {
    //form password field
    const { data: userData, error: userError, isLoading: userLoading, refetch } = useGetCurrentUserQuery();
    const router = useRouter()
    const [userPicture, setUserPicture] = useState<string>("");
    const [userFullName, setUserFullName] = useState<string>(userData?.fullName || "");
    const [userName, setUserName] = useState<string>(userData?.userName || "");
    const [userPhoneNumber, setUserPhoneNumber] = useState<string>(userData?.phoneNumber || "");
    const [userEmail, setUserEmail] = useState<string>(userData?.email || "");
    const [gender, setGender] = useState<string>(userData?.gender || ""); 
    const [password, setPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [error, setError] = useState(false);

    const [newPasswordError, setNewPasswordError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const [showNewPassword, setShowNewPassowrd] = useState(false);
    const handleClickConfirmShowPassword = () => setShowNewPassowrd((show) => !show);
    const [updateUser, { isLoading, error: errorUpdating }] = useUpdateUserMutation();

    const [userId, setUserId] = useState<string>("");

    useEffect(() => {
        if (userData?.id) {
            setUserId(userData.id);
        }
    }, [userData]);


    //form password field
    const removeNullValues = (data: any) => {
        return Object.fromEntries(Object.entries(data).filter(([_, value]) => value !== null && value !== undefined));
    };
    

    const handleProfileFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
     
        const updatedUserData = removeNullValues({
            name: userFullName || undefined,
            phoneNumber: userPhoneNumber || undefined,
            profilePicture: userPicture || undefined,
            email: userEmail || undefined,
            gender: gender || undefined,
            userName: userName || undefined,
            passwordHash: password || undefined,
            newPassword: newPassword || undefined,
        })
 
        try {
            await updateUser({ body: updatedUserData, userId }).unwrap();
            toast.success("User Created successfully!");
            setUserPhoneNumber('');
            setUserEmail('');
            setUserPicture("")
            setUserFullName("")
            setGender('');
            setUserName('');
            setPassword('');

        } catch (error: any) {
            console.log(error?.data)
            if (error?.data) {
                toast.error(error?.data);
            } else {
                // Fallback error message
                toast.error("Failed to update user. Please try again later.")
            }
        }


    };


    //form password field



    // handle password change 
    const handleNewPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setNewPassword(value);
        const passwordPatern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        setNewPasswordError(!passwordPatern.test(value));
    };
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setPassword(value);
        const passwordPatern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        setPasswordError(!passwordPatern.test(value));
    }

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

    }

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            const reader = new FileReader();

            reader.onloadend = () => {
                const base64String = reader.result as string; // Cast to string
                const base64WithoutPrefix = base64String.split(',')[1];
                setUserPicture(base64WithoutPrefix);
                // setProductImage(`data:${dataUrl}`);
            };

            reader.readAsDataURL(file); // Read the file as Data URL (Base64)
        }
    }, []);

    const accept: Accept = {
        'image/*': []
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop, accept });

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
            <div className="inventual-content-area px-4 sm:px-7">
                <div className="inventual-create-payment-area bg-white p-5 sm:p-7 custom-shadow rounded-8">
                    <div className="inventual-profile-area">
                        <form onSubmit={handleProfileFormSubmit}>
                    
                            <div className="inventual-profile-wrapper flex items-center flex-wrap gap-x-12 gap-y-5 mb-14">
                                <div className="inventual-profile-info flex flex-wrap items-center gap-5">
                                    <div className="inventual-profile-info-img">
                                        <div {...getRootProps({ className: 'dropzone-two' })}>
                                            <input {...getInputProps()} />
                                            {userPicture ? (
                                                <Image src={`data:image/jpeg;base64,${userPicture}`} className="rounded" height={120} width={120} alt="profilePicture" priority 
                                                style={{ maxHeight: '120px', width: '120px', objectFit: 'contain' }}
                                                />
                                            ) : (
                                                userLoading ? (
                                                    <div>Loading...</div>
                                                ) : userError ? (
                                                    <div>Error loading user data</div>
                                                ) : (
                                                    <Image src={userData?.profilePicture} className="rounded" height={120} width={120} alt="profilePicture" priority 
                                                    style={{ maxHeight: '120px', maxWidth: '120px', objectFit: 'contain' }}/>
                                                )
                                            )}
                                            <div className="col-span-12">
                                                <button type="submit" className="edit-picture-btn">
                                                    <FontAwesomeIcon icon={faCamera} />
                                                </button>
                                            </div>
                                        </div>
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
                                                        value={userFullName}
                                                        placeholder={userData?.fullName}
                                                        onChange={(e) => setUserFullName(e.target.value)}>
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
                                                            value={gender}
                                                            onChange={(e) => setGender(e.target.value)}
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
                                                        placeholder={userData?.userName}
                                                        onChange={(e) => setUserName(e.target.value)}>
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
                                                    <FormControl fullWidth>
                                                        <TextField
                                                            type={showPassword ? 'text' : 'password'}
                                                            name="password"
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
                                        <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-4">
                                            <div className="inventual-form-field">
                                                <h5>New Password</h5>
                                                <div className="inventual-input-eye-style">
                                                    <FormControl fullWidth>
                                                        <TextField
                                                            type={showNewPassword ? 'text' : 'password'}
                                                            name="password"                                                            
                                                            value={newPassword}
                                                            onChange={handleNewPasswordChange}
                                                            error={newPasswordError}
                                                            helperText={
                                                                newPasswordError
                                                                    ? "Password must be at least eight characters, including at least one letter, one number, and one special character."
                                                                    : ""
                                                            }
                                                            placeholder="Enter your new password"
                                                            variant="filled"
                                                            InputProps={{
                                                                endAdornment: (
                                                                    <InputAdornment position="end">
                                                                        <IconButton
                                                                            aria-label="toggle password visibility"
                                                                            onClick={handleClickConfirmShowPassword}
                                                                            edge="end">
                                                                            {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                                                        </IconButton>
                                                                    </InputAdornment>
                                                                ),
                                                            }}
                                                        />
                                                    </FormControl>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-12">
                                            <button type="submit" className="inventual-btn">Update Profile</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfileList;


