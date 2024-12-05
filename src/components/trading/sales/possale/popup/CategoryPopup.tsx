import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Image, { StaticImageData } from 'next/image';
import categoryFashion from "../../../../../../public/assets/img/category/Fashion.png";
import categoryElectronics from "../../../../../../public/assets/img/category/Electronics.png";
import categoryFood from "../../../../../../public/assets/img/category/Food.png";
import categoryAccessories from "../../../../../../public/assets/img/category/Accessories.png";

interface FirstPopupProps {
    open: boolean;
    handleFirstDialogClose: () => void;
    productInformation: any;
    setSeelctedCategoryFilteredData: (data: any) => void;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const CategoryPopup: React.FC<FirstPopupProps> = ({ open, handleFirstDialogClose, productInformation, setSeelctedCategoryFilteredData }) => {
    const [selectedCategory, setSelectedCategory] = useState<string[]>([]);



    const handleCategoryList = (mainCategory: string) => {
        if (selectedCategory.includes(mainCategory)) {
            const newCategory = selectedCategory.filter((cat) => cat !== mainCategory);
            setSelectedCategory(newCategory);
        } else {
            setSelectedCategory([...selectedCategory, mainCategory]);
        }
    };


    const handleProductCategoryData = () => {
        const filteredCategoryData = productInformation.filter((item: { mainCategory: string; }) => selectedCategory.includes(item.mainCategory));
        setSeelctedCategoryFilteredData(filteredCategoryData);
    };

    return (
        <div className='invenShopfy-common-modal'>
            <BootstrapDialog
                onClose={handleFirstDialogClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <div className='invenShopfy-modal-title'>
                    <div className="pb-3">
                        <h5 className='text-[22px]'>Select Category</h5>
                    </div>
                    <button autoFocus onClick={handleFirstDialogClose} type='button'><i className="fa-regular fa-xmark"></i></button>
                </div>
                <DialogContent dividers>
                <div className='invenShopfy-common-modal-width-medium width-full'>
                        <div className="invenShopfy-popup-form-wrapper">
                            <div className="invenShopfy-popup-form pt-5 pb-5 maxSm:py-4 flex flex-col gap-3">
                                <div className='flex flex-wrap justify-center md:justify-between gap-5'>
                                {productInformation?.map((item: any) =>
                                           item.categoryId != null ? (
                                            <div key={item.categoryId}
                                                onClick={() => handleCategoryList(item.mainCategory)}
                                                className={`w-[290px] sm:w-[140px] h-[180px] flex items-center justify-center bg-gray flex-col rounded-md border ${selectedCategory.includes(item.mainCategory) ? 'border-blue-500' : 'border-border'}`}
                                                >
                                                <h5 className='mt-2 text-[16px] font-semibold text-heading'>{item.mainCategory}</h5>
                                            </div>
                                        ) : null
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <button
                        className='invenShopfy-btn' type='button'
                        onClick={
                            (e) => {
                                handleProductCategoryData()
                                handleFirstDialogClose()
                            }
                        }
                    >
                        Done
                    </button>
                </DialogActions>
            </BootstrapDialog>
        </div >
    );
};

export default CategoryPopup;
