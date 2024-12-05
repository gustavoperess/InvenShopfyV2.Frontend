import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import MakePaymentInvoice from './MakePaymentInvoice';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

interface FirstPopupProps {
    open: boolean;
    handleFirstDialogClose: () => void;
}

const PaymentSuccessPopup: React.FC<FirstPopupProps> = ({ open, handleFirstDialogClose }) => {
    const [startDate, setStartDate] = useState<Date | null>(new Date());

    const dummyData = (e: any) => {
        e.preventDefault();
    };
    //payment success popup
    const [openMakePaymentInvoice, setOpenMakePaymentInvoice] = useState<boolean>(false);
    const handleFirstDialogOpen = () => {
        setOpenMakePaymentInvoice(true);
    };
    const handlePaymentInvoiceDialogClose = () => {
        setOpenMakePaymentInvoice(false);
    };

    return (
        <>
            <div className='invenShopfy-common-modal'>
                <BootstrapDialog
                    onClose={handleFirstDialogClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                >
                    <DialogContent dividers className='no-border'>
                        <div className='invenShopfy-common-modal-width width-full py-5'>
                            <div className="payment-successful text-center">
                                <i className="fa-solid fa-check"></i>
                                <h4>Payment Completed Successfully</h4>
                                <p className="mb-5">Thank You! Your purchase is Complete</p>
                                <button
                                    onClick={()=> {
                                        handleFirstDialogOpen();
                                        handleFirstDialogClose();

                                    } }
                                    type="button"
                                    className="invenShopfy-btn secondary-btn"
                                >
                                    View Invoice
                                </button>
                            </div>
                        </div>
                    </DialogContent>
                </BootstrapDialog>
            </div>
            <MakePaymentInvoice open={openMakePaymentInvoice} handlePaymentInvoiceDialogClose={handlePaymentInvoiceDialogClose} />
        </>
    );
}

export default PaymentSuccessPopup;
