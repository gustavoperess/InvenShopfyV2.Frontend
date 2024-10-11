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

interface Category {
    id: number;
    categoryTitle: string;
    categoryImg: StaticImageData;
}

interface FirstPopupProps {
    open: boolean;
    handleFirstDialogClose: () => void;
    product_data: any;
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

const CategoryPopup: React.FC<FirstPopupProps> = ({ open, handleFirstDialogClose, product_data, setSeelctedCategoryFilteredData }) => {
    const [selectedCategory, setSelectedCategory] = useState<string[]>([]);

    const categoryList: Category[] = [
        { id: 1, categoryTitle: "Electronics", categoryImg: categoryElectronics },
        { id: 2, categoryTitle: "Fashion", categoryImg: categoryFashion },
        { id: 3, categoryTitle: "Food", categoryImg: categoryFood },
        { id: 4, categoryTitle: "Accessories", categoryImg: categoryAccessories },
    ];

    const handleCategoryList = (categoryTitle: string) => {
        if (selectedCategory.includes(categoryTitle)) {
            const newCategory = selectedCategory.filter((cat) => cat !== categoryTitle);
            setSelectedCategory(newCategory);
        } else {
            setSelectedCategory([...selectedCategory, categoryTitle]);
        }
    };


    const handleProductCategoryData = () => {
        const filteredCategoryData = product_data.filter((item: { category: string; }) => selectedCategory.includes(item.category));
        setSeelctedCategoryFilteredData(filteredCategoryData);
    };

    return (
        <div className='inventual-common-modal'>
            <BootstrapDialog
                onClose={handleFirstDialogClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <div className='inventual-modal-title'>
                    <div className="pb-3">
                        <h5 className='text-[22px]'>Select Category</h5>
                    </div>
                    <button autoFocus onClick={handleFirstDialogClose} type='button'><i className="fa-regular fa-xmark"></i></button>
                </div>
                <DialogContent dividers>
                    <div className='inventual-common-modal-width-medium width-full'>
                        <div className="inventual-popup-form-wrapper">
                            <div className="inventual-popup-form pt-5 pb-5 maxSm:py-4 flex flex-col gap-3">
                                <div className='flex flex-wrap justify-center md:justify-between gap-5'>
                                    {categoryList?.map((item) => (
                                        <div key={item.id}
                                            onClick={
                                                () => handleCategoryList(item.categoryTitle)
                                            }
                                            className={`w-[290px] sm:w-[140px] h-[180px] flex items-center justify-center bg-gray flex-col rounded-md border ${selectedCategory.includes(item.categoryTitle) ? 'border-blue-500' : 'border-border'}`
                                            }>
                                            <Image
                                                src={item.categoryImg}
                                                style={{ width: "120px", height: '120px' }}
                                                className='rounded-md'
                                                alt=""
                                                priority={true}
                                            />

                                            <h5 className='mt-2 text-[16px] font-semibold text-heading'>{item.categoryTitle}</h5>
                                        </div>

                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <button
                        className='inventual-btn' type='button'
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
