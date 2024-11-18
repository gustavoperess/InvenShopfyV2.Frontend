import React, { useState, useEffect } from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';

const ReportRoleList = () => {

    const [childCheckboxStates, setChildCheckboxStates] = useState({

        // first row
        salesReport: false,
        customerReport: false,
        productsReport: false,

        // second row
        bestSallers: false,
        supplierReport: false,
        billerReport: false,
        dueReport: false,
 

        // third row
        purchaseReport: false,
        userReport: false,
        stockReport: false,
        warehouseReport: false,
 

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

            // first row
            salesReport: isChecked,
            customerReport: isChecked,
            productsReport: isChecked,

            // second row
            bestSallers: isChecked,
            supplierReport: isChecked,
            billerReport: isChecked,
            dueReport: isChecked,

            // third row
            purchaseReport: isChecked,
            userReport: isChecked,
            stockReport: isChecked,
            warehouseReport: isChecked,
        

        });
    };

    return (
        <>
            <div className="inventual-role-list border-b border-solid border-gray-borderThree flex items-center">
                <div className="inventual-role-left">
                    <div className="inventual-role-topic">
                        <h5 className="text-[18px] font-semibold text-heading mb-4">Report</h5>
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
                <div className="inventual-role-right w-full border-s border-solid border-gray-borderThree">
                    <div className="inventual-role-category-list custom-height-50 flex items-center">
                        <div className="inventual-role-checkbox-wrapper inventual-role-checkbox-wrapper2">
                            <div className='inventual-checkbox-style'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={childCheckboxStates.salesReport}
                                            onChange={handleChildCheckboxChange}
                                            name="salesReport"
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    }
                                    label="Sales Report"
                                />
                            </div>
                            <div className='inventual-checkbox-style'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={childCheckboxStates.customerReport}
                                            onChange={handleChildCheckboxChange}
                                            name="customerReport"
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    }
                                    label="Customer Report"
                                />
                            </div>
                            <div className='inventual-checkbox-style'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={childCheckboxStates.productsReport}
                                            onChange={handleChildCheckboxChange}
                                            name="productsReport"
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    }
                                    label="Products Report"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="inventual-role-category-list custom-height-50 flex items-center">
                        <div className="inventual-role-checkbox-wrapper inventual-role-checkbox-wrapper2">
                            <div className='inventual-checkbox-style'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={childCheckboxStates.bestSallers}
                                            onChange={handleChildCheckboxChange}
                                            name="bestSallers"
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    }
                                    label="Best Sallers"
                                />
                            </div>
                            <div className='inventual-checkbox-style'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={childCheckboxStates.supplierReport}
                                            onChange={handleChildCheckboxChange}
                                            name="supplierReport"
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    }
                                    label="Supplier Report"
                                />
                            </div>
                            <div className='inventual-checkbox-style'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={childCheckboxStates.billerReport}
                                            onChange={handleChildCheckboxChange}
                                            name="billerReport"
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    }
                                    label="Biller Report"
                                />
                            </div>
                            <div className='inventual-checkbox-style'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={childCheckboxStates.dueReport}
                                            onChange={handleChildCheckboxChange}
                                            name="dueReport"
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    }
                                    label="Due Report"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="inventual-role-category-list custom-height-50 flex items-center">
                        <div className="inventual-role-checkbox-wrapper inventual-role-checkbox-wrapper2">
                            <div className='inventual-checkbox-style'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={childCheckboxStates.purchaseReport}
                                            onChange={handleChildCheckboxChange}
                                            name="purchaseReport"
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    }
                                    label="Purchase Report"
                                />
                            </div>
                            <div className='inventual-checkbox-style'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={childCheckboxStates.userReport}
                                            onChange={handleChildCheckboxChange}
                                            name="userReport"
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    }
                                    label="User Report"
                                />
                            </div>
                            <div className='inventual-checkbox-style'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={childCheckboxStates.stockReport}
                                            onChange={handleChildCheckboxChange}
                                            name="stockReport"
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    }
                                    label="Stock Report"
                                />
                            </div>
                            <div className='inventual-checkbox-style'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={childCheckboxStates.warehouseReport}
                                            onChange={handleChildCheckboxChange}
                                            name="warehouseReport"
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                    }
                                    label="Warehouse Report"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ReportRoleList;