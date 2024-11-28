import React, { useState,useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import DatePicker from "react-datepicker"; 
import { toast } from 'react-toastify';
import { NumericFormat } from 'react-number-format';
import { useAddSalesPaymentMutation,useGetSalesPaymentByIdQuery } from '@/services/Sales/SalesPayment';


interface AddPaymentPopupProps {
    open: boolean;
    saleId: number | undefined;
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

const TradingSalesListAddPayemnt = ({ open, saleId, handleAddPaymentDialogClose }: AddPaymentPopupProps) => {
    const [creditCard, setCreditCard] = useState<string>("");
    const [salesNote, setSalesNote] = useState<string>("");
    const [expenseDate, setExpenseDate] = useState(new Date());
    const [addPayment] = useAddSalesPaymentMutation();

    const { data: salesData, refetch } = useGetSalesPaymentByIdQuery(
        saleId as number, 
        { skip: saleId === undefined }
    );

    useEffect(() => {
        if (saleId !== undefined) {
            refetch();
        }
    }, [saleId, refetch]);

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
        const PaymentData = { date, salesId: saleId, cardNumber: creditCard, salesNote }
        try {
            await addPayment(PaymentData).unwrap();
            setExpenseDate(new Date())
            setSalesNote("")
            setCreditCard("")
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
                                            <h5>Reference Number</h5>
                                            <div className="inventual-select-field-style">
                                                <TextField
                                                    required
                                                    value={salesData?.data.referenceNumber || ""}
                                                    disabled={salesData?.data.voucherNumber !== ''}
                                                    style={{
                                                        backgroundColor: salesData?.data.voucherNumber !== '' ? '#e0e0e0' : 'inherit',
                                                        color: salesData?.data.voucherNumber !== '' ? '#757575' : 'inherit',
                                                        width: '100%',
                                                    }}
                                                >
                                                </TextField>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6">
                                        <div className="inventual-formTree-field">
                                            <h5>Warehouse</h5>
                                            <div className="inventual-select-field-style">
                                                <TextField
                                                    required
                                                    value={salesData?.data.warehouseName || ""}
                                                    disabled={salesData?.data.warehouseName !== ''}
                                                    style={{
                                                        backgroundColor: salesData?.data.warehouseName !== '' ? '#e0e0e0' : 'inherit',
                                                        color: salesData?.data.warehouseName !== '' ? '#757575' : 'inherit',
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
                                                <h5>Total Amount</h5>
                                                <div className="inventual-input-field-style">
                                                    <NumericFormat
                                                        value={salesData?.data.totalAmount || ""}
                                                        thousandSeparator
                                                        valueIsNumericString
                                                        disabled={salesData?.data.totalAmount !== ''}
                                                        prefix="£"
                                                        style={{
                                                            backgroundColor: salesData?.data.totalAmount !== '' ? '#e0e0e0' : 'inherit',
                                                            color: salesData?.data.totalAmount !== '' ? '#757575' : 'inherit',
                                                            height: "48px"
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6">
                                        <div className="inventual-formTree-field">
                                            <h5>Customer Name</h5>
                                            <div className="inventual-select-field-style">
                                                <TextField
                                                    required
                                                    value={salesData?.data.customerName || ""}
                                                    disabled={salesData?.data.customerName !== ''}
                                                    style={{
                                                        backgroundColor: salesData?.data.customerName !== '' ? '#e0e0e0' : 'inherit',
                                                        color: salesData?.data.customerName !== '' ? '#757575' : 'inherit',
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
                                                value={salesNote}
                                                placeholder='Staff Notes'
                                                inputProps={{ maxLength: 500 }}
                                                onChange={(e) => setSalesNote(e.target.value)}
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

export default TradingSalesListAddPayemnt;