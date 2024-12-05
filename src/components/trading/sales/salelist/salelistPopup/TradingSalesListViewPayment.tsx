"use client"
import React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { useGetSalesPaymentForViewPaymentByIdQuery } from '@/services/Sales/SalesPayment';
import { MoneyFormat } from '@/interFace/interFace';


interface ViewPaymentPopupProps {
    open: boolean;
    saleId: number | undefined;
    handleViewPaymentDialogClose: () => void;
}
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const TradingSalesListViewPayment = ({ open, saleId, handleViewPaymentDialogClose }: ViewPaymentPopupProps) => {
    const { data: salesPaymentData } = useGetSalesPaymentForViewPaymentByIdQuery(
        saleId as number, 
        { skip: saleId === undefined }
    );
   

    return (
        <>
            <div className='invenShopfy-common-modal'>
                <BootstrapDialog
                    onClose={handleViewPaymentDialogClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                >
                    <div className='invenShopfy-modal-title'>
                        <h4>View Payment</h4>
                        <button autoFocus onClick={handleViewPaymentDialogClose} type='button'><i className="fa-regular fa-xmark"></i></button>
                    </div>
                    <DialogContent dividers>
                        <div className='invenShopfy-common-modal-width width-full'>
                         
                                <div className="invenShopfy-common-small-table mt-0.5 xs:overflow-x-auto">
                                    <table>
                                        <thead>
                                            <tr className='bg-lightest'>
                                                <th>Date</th>
                                                <th>Reference</th>
                                                <th>Customer</th>
                                                <th>Payment type</th>
                                                <th>Card Nº</th>
                                                <th>Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{salesPaymentData?.data.date}</td>
                                                <td>{salesPaymentData?.data.referenceNumber}</td>
                                                <td>{salesPaymentData?.data.customerName}</td>
                                                <td>{salesPaymentData?.data.paymentType}</td>
                                                <td>{salesPaymentData?.data.cardNumber}</td>
                                                <td>{MoneyFormat.format(salesPaymentData?.data.totalAmount)}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                        </div>
                    </DialogContent>
                </BootstrapDialog>
            </div>
        </>
    );
};

export default TradingSalesListViewPayment;