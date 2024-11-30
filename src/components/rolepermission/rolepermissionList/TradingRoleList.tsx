import React, { useState, useEffect } from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';

const TradingRoleList = () => {

    const [childCheckboxStates, setChildCheckboxStates] = useState({
        add: false,
        view: false,
        edit: false,
        delete: false,

        // for Sales
        salesAdd: false,
        salesView: false,
        salesEdit: false,
        salesDelete: false,

        // for Pos Sale
        posSaleAdd: false,
        posSaleView: false,
        posSaleEdit: false,
        posSaleDelete: false,

        // for Sale Return
        saleReturnAdd: false,
        saleReturnView: false,
        saleReturnEdit: false,
        saleReturnDelete: false,

        // for Sale Payment
        salePaymentAdd: false,
        salePaymentView: false,
        salePaymentEdit: false,
        salePaymentDelete: false,


        // for Sale Purchase
        salePurchaseAdd: false,
        salePurchaseView: false,
        salePurchaseEdit: false,
        salePurchaseDelete: false,

        // for Sale Purchase Return
        purchaseReturnAdd: false,
        purchaseReturnView: false,
        purchaseReturnEdit: false,
        purchaseReturnDelete: false,



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

            add: isChecked,
            view: isChecked,
            edit: isChecked,
            delete: isChecked,
            // for Sales
            salesAdd: isChecked,
            salesView: isChecked,
            salesEdit: isChecked,
            salesDelete: isChecked,

            // for Sales Add
            posSaleAdd: isChecked,
            posSaleView: isChecked,
            posSaleEdit: isChecked,
            posSaleDelete: isChecked,

            // for Sale Return
            saleReturnAdd: isChecked,
            saleReturnView: isChecked,
            saleReturnEdit: isChecked,
            saleReturnDelete: isChecked,

            // for Sale Payment
            salePaymentAdd: isChecked,
            salePaymentView: isChecked,
            salePaymentEdit: isChecked,
            salePaymentDelete: isChecked,


            // for Sale Purchase
            salePurchaseAdd: isChecked,
            salePurchaseView: isChecked,
            salePurchaseEdit: isChecked,
            salePurchaseDelete: isChecked,

            // for Sale Purchase Rreturn
            purchaseReturnAdd: isChecked,
            purchaseReturnView: isChecked,
            purchaseReturnEdit: isChecked,
            purchaseReturnDelete: isChecked,


        });
    };


    return (
        <>
            <div className="inventual-role-list border-b border-solid border-border flex items-center">
                <div className="inventual-role-left">
                    <div className="inventual-role-topic">
                        <h5 className="text-[18px] font-semibold text-heading mb-4">Trading</h5>
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
                            <h5>Sales</h5>
                        </div>
                        <div className="inventual-role-checkbox-wrapper">
                            <div className='inventual-checkbox-style'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={childCheckboxStates.salesAdd}
                                            onChange={handleChildCheckboxChange}
                                            name="salesAdd"
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
                                            checked={childCheckboxStates.salesView}
                                            onChange={handleChildCheckboxChange}
                                            name="salesView"
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
                                            checked={childCheckboxStates.salesEdit}
                                            onChange={handleChildCheckboxChange}
                                            name="salesEdit"
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
                                            checked={childCheckboxStates.salesDelete}
                                            onChange={handleChildCheckboxChange}
                                            name="salesDelete"
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    }
                                    label="Delete"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="inventual-role-category-list custom-height-70 flex items-center border-b border-solid border-border">
                        <div className="inventual-role-category">
                            <h5>POS Sale</h5>
                        </div>
                        <div className="inventual-role-checkbox-wrapper">
                            <div className='inventual-checkbox-style'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={childCheckboxStates.posSaleAdd}
                                            onChange={handleChildCheckboxChange}
                                            name="posSaleAdd"
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
                                            checked={childCheckboxStates.posSaleView}
                                            onChange={handleChildCheckboxChange}
                                            name="posSaleView"
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
                                            checked={childCheckboxStates.posSaleEdit}
                                            onChange={handleChildCheckboxChange}
                                            name="posSaleEdit"
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
                                            checked={childCheckboxStates.posSaleDelete}
                                            onChange={handleChildCheckboxChange}
                                            name="posSaleDelete"
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    }
                                    label="Delete"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="inventual-role-category-list custom-height-70 flex items-center border-b border-solid border-border">
                        <div className="inventual-role-category">
                            <h5>Sale Return</h5>
                        </div>
                        <div className="inventual-role-checkbox-wrapper">
                            <div className='inventual-checkbox-style'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={childCheckboxStates.saleReturnAdd}
                                            onChange={handleChildCheckboxChange}
                                            name="saleReturnAdd"
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
                                            checked={childCheckboxStates.saleReturnView}
                                            onChange={handleChildCheckboxChange}
                                            name="saleReturnView"
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
                                            checked={childCheckboxStates.saleReturnEdit}
                                            onChange={handleChildCheckboxChange}
                                            name="saleReturnEdit"
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
                                            checked={childCheckboxStates.saleReturnDelete}
                                            onChange={handleChildCheckboxChange}
                                            name="saleReturnDelete"
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    }
                                    label="Delete"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="inventual-role-category-list custom-height-70 flex items-center border-b border-solid border-border">
                        <div className="inventual-role-category">
                            <h5>Sales Payment</h5>
                        </div>
                        <div className="inventual-role-checkbox-wrapper">
                            <div className='inventual-checkbox-style'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={childCheckboxStates.salePaymentAdd}
                                            onChange={handleChildCheckboxChange}
                                            name="salePaymentAdd"
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
                                            checked={childCheckboxStates.salePaymentView}
                                            onChange={handleChildCheckboxChange}
                                            name="salePaymentView"
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
                                            checked={childCheckboxStates.salePaymentEdit}
                                            onChange={handleChildCheckboxChange}
                                            name="salePaymentEdit"
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
                                            checked={childCheckboxStates.salePaymentDelete}
                                            onChange={handleChildCheckboxChange}
                                            name="salePaymentDelete"
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    }
                                    label="Delete"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="inventual-role-category-list custom-height-70 flex items-center border-b border-solid border-border">
                        <div className="inventual-role-category">
                            <h5>Purchase</h5>
                        </div>
                        <div className="inventual-role-checkbox-wrapper">
                            <div className='inventual-checkbox-style'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={childCheckboxStates.salePurchaseAdd}
                                            onChange={handleChildCheckboxChange}
                                            name="salePurchaseAdd"
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
                                            checked={childCheckboxStates.salePurchaseView}
                                            onChange={handleChildCheckboxChange}
                                            name="salePurchaseView"
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
                                            checked={childCheckboxStates.salePurchaseEdit}
                                            onChange={handleChildCheckboxChange}
                                            name="salePurchaseEdit"
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
                                            checked={childCheckboxStates.salePurchaseDelete}
                                            onChange={handleChildCheckboxChange}
                                            name="salePurchaseDelete"
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    }
                                    label="Delete"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="inventual-role-category-list custom-height-70 flex items-center border-b border-solid border-border">
                        <div className="inventual-role-category">
                            <h5>Purchase Return</h5>
                        </div>
                        <div className="inventual-role-checkbox-wrapper">
                            <div className='inventual-checkbox-style'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={childCheckboxStates.purchaseReturnAdd}
                                            onChange={handleChildCheckboxChange}
                                            name="purchaseReturnAdd"
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
                                            checked={childCheckboxStates.purchaseReturnView}
                                            onChange={handleChildCheckboxChange}
                                            name="purchaseReturnView"
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
                                            checked={childCheckboxStates.purchaseReturnEdit}
                                            onChange={handleChildCheckboxChange}
                                            name="purchaseReturnEdit"
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
                                            checked={childCheckboxStates.purchaseReturnDelete}
                                            onChange={handleChildCheckboxChange}
                                            name="purchaseReturnDelete"
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

export default TradingRoleList;