"use client"
import React, { useState, useEffect } from 'react';
import ProductRoleList from './rolepermissionList/ProductRoleList';
import TradingRoleList from './rolepermissionList/TradingRoleList';
import ExpenseRoleList from './rolepermissionList/ExpenseRoleList';
import WarehouseRoleList from './rolepermissionList/WarehouseRoleList';
import PeopleRoleList from './rolepermissionList/PeopleRoleList';
import ReportRoleList from './rolepermissionList/ReportRoleList';
import SettingsRoleList from './rolepermissionList/SettingsRoleList';
import { MenuItem, TextField } from '@mui/material';
import { TRoleInterface, EntityPermissions } from '@/interFace/interFace';
import { useGetRoleByNameQuery, useGetAllRolesQuery } from '@/services/Role/Role';



const RolePermissionList = () => {
    const [roleName, setRoleName] = useState<string>("");
    const { data: roleNameData } = useGetAllRolesQuery();
    const [updatedPermissions, setUpdatedPermissions] = useState<Record<string, EntityPermissions[]>>({});
    const [callingItem, setCallingItem] = useState(false);
    const { data: roleNameDataWithDetails } = useGetRoleByNameQuery(roleName, { skip: !roleName });

    const handleSetRoleName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRoleName(event.target.value);
        setUpdatedPermissions({});
    };
    const handRolePermissionFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setCallingItem(true);
   
    };
    const handleUpdatePermissions = (entityType: string, permissions: EntityPermissions[]) => {
        setUpdatedPermissions((prev) => ({
            ...prev,
            [entityType]: permissions,
        }));
    };

    console.log(updatedPermissions) 

    return (
        <>
            <div className="inventual-content-area px-4 sm:px-7">
                <div className="inventual-managesale-area bg-white p-5 sm:p-7 custom-shadow rounded-8 mb-5">
                    <form onSubmit={handRolePermissionFormSubmit}>
                        <div className="inventual-form-field mb-7">
                            <h5>Search by role name</h5>
                            <div className="inventual-input-field-style flex gap-5 items-center">
                                <div className="inventual-select-field-style " style={{ flexBasis: '350px', flexShrink: 1 }}>
                                    <TextField
                                        select
                                        label="Select"
                                        required
                                        value={roleName}
                                        onChange={handleSetRoleName}
                                        SelectProps={{
                                            displayEmpty: true,
                                            renderValue: (value: any) => {
                                                const selectRole = roleNameData?.find((role: TRoleInterface) => role.roleName === value);
                                                return selectRole ? selectRole.roleName : <em>Select Role</em>;
                                            },
                                        }}>
                                        {roleNameData && roleNameData.length > 0 ? (
                                            roleNameData.map((role: TRoleInterface) => (
                                                <MenuItem key={role.id} value={role.roleName}>
                                                    {role.roleName}
                                                </MenuItem>
                                            ))
                                        ) : (
                                            <MenuItem value="">
                                                <em>No Roles Available</em>
                                            </MenuItem>
                                        )}
                                    </TextField>
                                </div>
                                <button className='inventual-btn primary-btn whitespace-nowrap'>Assign Permissions</button>
                            </div>
                        </div>
                        <div className="inventual-role-area">
                            <div className="inventual-role-inner">
                                <div className="inventual-role-inner-wrapper border border-solid border-border border-b-0 mb-7">
                                    {roleNameDataWithDetails != undefined ? (
                                        <>
                                            <ProductRoleList
                                                permissionsByEntity={roleNameDataWithDetails?.flatMap((role: TRoleInterface) => role.permissionsByEntity)
                                                    ?.filter((entity: EntityPermissions) =>
                                                        ['Product', 'ProductBrand', 'ProductCategory', 'ProductUnit'].includes(entity.entityType)
                                                    ) || []}
                                                calledItem={callingItem} 
                                                onProcessComplete={() => setCallingItem(false)} 
                                                updatePermissions={(permissions) => handleUpdatePermissions('Product', permissions)}

                                            />
                                            <TradingRoleList
                                                permissionsByEntity={roleNameDataWithDetails?.flatMap((role: TRoleInterface) => role.permissionsByEntity)
                                                    ?.filter((entity: EntityPermissions) =>
                                                        ['Sales', 'PosSales', 'SalesReturn', 'SalesPayment', 'Purchase', 'PurchaseReturn'].includes(entity.entityType)
                                                    ) || []}
                                                calledItem={callingItem} 
                                                onProcessComplete={() => setCallingItem(false)} 
                                                updatePermissions={(permissions) => handleUpdatePermissions('Trading', permissions)}
                                            />
                                            <ExpenseRoleList
                                                permissionsByEntity={roleNameDataWithDetails?.flatMap((role: TRoleInterface) => role.permissionsByEntity)
                                                    ?.filter((entity: EntityPermissions) =>
                                                        ['Expense', 'ExpenseCategory', 'ExpensePayment'].includes(entity.entityType)
                                                    ) || []}
                                            />
                                            <WarehouseRoleList
                                                permissionsByEntity={roleNameDataWithDetails?.flatMap((role: TRoleInterface) => role.permissionsByEntity)
                                                    ?.filter((entity: EntityPermissions) =>
                                                        ['Warehouse'].includes(entity.entityType)
                                                    ) || []}
                                            />
                                            <PeopleRoleList
                                                permissionsByEntity={roleNameDataWithDetails?.flatMap((role: TRoleInterface) => role.permissionsByEntity)
                                                    ?.filter((entity: EntityPermissions) =>
                                                        ['Customer', 'Supplier', 'Biller', 'User'].includes(entity.entityType)
                                                    ) || []}
                                            />
                                            <ReportRoleList
                                                permissionsByEntity={roleNameDataWithDetails?.flatMap((role: TRoleInterface) => role.permissionsByEntity)
                                                    ?.filter((entity: EntityPermissions) =>
                                                        ['Report'].includes(entity.entityType)
                                                    ) || []}
                                            />
                                            <SettingsRoleList />
                                        </>
                                    ) : (
                                        <p>Search for a role in order to display the permissions</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default RolePermissionList;
