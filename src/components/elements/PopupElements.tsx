"use client"
import React, { useState } from 'react';
import FirstPopup from './popup/FirstPopup';

const PopupElements = () => {

    // First Popup Start
    const [openFirstDialog, setOpenFirstDialog] = useState<boolean>(false);
    const handleFirstDialogOpen = () => {
        setOpenFirstDialog(true);
    };
    const handleFirstDialogClose = () => {
        setOpenFirstDialog(false);
    };
    // First Popup End

    return (
        <div className="invenShopfy-common-card mb-5">
            {/* First Popup Start */}
            <div>
                <button className='invenShopfy-btn' type='button' onClick={handleFirstDialogOpen}>
                    First Popup Btn
                </button>
                <FirstPopup open={openFirstDialog} handleFirstDialogClose={handleFirstDialogClose} />
            </div>
            {/* First Popup End */}
        </div>
    );
};

export default PopupElements;