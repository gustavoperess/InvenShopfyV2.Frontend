import React, { useState, useEffect, useRef } from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';
import { EntityPermissions, RoleListProps } from '@/interFace/interFace';


const DEFAULT_WAREHOUSE_PERMISSIONS: EntityPermissions[] = [
    { entityType: 'Warehouse', permissions: [{ action: 'View', isAllowed: false }, { action: 'Add', isAllowed: false }, { action: 'Update', isAllowed: false }, { action: 'Delete', isAllowed: false }] },
];

const WarehouseRoleList: React.FC<RoleListProps> = ({ permissionsByEntity, calledItem, onProcessComplete, updatePermissions, setIsReadyToSubmit }) => {

    const [mergedPermissions, setMergedPermissions] = useState(DEFAULT_WAREHOUSE_PERMISSIONS);
    const [selectAllChecked, setSelectAllChecked] = useState(false);

    useEffect(() => {
        if (!setIsReadyToSubmit) {
            const mergePermissions = () => {
                const updatedPermissions = DEFAULT_WAREHOUSE_PERMISSIONS.map((defaultEntity) => {
                    const matchingEntity = permissionsByEntity.find(
                        (backendEntity) => backendEntity.entityType === defaultEntity.entityType
                    );

                    return matchingEntity
                        ? {
                            ...defaultEntity,
                            permissions: defaultEntity.permissions.map((defaultPermission) => {
                                const backendPermission = matchingEntity.permissions.find(
                                    (p: any) => p.action === defaultPermission.action
                                );
                                return backendPermission || defaultPermission;
                            }),
                        }
                        : defaultEntity;
                });
                setMergedPermissions(updatedPermissions);
                setSelectAllChecked(
                    updatedPermissions.every((entity) =>
                        entity.permissions.every((permission) => permission.isAllowed)
                    )
                );
            };

            mergePermissions();
        }
    }, [permissionsByEntity]);


    const handleSelectAllChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        const updatedPermissions = mergedPermissions.map((entity) => ({
            ...entity,
            permissions: entity.permissions.map((permission) => ({
                ...permission,
                isAllowed: isChecked,
            })),
        }));

        setMergedPermissions(updatedPermissions);
        setSelectAllChecked(isChecked);
    };


    const handlePermissionChange = (entityType: string, action: string, isChecked: boolean) => {
        const updatedPermissions = mergedPermissions.map((entity) =>
            entity.entityType === entityType
                ? {
                    ...entity,
                    permissions: entity.permissions.map((permission) =>
                        permission.action === action
                            ? { ...permission, isAllowed: isChecked }
                            : permission
                    ),
                }
                : entity
        );

        setMergedPermissions(updatedPermissions);
        setSelectAllChecked(
            updatedPermissions.every((entity) =>
                entity.permissions.every((permission) => permission.isAllowed)
            )
        );
    };


    useEffect(() => {
        if (calledItem) {
            updatePermissions(mergedPermissions);
            onProcessComplete();
        }
    }, [calledItem, mergedPermissions, updatePermissions, onProcessComplete]);

    return (
        <div className="invenShopfy-role-list border-b border-solid border-border flex items-center h-[150px]">
            <div className="invenShopfy-role-left flex items-center">
                <div className="invenShopfy-role-topic">
                    <h5 className="text-[18px] font-semibold text-heading mb-4">Warehouse</h5>
                    <div className="invenShopfy-checkbox-style ms-3">
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
            <div className="invenShopfy-role-right w-full border-s border-solid border-border">
                {mergedPermissions.map((entity) => (
                    <div
                        key={entity.entityType}
                        className="invenShopfy-role-category-list h-[150px] flex items-center border-b border-solid border-border"
                    >
                        <div className="invenShopfy-role-category">
                            <h5>{entity.entityType}</h5>
                        </div>
                        <div className="invenShopfy-role-checkbox-wrapper">
                            {entity.permissions.map((permission) => (
                                <div key={permission.action} className="invenShopfy-checkbox-style">
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={permission.isAllowed}
                                                onChange={(e) =>
                                                    handlePermissionChange(
                                                        entity.entityType,
                                                        permission.action,
                                                        e.target.checked
                                                    )
                                                }
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

export default WarehouseRoleList;
