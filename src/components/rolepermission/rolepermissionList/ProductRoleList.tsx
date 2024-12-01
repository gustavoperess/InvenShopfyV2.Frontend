import React, { useState, useEffect } from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';


type ChildCheckboxStates = {
    [key: string]: boolean;
};


const ProductRoleList = ({ permissionsByEntity }: { permissionsByEntity: any }) => {
    const [childCheckboxStates, setChildCheckboxStates] = useState<ChildCheckboxStates>({
        // for products
        productsAdd: false,
        productsView: false,
        productsEdit: false,
        productsDelete: false,

        // for products category
        productCategoryAdd: false,
        productCategoryView: false,
        productCategoryEdit: false,
        productCategoryDelete: false,

        // for products brand
        productBrandAdd: false,
        productBrandView: false,
        productBrandEdit: false,
        productBrandDelete: false,

        // for products unit
        productUnitAdd: false,
        productUnitView: false,
        productUnitEdit: false,
        productUnitDelete: false,



    });
    const [selectAllChecked, setSelectAllChecked] = useState(false);

    useEffect(() => {
        if (permissionsByEntity?.length) {
            const updatedStates: ChildCheckboxStates = {};

            permissionsByEntity.forEach((entity: any) => {
                const entityType = entity.entityType.toLowerCase(); // Normalize to match state keys
                entity.permissions.forEach((permission: any) => {
                    const key = `${entityType}${permission.action}`;
                    updatedStates[key] = permission.isAllowed;
                });
            });

            setChildCheckboxStates(updatedStates);
        }
    }, [permissionsByEntity]);

    useEffect(() => {
        const allChecked = Object.values(childCheckboxStates).every(Boolean);
        setSelectAllChecked(allChecked);
    }, [childCheckboxStates]);

    const handleChildCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        setChildCheckboxStates((prev) => ({
            ...prev,
            [name]: checked,
        }));
    };

    const handleSelectAllChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;

        const updatedStates: ChildCheckboxStates = Object.keys(childCheckboxStates).reduce(
            (acc, key) => ({
                ...acc,
                [key]: isChecked,
            }),
            {} as ChildCheckboxStates
        );

        setSelectAllChecked(isChecked);
        setChildCheckboxStates(updatedStates);
    };


    return (
        <>
            {permissionsByEntity && permissionsByEntity.length > 0 && (
                <div className="inventual-role-list border-b border-solid border-border flex items-center">
                    <div className="inventual-role-left">
                        <div className="inventual-role-topic">
                            <h5 className="text-[18px] font-semibold text-heading mb-4">Products</h5>
                            <div className="inventual-checkbox-style ms-3">
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
                        {permissionsByEntity.map((entity: any, index: number) => (
                            <div
                                key={index}
                                className="inventual-role-category-list custom-height-70 flex items-center border-b border-solid border-border"
                            >
                                <div className="inventual-role-category">
                                    <h5>{entity.entityType}</h5>
                                </div>
                                <div className="inventual-role-checkbox-wrapper">
                                    {entity.permissions.map((permission: any) => (
                                        <div key={permission.action} className="inventual-checkbox-style">
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={
                                                            childCheckboxStates[`${entity.entityType.toLowerCase()}${permission.action}`] ||
                                                            false
                                                        }
                                                        onChange={handleChildCheckboxChange}
                                                        name={`${entity.entityType.toLowerCase()}${permission.action}`}
                                                        inputProps={{ 'aria-label': 'controlled' }}
                                                    />
                                                }
                                                label={permission.action}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );    
};

export default ProductRoleList;