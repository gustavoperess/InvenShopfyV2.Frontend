"use client"
import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { useGetExpensePaymentByIdQuery } from '@/services/Expense/ExpensePayment'; 
import { MoneyFormat } from '@/interFace/interFace';

interface ViewPaymentPopupProps {
    open: boolean;
    expensePaymentId: number | undefined;
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

const ExpenseViewListPopup = ({ open, expensePaymentId, handleViewPaymentDialogClose }: ViewPaymentPopupProps) => {

    const { data: expensePaymentData, refetch } = useGetExpensePaymentByIdQuery(
        expensePaymentId as number,
        { skip: expensePaymentId === undefined }
    );

    useEffect(() => {
        if (expensePaymentId !== undefined) {
            refetch();
        }
    }, [expensePaymentId, refetch]);


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
                                                <th>Voucher No.</th>
                                                <th>Payment Mode</th>
                                                <th>Card Number</th>
                                                <th>Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{expensePaymentData?.data.date}</td>
                                                <td>{expensePaymentData?.data.voucherNumber}</td>
                                                <td>{expensePaymentData?.data.paymentType}</td>
                                                <td>{expensePaymentData?.data.cardNumber}</td>
                                                <td>{MoneyFormat.format(expensePaymentData?.data.expenseCost)}</td>
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

export default ExpenseViewListPopup;