import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
interface AddWarehousePopupProps {
    open: boolean;
    handleAddWarehouseDialogClose: () => void;
}
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const AddWarehousePopup = ({ open, handleAddWarehouseDialogClose }: AddWarehousePopupProps) => {
    const data = (e: any) => {
        e.preventDefault();
    };
    return (
        <>
            <div className='inventual-common-modal'>
                <BootstrapDialog
                    onClose={handleAddWarehouseDialogClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                >
                    <div className='inventual-modal-title'>
                        <h4>Add Warehouse</h4>
                        <button autoFocus onClick={handleAddWarehouseDialogClose} type='button'><i className="fa-regular fa-xmark"></i></button>
                    </div>
                    <DialogContent dividers>
                        <div className='inventual-common-modal-width width-full'>
                            <form onSubmit={data}>
                                <div className="grid grid-cols-12 sm:gap-x-[30px] gap-y-[18px]">
                                    <div className="col-span-12 md:col-span-6">
                                        <div className="inventual-form-field">
                                            <h5>Name</h5>
                                            <div className="inventual-input-field-style">
                                                <input type="name" placeholder='Customer name' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6">
                                        <div className="inventual-form-field">
                                            <h5>Phone</h5>
                                            <div className="inventual-input-field-style">
                                                <input type="number" placeholder='Type phone' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12">
                                        <div className="inventual-form-field">
                                            <h5>Email</h5>
                                            <div className="inventual-input-field-style">
                                                <input type="email" placeholder='Type Email' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6">
                                        <div className="inventual-form-field">
                                            <h5>Country</h5>
                                            <div className="inventual-select-field-style">
                                                <TextField
                                                    select
                                                    label="Select"
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
                                                    <MenuItem value="United States">United States</MenuItem>
                                                    <MenuItem value="Bangladesh">Bangladesh</MenuItem>
                                                    <MenuItem value="Pakistan">Pakistan</MenuItem>
                                                    <MenuItem value="Nepal">Nepal</MenuItem>
                                                </TextField>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6">
                                        <div className="inventual-form-field">
                                            <h5>City</h5>
                                            <div className="inventual-select-field-style">
                                                <TextField
                                                    select
                                                    label="Select"
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
                                                    <MenuItem value="New York">New York</MenuItem>
                                                    <MenuItem value="California">California</MenuItem>
                                                    <MenuItem value="Texas">Texas</MenuItem>
                                                    <MenuItem value="Arizona">Arizona</MenuItem>
                                                    <MenuItem value="Florida">Florida</MenuItem>
                                                </TextField>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6">
                                        <div className="inventual-form-field">
                                            <h5>Address</h5>
                                            <div className="inventual-input-field-style">
                                                <input type="text" placeholder='Address' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6">
                                        <div className="inventual-form-field">
                                            <h5>Zip</h5>
                                            <div className="inventual-input-field-style">
                                                <input type="text" placeholder='85701' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <button className='inventual-btn' type='button'>
                            Create Warehouse
                        </button>
                    </DialogActions>
                </BootstrapDialog>
            </div>
        </>
    );
};

export default AddWarehousePopup;