import React, { useState, useEffect } from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';

const ExpenseRoleList = () => {

    const [childCheckboxStates, setChildCheckboxStates] = useState({

        // for Expense
        expenseAdd: false,
        expenseView: false,
        expenseEdit: false,
        expenseDelete: false,

        // for Categorty
        categoryAdd: false,
        categoryView: false,
        categoryEdit: false,
        categoryDelete: false,

        // Expense Payment
        expensePaymentAdd: false,
        expensePaymentView: false,
        expensePaymentEdit: false,
        expensePaymentDelete: false,

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

            // for Expense
            expenseAdd: isChecked,
            expenseView: isChecked,
            expenseEdit: isChecked,
            expenseDelete: isChecked,

            // for Sales Category
            categoryAdd: isChecked,
            categoryView: isChecked,
            categoryEdit: isChecked,
            categoryDelete: isChecked,

            // for Sale Payment
            expensePaymentAdd: isChecked,
            expensePaymentView: isChecked,
            expensePaymentEdit: isChecked,
            expensePaymentDelete: isChecked,

        });
    };

    return (
        <>
            <div className="inventual-role-list border-b border-solid border-border flex items-center">
                <div className="inventual-role-left">
                    <div className="inventual-role-topic">
                        <h5 className="text-[18px] font-semibold text-heading mb-4">Expense</h5>
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
                            <h5>Expense</h5>
                        </div>
                        <div className="inventual-role-checkbox-wrapper">
                            <div className='inventual-checkbox-style'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={childCheckboxStates.expenseAdd}
                                            onChange={handleChildCheckboxChange}
                                            name="expenseAdd"
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
                                            checked={childCheckboxStates.expenseView}
                                            onChange={handleChildCheckboxChange}
                                            name="expenseView"
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
                                            checked={childCheckboxStates.expenseEdit}
                                            onChange={handleChildCheckboxChange}
                                            name="expenseEdit"
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
                                            checked={childCheckboxStates.expenseDelete}
                                            onChange={handleChildCheckboxChange}
                                            name="expenseDelete"
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
                    <div className="inventual-role-category-list custom-height-70 flex items-center border-b-0 border-solid border-border">
                        <div className="inventual-role-category">
                            <h5>Payment</h5>
                        </div>
                        <div className="inventual-role-checkbox-wrapper">
                            <div className='inventual-checkbox-style'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={childCheckboxStates.expensePaymentAdd}
                                            onChange={handleChildCheckboxChange}
                                            name="expensePaymentAdd"
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
                                            checked={childCheckboxStates.expensePaymentView}
                                            onChange={handleChildCheckboxChange}
                                            name="expensePaymentView"
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
                                            checked={childCheckboxStates.expensePaymentEdit}
                                            onChange={handleChildCheckboxChange}
                                            name="expensePaymentEdit"
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
                                            checked={childCheckboxStates.expensePaymentDelete}
                                            onChange={handleChildCheckboxChange}
                                            name="expensePaymentDelete"
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

export default ExpenseRoleList;