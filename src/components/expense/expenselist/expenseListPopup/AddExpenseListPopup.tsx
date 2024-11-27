import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useGetExpenseByIdQuery } from '@/services/Expense/Expense';
import DatePicker from "react-datepicker"; import { toast } from 'react-toastify';
import { NumericFormat } from 'react-number-format';
import { useAddPaymentExpenseMutation } from '@/services/Expense/ExpensePayment';
import { TextField } from '@mui/material';


interface AddPaymentPopupProps {
    open: boolean;
    expenseId: number | undefined;
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

const AddExpenseListPopup = ({ open, expenseId, handleAddPaymentDialogClose }: AddPaymentPopupProps) => {
    const [paymentType, setPaymentType] = useState<string>("Card");
    const [creditCard, setCreditCard] = useState<string>("");
    const [expenseNote, setExpenseNote] = useState<string>("");
    const [expenseDate, setExpenseDate] = useState(new Date());
    const [addPayment] = useAddPaymentExpenseMutation();

    const { data: expenseData, refetch } = useGetExpenseByIdQuery(
        expenseId as number,
        { skip: expenseId === undefined }
    );

    useEffect(() => {
        if (expenseId !== undefined) {
            refetch();
        }
    }, [expenseId, refetch]);


    const handleDateChange = (date: Date | null) => {
        setExpenseDate(date || new Date());
    };

    const handleCreditCardChange = (event: any) => {
        let value = event.target.value.replace(/\D/g, '');
        value = value.slice(0, 16);
        const formattedValue = value.replace(/(.{4})/g, '$1 ').trim();
        setCreditCard(formattedValue);

    }
    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };


    const handleCreatePayment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let date = formatDate(expenseDate)
        const PaymentData = { date, cardNumber: creditCard, expenseId, expenseNote, paymentType, }
        try {
            await addPayment(PaymentData).unwrap();
            toast.success("Payment Created successfully!");
            handleAddPaymentDialogClose();
        } catch (error: any) {
            if (error?.data?.message) {
                toast.error(error?.data?.message);
            } else {
                // Fallback error message
                toast.error("Failed to create payment. Please try again later.");
            }
        }
    }

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
                            <form onSubmit={handleCreatePayment}>
                                <div className="grid grid-cols-12 sm:gap-x-[30px] gap-y-[18px]">
                                    <div className="col-span-12 md:col-span-6">
                                        <div className="inventual-formTree-field">
                                            <h5>Voucher Number</h5>
                                            <div className="inventual-select-field-style">
                                                <TextField
                                                    required
                                                    value={expenseData ? expenseData?.data.voucherNumber : ""}
                                                    disabled={expenseData?.data.voucherNumber !== ''}
                                                    style={{
                                                        backgroundColor: expenseData?.data.voucherNumber !== '' ? '#e0e0e0' : 'inherit',
                                                        color: expenseData?.data.voucherNumber !== '' ? '#757575' : 'inherit',
                                                        width: '100%',
                                                    }}
                                                >
                                                </TextField>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6">
                                        <div className="inventual-formTree-field">
                                            <h5>Payment status</h5>
                                            <div className="inventual-select-field-style">
                                                <TextField
                                                    required
                                                    value={expenseData ? expenseData?.data.paymentStatus : ""}
                                                    disabled={expenseData?.data.paymentStatus !== ''}
                                                    style={{
                                                        backgroundColor: expenseData?.data.paymentStatus !== '' ? '#e0e0e0' : 'inherit',
                                                        color: expenseData?.data.paymentStatus !== '' ? '#757575' : 'inherit',
                                                        width: '100%',
                                                    }}
                                                >
                                                </TextField>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6">
                                        <div className="inventual-select-field">
                                            <div className="inventual-form-field">
                                                <h5>Expense Price</h5>
                                                <div className="inventual-input-field-style">
                                                    <NumericFormat
                                                        value={expenseData ? expenseData?.data.expenseCost : ""}
                                                        thousandSeparator
                                                        valueIsNumericString
                                                        disabled={expenseData?.data.expenseCost !== ''}
                                                        prefix="£"
                                                        style={{
                                                            backgroundColor: expenseData?.data.expenseCost !== '' ? '#e0e0e0' : 'inherit',
                                                            color: expenseData?.data.expenseCost !== '' ? '#757575' : 'inherit',
                                                            height: "48px"
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6">
                                        <div className="inventual-formTree-field">
                                            <h5>Category</h5>
                                            <div className="inventual-select-field-style">
                                                <TextField
                                                    required
                                                    value={expenseData ? expenseData?.data.expenseCategory : ""}
                                                    disabled={expenseData?.data.expenseCategory !== ''}
                                                    style={{
                                                        backgroundColor: expenseData?.data.expenseCategory !== '' ? '#e0e0e0' : 'inherit',
                                                        color: expenseData?.data.expenseCategory !== '' ? '#757575' : 'inherit',
                                                        width: '100%',
                                                    }}
                                                >
                                                </TextField>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6">
                                        <div className="inventual-form-field">
                                            <h5>Card Number</h5>
                                            <div className="inventual-input-field-style">
                                                <TextField
                                                    fullWidth
                                                    type="text"
                                                    placeholder="Enter card number"
                                                    variant="outlined"
                                                    required
                                                    onChange={handleCreditCardChange}
                                                    value={creditCard}
                                                    disabled={paymentType == 'Cash'}
                                                    style={{
                                                        backgroundColor: paymentType == 'Cash' ? '#e0e0e0' : 'inherit',
                                                        color: paymentType == 'Cash' ? '#757575' : 'inherit',
                                                        width: '100%',
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6">
                                        <div className="inventual-formTwo-field">
                                            <h5>Date</h5>
                                            <div className="inventual-input-field-style">
                                                <DatePicker
                                                    selected={expenseDate}
                                                    required
                                                    onChange={handleDateChange}
                                                    showYearDropdown
                                                    showMonthDropdown
                                                    useShortMonthInDropdown
                                                    showPopperArrow={false}
                                                    peekNextMonth
                                                    dropdownMode="select"
                                                    isClearable
                                                    placeholderText="DD/MM/YYYY"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12">
                                        <div className="inventual-input-field-style">
                                            <TextField
                                                fullWidth
                                                multiline
                                                required
                                                rows={4}
                                                value={expenseNote}
                                                placeholder='Staff Notes'
                                                inputProps={{ maxLength: 500 }}
                                                onChange={(e) => setExpenseNote(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <DialogActions>
                                    <button className='inventual-btn' type='submit'>
                                        Pay Now
                                    </button>
                                </DialogActions>
                            </form>
                        </div>
                    </DialogContent>

                </BootstrapDialog>
            </div>
        </>
    );
};

export default AddExpenseListPopup;