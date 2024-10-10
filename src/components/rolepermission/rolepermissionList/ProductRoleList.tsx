import React, { useState, useEffect } from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';
const ProductRoleList = () => {

    const [childCheckboxStates, setChildCheckboxStates] = useState({

        // for Sales
        productsAdd: false,
        productsView: false,
        productsEdit: false,
        productsDelete: false,

        // for Pos Sale
        bardCodeAdd: false,
        bardCodeView: false,
        bardCodeEdit: false,
        bardCodeDelete: false,

        // for Sale Return
        categoryAdd: false,
        categoryView: false,
        categoryEdit: false,
        categoryDelete: false,

        // for Sale Payment
        brandAdd: false,
        brandView: false,
        brandEdit: false,
        brandDelete: false,

        // for Sale Invoice
        UnitValueAdd: false,
        UnitValueView: false,
        UnitValueEdit: false,
        UnitValueDelete: false,

        // for Sale Purchase
        adjustmentAdd: false,
        adjustmentView: false,
        adjustmentEdit: false,
        adjustmentDelete: false,

    });
    const [selectAllChecked, setSelectAllChecked] = useState(false);

    useEffect(() => {
        // Check if all child checkboxes are checked, if yes, set parent checkbox to checked
        const allChecked = Object.values(childCheckboxStates).every(value => value);
        setSelectAllChecked(allChecked);
    }, [childCheckboxStates]);

    const handleChildCheckboxChange = (event: any) => {
        const { name, checked } = event.target;
        setChildCheckboxStates(prevState => ({
            ...prevState,
            [name]: checked
        }));
    };

    const handleSelectAllChange = (event: any) => {
        const isChecked = event.target.checked;
        setSelectAllChecked(isChecked);
        setChildCheckboxStates({

            // for Products
            productsAdd: isChecked,
            productsView: isChecked,
            productsEdit: isChecked,
            productsDelete: isChecked,

            // for Sales Add
            bardCodeAdd: isChecked,
            bardCodeView: isChecked,
            bardCodeEdit: isChecked,
            bardCodeDelete: isChecked,

            // for Sale Return
            categoryAdd: isChecked,
            categoryView: isChecked,
            categoryEdit: isChecked,
            categoryDelete: isChecked,

            // for Sale Payment
            brandAdd: isChecked,
            brandView: isChecked,
            brandEdit: isChecked,
            brandDelete: isChecked,

            // for Sale Invoice
            UnitValueAdd: isChecked,
            UnitValueView: isChecked,
            UnitValueEdit: isChecked,
            UnitValueDelete: isChecked,

            // for Sale Purchase
            adjustmentAdd: isChecked,
            adjustmentView: isChecked,
            adjustmentEdit: isChecked,
            adjustmentDelete: isChecked,

        });
    };

    return (
        <>
            <div className="inventual-role-list border-b border-solid border-border flex items-center">
                <div className="inventual-role-left">
                    <div className="inventual-role-topic">
                        <h5 className="text-[18px] font-semibold text-heading mb-4">Products</h5>
                        <div className='inventual-checkbox-style ms-3'>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={selectAllChecked}
                                        onChange={handleSelectAllChange}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                }
                                label="Permission All"
                            />
                        </div>
                    </div>
                </div>
                <div className="inventual-role-right w-full border-s border-solid border-border">
                    <div className="inventual-role-category-list custom-height-70 flex items-center border-b border-solid border-border">
                        <div className="inventual-role-category">
                            <h5>Products</h5>
                        </div>
                        <div className="inventual-role-checkbox-wrapper">
                            <div className='inventual-checkbox-style'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={childCheckboxStates.productsAdd}
                                            onChange={handleChildCheckboxChange}
                                            name="productsAdd"
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    }
                                    label="Add"
                                />
                            </div>
                            <div className='inventual-checkbox-style'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={childCheckboxStates.productsView}
                                            onChange={handleChildCheckboxChange}
                                            name="productsView"
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    }
                                    label="View"
                                />
                            </div>
                            <div className='inventual-checkbox-style'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={childCheckboxStates.productsEdit}
                                            onChange={handleChildCheckboxChange}
                                            name="productsEdit"
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    }
                                    label="Edit"
                                />
                            </div>
                            <div className='inventual-checkbox-style'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={childCheckboxStates.productsDelete}
                                            onChange={handleChildCheckboxChange}
                                            name="productsDelete"
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    }
                                    label="Delete"
                                />
                            </div>
                        </div>
                    </div>
                    <div
                        className="inventual-role-category-list custom-height-70 flex items-center border-b border-solid border-border">
                        <div className="inventual-role-category">
                            <h5>Bardcode</h5>
                        </div>
                        <div className="inventual-role-checkbox-wrapper">
                            <div className='inventual-checkbox-style'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={childCheckboxStates.bardCodeAdd}
                                            onChange={handleChildCheckboxChange}
                                            name="bardCodeAdd"
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    }
                                    label="Add"
                                />
                            </div>
                            <div className='inventual-checkbox-style'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={childCheckboxStates.bardCodeView}
                                            onChange={handleChildCheckboxChange}
                                            name="bardCodeView"
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    }
                                    label="View"
                                />
                            </div>
                            <div className='inventual-checkbox-style'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={childCheckboxStates.bardCodeEdit}
                                            onChange={handleChildCheckboxChange}
                                            name="bardCodeEdit"
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    }
                                    label="Edit"
                                />
                            </div>
                            <div className='inventual-checkbox-style'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={childCheckboxStates.bardCodeDelete}
                                            onChange={handleChildCheckboxChange}
                                            name="bardCodeDelete"
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    }
                                    label="Delete"
                                />
                            </div>
                        </div>
                    </div>
                    <div
                        className="inventual-role-category-list custom-height-70 flex items-center border-b border-solid border-border">
                        <div className="inventual-role-category">
                            <h5>Category</h5>
                        </div>
                        <div className="inventual-role-checkbox-wrapper">
                            <div className='inventual-checkbox-style'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={childCheckboxStates.categoryAdd}
                                            onChange={handleChildCheckboxChange}
                                            name="categoryAdd"
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    }
                                    label="Add"
                                />
                            </div>
                            <div className='inventual-checkbox-style'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={childCheckboxStates.categoryView}
                                            onChange={handleChildCheckboxChange}
                                            name="categoryView"
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    }
                                    label="View"
                                />
                            </div>
                            <div className='inventual-checkbox-style'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={childCheckboxStates.categoryEdit}
                                            onChange={handleChildCheckboxChange}
                                            name="categoryEdit"
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    }
                                    label="Edit"
                                />
                            </div>
                            <div className='inventual-checkbox-style'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={childCheckboxStates.categoryDelete}
                                            onChange={handleChildCheckboxChange}
                                            name="categoryDelete"
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    }
                                    label="Delete"
                                />
                            </div>
                        </div>
                    </div>
                    <div
                        className="inventual-role-category-list custom-height-70 flex items-center border-b border-solid border-border">
                        <div className="inventual-role-category">
                            <h5>Brand</h5>
                        </div>
                        <div className="inventual-role-checkbox-wrapper">
                            <div className='inventual-checkbox-style'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={childCheckboxStates.brandAdd}
                                            onChange={handleChildCheckboxChange}
                                            name="brandAdd"
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    }
                                    label="Add"
                                />
                            </div>
                            <div className='inventual-checkbox-style'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={childCheckboxStates.brandView}
                                            onChange={handleChildCheckboxChange}
                                            name="brandView"
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    }
                                    label="View"
                                />
                            </div>
                            <div className='inventual-checkbox-style'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={childCheckboxStates.brandEdit}
                                            onChange={handleChildCheckboxChange}
                                            name="brandEdit"
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    }
                                    label="Edit"
                                />
                            </div>
                            <div className='inventual-checkbox-style'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={childCheckboxStates.brandDelete}
                                            onChange={handleChildCheckboxChange}
                                            name="brandDelete"
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    }
                                    label="Delete"
                                />
                            </div>
                        </div>
                    </div>
                    <div
                        className="inventual-role-category-list custom-height-70 flex items-center border-b border-solid border-border">
                        <div className="inventual-role-category">
                            <h5>Unite / Value</h5>
                        </div>
                        <div className="inventual-role-checkbox-wrapper">
                            <div className='inventual-checkbox-style'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={childCheckboxStates.UnitValueAdd}
                                            onChange={handleChildCheckboxChange}
                                            name="UnitValueAdd"
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    }
                                    label="Add"
                                />
                            </div>
                            <div className='inventual-checkbox-style'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={childCheckboxStates.UnitValueView}
                                            onChange={handleChildCheckboxChange}
                                            name="UnitValueView"
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    }
                                    label="View"
                                />
                            </div>
                            <div className='inventual-checkbox-style'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={childCheckboxStates.UnitValueEdit}
                                            onChange={handleChildCheckboxChange}
                                            name="UnitValueEdit"
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    }
                                    label="Edit"
                                />
                            </div>
                            <div className='inventual-checkbox-style'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={childCheckboxStates.UnitValueDelete}
                                            onChange={handleChildCheckboxChange}
                                            name="UnitValueDelete"
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    }
                                    label="Delete"
                                />
                            </div>
                        </div>
                    </div>
                    <div
                        className="inventual-role-category-list custom-height-70 flex items-center border-b-0 border-solid border-border">
                        <div className="inventual-role-category">
                            <h5>Adjustment</h5>
                        </div>
                        <div className="inventual-role-checkbox-wrapper">
                            <div className='inventual-checkbox-style'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={childCheckboxStates.adjustmentAdd}
                                            onChange={handleChildCheckboxChange}
                                            name="adjustmentAdd"
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    }
                                    label="Add"
                                />
                            </div>
                            <div className='inventual-checkbox-style'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={childCheckboxStates.adjustmentView}
                                            onChange={handleChildCheckboxChange}
                                            name="adjustmentView"
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    }
                                    label="View"
                                />
                            </div>
                            <div className='inventual-checkbox-style'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={childCheckboxStates.adjustmentEdit}
                                            onChange={handleChildCheckboxChange}
                                            name="adjustmentEdit"
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    }
                                    label="Edit"
                                />
                            </div>
                            <div className='inventual-checkbox-style'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={childCheckboxStates.adjustmentDelete}
                                            onChange={handleChildCheckboxChange}
                                            name="adjustmentDelete"
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    }
                                    label="Delete"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductRoleList;