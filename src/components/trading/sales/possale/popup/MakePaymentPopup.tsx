import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import DatePicker from "react-datepicker";
import PaymentSuccessPopup from './PaymentSuccessPopup';
import "react-datepicker/dist/react-datepicker.css";

interface MakePaymentPopupProps {
    open: boolean;
    handleMakePaymentDialogClose: () => void;
    calculateGrandTotal: number;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const MakePaymentPopup = ({ open, handleMakePaymentDialogClose, calculateGrandTotal }: MakePaymentPopupProps) => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [selectedPayment, setSelectedPayment] = useState<string>('');
    const [receivedAmount, setReceivedAmount] = useState<number>(0);
    const [payNow, setPayNow] = useState<boolean>(false);
    const [openFirstDialog, setOpenFirstDialog] = useState<boolean>(false);

    const grandTotalAmount = parseFloat(calculateGrandTotal.toFixed());

    const handleReceivedAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
        const amount = parseFloat(e.target.value);
        setReceivedAmount(isNaN(amount) ? 0 : amount);
    };

    const changeAmount = () => {
        return receivedAmount - grandTotalAmount;
    };

    const handlePaymentData = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (payNow) {
            setOpenFirstDialog(true);
            handleMakePaymentDialogClose();
        }
    };

    useEffect(() => {
        setPayNow(receivedAmount >= grandTotalAmount);
    }, [receivedAmount, grandTotalAmount]);

    return (
        <>
            <div className='inventual-common-modal'>
                <BootstrapDialog
                    onClose={handleMakePaymentDialogClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                >
                    <div className='inventual-modal-title'>
                        <h4>Make Payment</h4>
                        <button autoFocus onClick={handleMakePaymentDialogClose} type='button'>
                            <i className="fa-regular fa-xmark"></i>
                        </button>
                    </div>
                    <form onSubmit={handlePaymentData}>
                        <DialogContent dividers>
                            <div className='inventual-common-modal-width width-full'>
                                <div className="grid grid-cols-12 sm:gap-x-[30px] gap-y-[18px]">
                                    <div className="col-span-12 md:col-span-6">
                                        <div className="inventual-form-field">
                                            <h5>Received Amount</h5>
                                            <div className="inventual-input-field-style">
                                                <input
                                                    type="text"
                                                    required
                                                    placeholder='$4595.00'
                                                    value={receivedAmount}
                                                    onChange={handleReceivedAmount}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6">
                                        <div className="inventual-form-field">
                                            <h5>Paying Amount</h5>
                                            <div className="inventual-input-field-style">
                                                <input
                                                    defaultValue={grandTotalAmount}
                                                    type="text"
                                                    placeholder='$3495.00'
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6">
                                        <div className="inventual-form-field">
                                            <h5>Change</h5>
                                            <div className="inventual-input-field-style">
                                                <input
                                                    type="text"
                                                    placeholder='$0.00'
                                                    value={changeAmount()}
                                                    readOnly
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6">
                                        <div className="inventual-form-field">
                                            <h5>Payment Type</h5>
                                            <div className="inventual-select-field-style">
                                                <TextField
                                                    select
                                                    required
                                                    label="Select"
                                                    value={selectedPayment}
                                                    onChange={(e) => setSelectedPayment(e.target.value)}
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
                                                    <MenuItem value="Card">Card</MenuItem>
                                                    <MenuItem value="Cash">Cash</MenuItem>
                                                    <MenuItem value="Bank">Bank</MenuItem>
                                                </TextField>
                                            </div>
                                        </div>
                                    </div>
                                    {selectedPayment === "Card" && (
                                        <div className="col-span-12 md:col-span-6">
                                            <div className="inventual-form-field">
                                                <h5>Card Number</h5>
                                                <div className="inventual-input-field-style">
                                                    <input required type="text" placeholder='XXXX XXXX XXXX XXXX' />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {selectedPayment === "Bank" && (
                                        <div className="col-span-12 md:col-span-6">
                                            <div className="inventual-form-field">
                                                <h5>Bank Account Number</h5>
                                                <div className="inventual-input-field-style">
                                                    <input required type="text" placeholder='XXXX XXXX XXXX XXXX' />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div className="col-span-12 md:col-span-6">
                                        <div className="inventual-form-field">
                                            <h5>Expiry Date</h5>
                                            <div className="inventual-input-field-style">
                                                <DatePicker
                                                    selected={startDate}
                                                    required
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
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <button
                                type='submit'
                                className={`inventual-btn ${payNow ? 'cursor-pointer' : 'cursor-no-drop'}`}
                                disabled={!payNow}
                            >
                                Pay Now
                            </button>
                        </DialogActions>
                    </form>
                </BootstrapDialog>
            </div>
            <PaymentSuccessPopup open={openFirstDialog} handleFirstDialogClose={() => setOpenFirstDialog(false)} />
        </>
    );
};

export default MakePaymentPopup;
