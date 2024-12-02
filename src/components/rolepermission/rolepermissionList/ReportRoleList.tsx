import React, { useState, useEffect, useRef } from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';
import { ChildCheckboxStates } from '@/interFace/interFace';


const DEFAULT_REPORT_PERMISSIONS = [
    { entityType: 'Report', permissions: [
        { action: 'View', isAllowed: false }, { action: 'Add', isAllowed: false }, 
        { action: 'Edit', isAllowed: false }, { action: 'Delete', isAllowed: false }]}
];

const ReportRoleList = ({
    permissionsByEntity,
    onPermissionsChange,
}: {
    permissionsByEntity: any;
    onPermissionsChange: (updatedStates: ChildCheckboxStates) => void;
}) => {
    const [childCheckboxStates, setChildCheckboxStates] = useState<ChildCheckboxStates>({});
    const [selectAllChecked, setSelectAllChecked] = useState(false);
    const hasInitialized = useRef(false);

    useEffect(() => {
        const entities = permissionsByEntity.length ? permissionsByEntity : DEFAULT_REPORT_PERMISSIONS;
    
        const initialStates: ChildCheckboxStates = {};
    
        entities.forEach((entity: any) => {
            const entityType = entity.entityType.toLowerCase();
            entity.permissions.forEach((permission: any) => {
                const key = `${entityType}${permission.action}`;
                initialStates[key] = permission.isAllowed;
            });
        });
    
        setChildCheckboxStates(initialStates);
        setSelectAllChecked(Object.values(initialStates).every((value) => value));
    }, [permissionsByEntity]);

    useEffect(() => {
        if (hasInitialized.current) {
            onPermissionsChange(childCheckboxStates);
        }
    }, [childCheckboxStates, onPermissionsChange]);

    const handleChildCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
    
        setChildCheckboxStates((prev) => {
            const updatedStates = { ...prev, [name]: checked };
            setSelectAllChecked(Object.values(updatedStates).every((value) => value));
            return updatedStates;
        });
    };
    
    const handleSelectAllChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
    
        const updatedStates: ChildCheckboxStates = Object.keys(childCheckboxStates).reduce(
            (acc, key) => ({
                ...acc,
                [key]: isChecked,
            }),
            {}
        );
    
        setSelectAllChecked(isChecked);
        setChildCheckboxStates(updatedStates);
    };

    return (
        <div className="inventual-role-list border-b border-solid border-border flex items-center">
            <div className="inventual-role-left">
                <div className="inventual-role-topic">
                    <h5 className="text-[18px] font-semibold text-heading mb-4">Reports</h5>
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
                {DEFAULT_REPORT_PERMISSIONS.map((entity: any, index: number) => (
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
                                                    childCheckboxStates[
                                                    `${entity.entityType.toLowerCase()}${permission.action}`
                                                    ] || false
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
    );
};

export default ReportRoleList;