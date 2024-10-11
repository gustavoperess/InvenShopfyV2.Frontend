import React, { useState, useEffect } from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';

const WarehouseRoleList = () => {
    const [childCheckboxStates, setChildCheckboxStates] = useState({
        add: false,
        view: false,
        edit: false,
        delete: false
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
            delete: isChecked
        });
    };

    return (
        <>
            <div className="inventual-role-list border-b border-solid border-border flex items-center">
                <div className="inventual-role-left">
                    <div className="inventual-role-topic">
                        <h5 className="text-[18px] font-semibold text-heading mb-4">Warehouse</h5>
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
                    <div className="inventual-role-category-list custom-height-100 flex items-center border-b-0 border-solid border-border">
                        <div className="inventual-role-category">
                            <h5>Warehouse</h5>
                        </div>
                        <div className="inventual-role-checkbox-wrapper">
                            <div className='inventual-checkbox-style'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={childCheckboxStates.add}
                                            onChange={handleChildCheckboxChange}
                                            name="add"
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
                                            checked={childCheckboxStates.view}
                                            onChange={handleChildCheckboxChange}
                                            name="view"
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
                                            checked={childCheckboxStates.edit}
                                            onChange={handleChildCheckboxChange}
                                            name="edit"
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
                                            checked={childCheckboxStates.delete}
                                            onChange={handleChildCheckboxChange}
                                            name="delete"
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

export default WarehouseRoleList;
