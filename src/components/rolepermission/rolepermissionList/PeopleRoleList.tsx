import React, { useState, useEffect, useRef } from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';

const DEFAULT_PEOPLE_PERMISSIONS = [
    { entityType: 'Customer', permissions: [{ action: 'View', isAllowed: false }, { action: 'Add', isAllowed: false }, { action: 'Update', isAllowed: false }, { action: 'Delete', isAllowed: false }] },
    { entityType: 'Supplier', permissions: [{ action: 'View', isAllowed: false }, { action: 'Add', isAllowed: false }, { action: 'Update', isAllowed: false }, { action: 'Delete', isAllowed: false }] },
    { entityType: 'Biller', permissions: [{ action: 'View', isAllowed: false }, { action: 'Add', isAllowed: false }, { action: 'Update', isAllowed: false }, { action: 'Delete', isAllowed: false }] },
    { entityType: 'User', permissions: [{ action: 'View', isAllowed: false }, { action: 'Add', isAllowed: false }, { action: 'Update', isAllowed: false }, { action: 'Delete', isAllowed: false }] },
];


const PeopleRoleList = ({ permissionsByEntity }: { permissionsByEntity: any[] }) => {
    const [mergedPermissions, setMergedPermissions] = useState(DEFAULT_PEOPLE_PERMISSIONS);
    const [selectAllChecked, setSelectAllChecked] = useState(false);

    useEffect(() => {
        const mergePermissions = () => {
            const updatedPermissions = DEFAULT_PEOPLE_PERMISSIONS.map((defaultEntity) => {
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

    return (
        <div className="inventual-role-list border-b border-solid border-border flex items-center">
            <div className="inventual-role-left">
                <div className="inventual-role-topic">
                    <h5 className="text-[18px] font-semibold text-heading mb-4">People</h5>
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
                {mergedPermissions.map((entity) => (
                    <div
                        key={entity.entityType}
                        className="inventual-role-category-list custom-height-70 flex items-center border-b border-solid border-border"
                    >
                        <div className="inventual-role-category">
                            <h5>{entity.entityType}</h5>
                        </div>
                        <div className="inventual-role-checkbox-wrapper">
                            {entity.permissions.map((permission) => (
                                <div key={permission.action} className="inventual-checkbox-style">
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

export default PeopleRoleList;