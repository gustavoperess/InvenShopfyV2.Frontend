"use client"
import React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
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
    const { data: salesData, refetch } = useGetSalesPaymentForViewPaymentByIdQuery(
        saleId as number, 
        { skip: saleId === undefined }
    );

    console.log(salesData)
   

    return (
        <>
            <div className='inventual-common-modal'>
                <BootstrapDialog
                    onClose={handleViewPaymentDialogClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                >
                    <div className='inventual-modal-title'>
                        <h4>View Payment</h4>
                        <button autoFocus onClick={handleViewPaymentDialogClose} type='button'><i className="fa-regular fa-xmark"></i></button>
                    </div>
                    <DialogContent dividers>
                        <div className='inventual-common-modal-width width-full'>
                         
                                <div className="inventual-common-small-table mt-0.5 xs:overflow-x-auto">
                                    <table>
                                        <thead>
                                            <tr className='bg-lightest'>
                                                <th>Date</th>
                                                <th>Reference</th>
                                                <th>Payment type</th>
                                                <th>Warehouse</th>
                                                <th>Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{salesData?.data.date}</td>
                                                <td>{salesData?.data.referenceNumber}</td>
                                                <td>{salesData?.data.paymentType}</td>
                                                <td>{salesData?.data.warehouseName}</td>
                                                <td>{MoneyFormat.format(salesData?.data.totalAmount)}</td>
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