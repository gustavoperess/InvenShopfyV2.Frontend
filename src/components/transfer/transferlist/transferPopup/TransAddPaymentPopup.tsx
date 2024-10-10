import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import ReactDatePicker from 'react-datepicker';

interface AddPaymentPopupProps {
    open: boolean;
    handleAddPaymentDialogClose: () => void;
}
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const TransAddPaymentPopup = ({ open, handleAddPaymentDialogClose }: AddPaymentPopupProps) => {

    const [startDate, setStartDate] = useState<Date | null>(new Date());

    const dummyData = (e: any) => {
        e.preventDefault();
    };

    return (
        <>
            <div className='inventual-common-modal'>
                <BootstrapDialog
                    onClose={handleAddPaymentDialogClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                >
                    <div className='inventual-modal-title'>
                        <h4>Add Payment</h4>
                        <button autoFocus onClick={handleAddPaymentDialogClose} type='button'><i className="fa-regular fa-xmark"></i></button>
                    </div>
                    <DialogContent dividers>
                        <div className='inventual-common-modal-width width-full'>
                            <form onSubmit={dummyData}>
                                <div className="grid grid-cols-12 sm:gap-x-[30px] gap-y-[18px]">
                                    <div className="col-span-12 md:col-span-6">
                                        <div className="inventual-form-field">
                                            <h5>Received Amount</h5>
                                            <div className="inventual-input-field-style">
                                                <input type="email" placeholder='$4595.00' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6">
                                        <div className="inventual-form-field">
                                            <h5>Paying Amount</h5>
                                            <div className="inventual-input-field-style">
                                                <input type="email" placeholder='$3595.00' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6">
                                        <div className="inventual-form-field">
                                            <h5>Change</h5>
                                            <div className="inventual-input-field-style">
                                                <input type="number" placeholder='Type phone' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6">
                                        <div className="inventual-form-field">
                                            <h5>Payment Type</h5>
                                            <div className="inventual-select-field-style">
                                                <TextField
                                                    select
                                                    label="Select"
                                                    defaultValue=""
                                                    SelectProps={{
                                                        displayEmpty: true,
                                                        renderValue: (value: any) => {
                                                            if (value === '') {
                                                                return <em>Payment Type</em>;
                                                            }
                                                            return value;
                                                        },
                                                    }}
                                                >
                                                    <MenuItem value="">
                                                        <em>Payment Type</em>
                                                    </MenuItem>
                                                    <MenuItem value="Card">Card</MenuItem>
                                                    <MenuItem value="Bank">Bank</MenuItem>
                                                    <MenuItem value="Cash">Cash</MenuItem>
                                                </TextField>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6">
                                        <div className="inventual-form-field">
                                            <h5>Card Number</h5>
                                            <div className="inventual-input-field-style">
                                                <input type="text" placeholder='XXXX XXXX XXXX XXXX' />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6">
                                        <div className="inventual-form-field">
                                            <h5>Expired Date</h5>
                                            <div className="inventual-input-field-style">
                                                <ReactDatePicker
                                                    selected={startDate}
                                                    onChange={(date) => setStartDate(date)}
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
                                    <div className="col-span-12">
                                        <div className="inventual-form-field">
                                            <h5>Sale Note</h5>
                                            <div className="inventual-input-field-style">
                                                <textarea placeholder='Type sales note'></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <button className='inventual-btn' type='button'>
                            Pay Now
                        </button>
                    </DialogActions>
                </BootstrapDialog>
            </div>
        </>
    );
};

export default TransAddPaymentPopup;