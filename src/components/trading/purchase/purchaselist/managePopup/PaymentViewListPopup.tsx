"use client"
import React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

interface ViewPaymentPopupProps {
    open: boolean;
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

const PaymentViewListPopup = ({ open, handleViewPaymentDialogClose }: ViewPaymentPopupProps) => {

    const dummyData = (e: any) => {
        e.preventDefault();
    };

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
                            <form onSubmit={dummyData}>
                                <div className="invenShopfy-common-small-table mt-0.5 xs:overflow-x-auto">
                                    <table>
                                        <thead>
                                            <tr className='bg-lightest'>
                                                <th>Date</th>
                                                <th>Reference</th>
                                                <th>Cash</th>
                                                <th>Amount</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>30/12/2022</td>
                                                <td>S-920873850390</td>
                                                <td>Cash</td>
                                                <td>$4,582</td>
                                                <td>
                                                    <div className="invenShopfy-list-action-style">
                                                        <PopupState variant="popover">
                                                            {(popupState: any) => (
                                                                <React.Fragment>
                                                                    <button className='' type='button' {...bindTrigger(popupState)}>
                                                                        Action <i className="fa-sharp fa-solid fa-sort-down"></i>
                                                                    </button>
                                                                    <Menu {...bindMenu(popupState)}>
                                                                        <MenuItem onClick={popupState.close}><i className="fa-regular fa-pen-to-square"></i> Edit</MenuItem>
                                                                        <MenuItem onClick={popupState.close}><i className="fa-light fa-trash-can"></i> Delete</MenuItem>
                                                                    </Menu>
                                                                </React.Fragment>
                                                            )}
                                                        </PopupState>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </form>
                        </div>
                    </DialogContent>
                </BootstrapDialog>
            </div>
        </>
    );
};

export default PaymentViewListPopup;