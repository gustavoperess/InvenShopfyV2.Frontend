import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { toast } from 'react-toastify';
import { TextField } from '@mui/material';


interface EditUserRoleProps {
    open: boolean;
    userId: number | undefined;
    currentRole: string;
    handleEditEmployeeDialogClose: () => void;
}
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const EditEmployeeListPopup = ({ open, userId, currentRole, handleEditEmployeeDialogClose }: EditUserRoleProps) => {

   


  

    const handleCreatePayment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const PaymentData = {   }
        try {
            // await addPayment(PaymentData).unwrap();
            toast.success("Payment Created successfully!");
      
            handleEditEmployeeDialogClose();
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
            <div className='invenShopfy-common-modal'>
                <BootstrapDialog
                    onClose={handleEditEmployeeDialogClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                >
                    <div className='invenShopfy-modal-title'>
                        <h4>Edit User</h4>
                        <button autoFocus onClick={handleEditEmployeeDialogClose} type='button'><i className="fa-regular fa-xmark"></i></button>
                    </div>
                    <DialogContent dividers>
                        <div className='invenShopfy-common-modal-width width-full'>
                            <form onSubmit={handleCreatePayment}>
                                <div className="grid grid-cols-12 sm:gap-x-[30px] gap-y-[18px]">
                                    <div className="col-span-12 md:col-span-6">
                                        <div className="invenShopfy-formTree-field">
                                            <h5>Current Role</h5>
                                            <div className="invenShopfy-select-field-style">
                                                <TextField
                                                    required
                                                    value={currentRole}
                                                    disabled={currentRole !== ''}
                                                    style={{
                                                        backgroundColor: currentRole !== '' ? '#e0e0e0' : 'inherit',
                                                        color: currentRole !== '' ? '#757575' : 'inherit',
                                                        width: '100%',
                                                    }}
                                                >
                                                </TextField>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6">
                                        <div className="invenShopfy-formTree-field">
                                            <h5>New Role</h5>
                                            <div className="invenShopfy-select-field-style">
                                           
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <DialogActions>
                                    <button className='invenShopfy-btn' type='submit'>
                                        Switch Roles
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

export default EditEmployeeListPopup;