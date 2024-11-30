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
                    console.log(updatedStates)
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
                            <h5>Category</h5>
                        </div>
                        <div className="inventual-role-checkbox-wrapper">
                            <div className='inventual-checkbox-style'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={childCheckboxStates.productCategoryAdd}
                                            onChange={handleChildCheckboxChange}
                                            name="productCategoryAdd"
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
                                            checked={childCheckboxStates.productCategoryView}
                                            onChange={handleChildCheckboxChange}
                                            name="productCategoryView"
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
                                            checked={childCheckboxStates.productCategoryEdit}
                                            onChange={handleChildCheckboxChange}
                                            name="productCategoryEdit"
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
                                            checked={childCheckboxStates.productCategoryDelete}
                                            onChange={handleChildCheckboxChange}
                                            name="productCategoryDelete"
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
                                            checked={childCheckboxStates.productBrandAdd}
                                            onChange={handleChildCheckboxChange}
                                            name="productBrandAdd"
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
                                            checked={childCheckboxStates.productBrandView}
                                            onChange={handleChildCheckboxChange}
                                            name="productBrandView"
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
                                            checked={childCheckboxStates.productBrandEdit}
                                            onChange={handleChildCheckboxChange}
                                            name="productBrandEdit"
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
                                            checked={childCheckboxStates.productBrandDelete}
                                            onChange={handleChildCheckboxChange}
                                            name="productBrandDelete"
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
                            <h5>Unit / Value</h5>
                        </div>
                        <div className="inventual-role-checkbox-wrapper">
                            <div className='inventual-checkbox-style'>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={childCheckboxStates.productUnitAdd}
                                            onChange={handleChildCheckboxChange}
                                            name="productUnitAdd"
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
                                            checked={childCheckboxStates.productUnitView}
                                            onChange={handleChildCheckboxChange}
                                            name="productUnitView"
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
                                            checked={childCheckboxStates.productUnitEdit}
                                            onChange={handleChildCheckboxChange}
                                            name="productUnitEdit"
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
                                            checked={childCheckboxStates.productUnitDelete}
                                            onChange={handleChildCheckboxChange}
                                            name="productUnitDelete"
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