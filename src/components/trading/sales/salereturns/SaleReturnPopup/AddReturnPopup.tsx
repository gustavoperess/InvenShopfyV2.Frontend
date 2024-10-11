import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import DatePicker from "react-datepicker";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

interface AddReturnPopupProps {
    open: boolean;
    handleReturnDialogClose: () => void;
}

const AddReturnPopup: React.FC<AddReturnPopupProps> = ({ open, handleReturnDialogClose }) => {
    const [date, setDate] = useState<Date | null>(null);

    const dummyData = (e: any) => {
        e.preventDefault();
    };
    return (
        <div className='inventual-common-modal'>
            <BootstrapDialog
                onClose={handleReturnDialogClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <div className='inventual-modal-title'>
                    <h4>Add Return</h4>
                    <button type='button' onClick={handleReturnDialogClose}><i className="fa-regular fa-xmark"></i></button>
                </div>
                <DialogContent dividers>
                    <div className='inventual-common-modal-width width-full'>
                        <form onSubmit={dummyData}>
                            <div className="grid grid-cols-12 sm:gap-x-[30px] gap-y-[18px]">
                                <div className="col-span-12 md:col-span-6">
                                    <div className="inventual-form-field">
                                        <h5>Date</h5>
                                        <div className="inventual-input-field-style">
                                            <DatePicker
                                                selected={date}
                                                onChange={(date) => setDate(date)}
                                                showYearDropdown
                                                showMonthDropdown
                                                useShortMonthInDropdown
                                                showPopperArrow={false}
                                                peekNextMonth
                                                dropdownMode="select"
                                                isClearable
                                                placeholderText="MM/DD/YYYY"
                                                className="w-full"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-12 md:col-span-6">
                                    <div className="inventual-form-field">
                                        <h5>Select Customer</h5>
                                        <div className="inventual-select-field-style">
                                            <TextField
                                                select
                                                label="Select"
                                                defaultValue=""
                                                SelectProps={{
                                                    displayEmpty: true,
                                                    renderValue: (value: any) => {
                                                        if (value === '') {
                                                            return <em>Select Customer</em>;
                                                        }
                                                        return value;
                                                    },
                                                }}
                                            >
                                                <MenuItem value="">
                                                    <em>Select Customer</em>
                                                </MenuItem>
                                                <MenuItem value="Sarah Johnson">Sarah Johnson</MenuItem>
                                                <MenuItem value="Daniel Martinez">Daniel Martinez</MenuItem>
                                                <MenuItem value="William Prady">William Prady</MenuItem>
                                                <MenuItem value="Jessica Miller">Jessica Miller</MenuItem>
                                            </TextField>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-12">
                                    <div className="inventual-form-field">
                                        <h5>Reference</h5>
                                        <div className="inventual-input-field-style">
                                            <input type="text" placeholder='S-34354543545' />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-12 md:col-span-6">
                                    <div className="inventual-form-field">
                                        <h5>Warehouse</h5>
                                        <div className="inventual-select-field-style">
                                            <TextField
                                                select
                                                label="Select"
                                                defaultValue=""
                                                SelectProps={{
                                                    displayEmpty: true,
                                                    renderValue: (value: any) => {
                                                        if (value === '') {
                                                            return <em>Select Warehouse</em>;
                                                        }
                                                        return value;
                                                    },
                                                }}
                                            >
                                                <MenuItem value="">
                                                    <em>Select Warehouse</em>
                                                </MenuItem>
                                                <MenuItem value="Warehouse 1">Warehouse 1</MenuItem>
                                                <MenuItem value="Warehouse 2">Warehouse 2</MenuItem>
                                                <MenuItem value="Warehouse 3">Warehouse 3</MenuItem>
                                                <MenuItem value="Warehouse 4">Warehouse 4</MenuItem>
                                            </TextField>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-12 md:col-span-6">
                                    <div className="inventual-form-field">
                                        <h5>Select Biller</h5>
                                        <div className="inventual-select-field-style">
                                            <TextField
                                                select
                                                label="Select"
                                                defaultValue=""
                                                SelectProps={{
                                                    displayEmpty: true,
                                                    renderValue: (value: any) => {
                                                        if (value === '') {
                                                            return <em>Select Biller</em>;
                                                        }
                                                        return value;
                                                    },
                                                }}
                                            >
                                                <MenuItem value="">
                                                    <em>Select Biller</em>
                                                </MenuItem>
                                                <MenuItem value="Sarah Johnson">Sarah Johnson</MenuItem>
                                                <MenuItem value="Daniel Martinez">Daniel Martinez</MenuItem>
                                                <MenuItem value="William Prady">William Prady</MenuItem>
                                                <MenuItem value="Jessica Miller">Jessica Miller</MenuItem>
                                            </TextField>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-12 md:col-span-6">
                                    <div className="inventual-form-field">
                                        <h5>Amount</h5>
                                        <div className="inventual-input-field-style">
                                            <input type="text" placeholder='$3495.00' />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-12 md:col-span-6">
                                    <div className="inventual-form-field">
                                        <h5>Remark</h5>
                                        <div className="inventual-select-field-style">
                                            <TextField
                                                select
                                                label="Select"
                                                defaultValue=""
                                                SelectProps={{
                                                    displayEmpty: true,
                                                    renderValue: (value: any) => {
                                                        if (value === '') {
                                                            return <em>Remark</em>;
                                                        }
                                                        return value;
                                                    },
                                                }}
                                            >
                                                <MenuItem value="">
                                                    <em>Remark</em>
                                                </MenuItem>
                                                <MenuItem value="Duplicate">Duplicate</MenuItem>
                                                <MenuItem value="Package Broken">Package Broken</MenuItem>
                                                <MenuItem value="Date Expire">Date Expire</MenuItem>
                                                <MenuItem value="Quality">Quality</MenuItem>
                                                <MenuItem value="Not Good">Not Good</MenuItem>
                                            </TextField>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-12">
                                    <div className="inventual-form-field">
                                        <h5>Return Notes</h5>
                                        <div className="inventual-input-field-style">
                                            <textarea placeholder='Write note'></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </DialogContent>
                <DialogActions>
                    <button className='inventual-btn' type='button'>
                        Add Now
                    </button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}

export default AddReturnPopup;
