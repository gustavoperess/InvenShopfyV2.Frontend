import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Image from 'next/image';
import imageImg from '../../../../../../public/assets/img/icon/croun.png';
interface MembershipDiscountPopupProps {
    open: boolean;
    handleMembershipDiscountDialogClose: () => void;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const MembershipDiscountPopup = ({ open, handleMembershipDiscountDialogClose }: MembershipDiscountPopupProps) => {

    const dummyData = (e: any) => {
        e.preventDefault();
    };
    return (
        <>
            <div className='inventual-common-modal'>
                <BootstrapDialog
                    onClose={handleMembershipDiscountDialogClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                >
                    <div className='inventual-modal-title'>
                        <h4>Membership Discount</h4>
                        <button autoFocus onClick={handleMembershipDiscountDialogClose} type='button'><i className="fa-regular fa-xmark"></i></button>
                    </div>
                    <DialogContent dividers>
                    <div className='inventual-common-modal-width width-full discount-popup'>
                            <form onSubmit={dummyData}>
                                <div className="inventual-popup-discount-eligibity mt-[10px]">
                                    <div className="grid grid-cols-12">
                                        <div className="col-span-12 sm:col-span-8">
                                            <h6 className="text-[16px] font-semibold text-heading mb-2">Daniyel Machman</h6>
                                            <span className="text-[14px] font-norma">Status <span className="text-[14px] font-bold text-warning ps-1 pe-1">Premium</span>
                                                <Image src={imageImg} style={{ width: "auto", height: "auto" }} alt="user not found" />
                                            </span>
                                        </div>
                                        <div className="col-span-12 sm:col-span-4">
                                            <h6 className="text-[14px] font-semibold text-heading sm:text-end">Eligibility : <span className="text-[14px] text-success font-semibold ps-1">Yes</span></h6>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-12 pt-7">
                                        <div className="col-span-12 sm:col-span-4">
                                            <div className="inventual-form-field">
                                                <div className="inventual-select-field-style">
                                                    <TextField
                                                        select
                                                        label="Select"
                                                        defaultValue=""
                                                        SelectProps={{
                                                            displayEmpty: true,
                                                            renderValue: (value: any) => {
                                                                if (value === '') {
                                                                    return <em>Select Option</em>;
                                                                }
                                                                return value;
                                                            },
                                                        }}
                                                    >
                                                        <MenuItem value="">
                                                            <em>Select Option</em>
                                                        </MenuItem>
                                                        <MenuItem value="8% OFF">8% OFF</MenuItem>
                                                        <MenuItem value="10% OFF">10% OFF</MenuItem>
                                                        <MenuItem value="12% OFF">12% OFF</MenuItem>
                                                    </TextField>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-12 sm:col-span-8">
                                            <div className="inventual-form-field">
                                                <div className="inventual-input-field-style">
                                                    <input type="text" placeholder='$25.00' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </DialogContent >
                    <DialogActions>
                        <button className='inventual-btn' type="button">Submit</button>
                    </DialogActions>
                </BootstrapDialog >
            </div >
        </>
    );
};

export default MembershipDiscountPopup;