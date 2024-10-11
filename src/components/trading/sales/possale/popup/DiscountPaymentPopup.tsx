import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { FormControlLabel, Radio } from '@mui/material';
import PremiumDiscountPopup from './PremiumDiscountPopup';  
import MembershipDiscountPopup from './MembershipDiscountPopup';
interface DiscountPaymentPopupProps {
    open: boolean;
    handleDiscountPaymentDialogClose: () => void;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const DiscountPaymentPopup = ({ open, handleDiscountPaymentDialogClose }: DiscountPaymentPopupProps) => {

    const [openPremiumDiscountDialog, setOpenDiscountPaymentDialog] = useState<boolean>(false);
    const [openMembershipDiscountDialog, setOpenMembershipDiscountDialog] = useState<boolean>(false);

    const dummyData = (e: any) => {
        e.preventDefault();
    };

    const handlePremiumDiscountDialogOpen = () => {
        setOpenDiscountPaymentDialog(true);
    };
    const handlePremiumDiscountDialogClose = () => {
        setOpenDiscountPaymentDialog(false);
    };

    const handleMembershipDiscountDialogOpen = () => {
        setOpenMembershipDiscountDialog(true);
    };
    const handleMembershipDiscountDialogClose = () => {
        setOpenMembershipDiscountDialog(false);
    };

    //condition for popup
    const [selectedOption, setSelectedOption] = useState<string>(''); 

    const handleOptionChange = (event: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
        setSelectedOption((event.target as HTMLInputElement).value);
    };

    const handlePopupOpen = () => {
        if (selectedOption === "Discount") {
            handlePremiumDiscountDialogOpen()
        } else if (selectedOption === "Membership") {
            handleMembershipDiscountDialogOpen()
        }
    };

    return (
        <>
            <div className='inventual-common-modal'>
                <BootstrapDialog
                    onClose={handleDiscountPaymentDialogClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                >
                    <div className='inventual-modal-title'>
                        <h4>Order Discount</h4>
                        <button autoFocus onClick={handleDiscountPaymentDialogClose} type='button'><i className="fa-regular fa-xmark"></i></button>
                    </div>
                    <DialogContent dividers>
                        <div className='inventual-common-modal-width width-full discount-popup'>
                            <form onSubmit={dummyData}>
                                <div className="grid grid-cols-12 sm:gap-x-[30px] gap-y-[15px]">
                                    <div className="col-span-12">
                                        <div className="col-span-12">
                                            <div className="inventual-radio-field flex flex-wrap gap-x-5 gap-y-0.5">
                                            <FormControlLabel 
                                                    onClick={handleOptionChange} 
                                                    value="Discount" 
                                                    control={<Radio />} 
                                                    label="Discount" 
                                                    checked={selectedOption === 'Discount'} 
                                                />
                                                <FormControlLabel 
                                                    onClick={handleOptionChange} 
                                                    value="Membership" 
                                                    control={<Radio />} 
                                                    label="Membership" 
                                                    checked={selectedOption === 'Membership'} 
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-12">
                                        <div className="inventual-form-field">
                                            <h5>Phone</h5>
                                            <div className="inventual-input-field-style">
                                                <input type="tel" placeholder='+02 872 360 930' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <button onClick={handlePopupOpen} className='inventual-btn' type='button'>
                            Check Eligibility
                        </button>
                    </DialogActions>
                </BootstrapDialog>
            </div>
            <PremiumDiscountPopup open={openPremiumDiscountDialog} handlePremiumDiscountDialogClose={handlePremiumDiscountDialogClose} />
            <MembershipDiscountPopup open={openMembershipDiscountDialog} handleMembershipDiscountDialogClose={handleMembershipDiscountDialogClose} />
        </>
    );
};

export default DiscountPaymentPopup;