"use client";
import React, { useState } from 'react';
import ProductRoleList from './rolepermissionList/ProductRoleList';
import TradingRoleList from './rolepermissionList/TradingRoleList';
import ExpenseRoleList from './rolepermissionList/ExpenseRoleList';
import WarehouseRoleList from './rolepermissionList/WarehouseRoleList';
import PeopleRoleList from './rolepermissionList/PeopleRoleList';
import ReportRoleList from './rolepermissionList/ReportRoleList';
import TransferRoleList from './rolepermissionList/TransferRoleList';
import RoleList from './rolepermissionList/RoleList';
import SettingsRoleList from './rolepermissionList/SettingsRoleList';
import { MenuItem, TextField } from '@mui/material';
import { TRoleInterface, EntityPermissions } from '@/interFace/interFace';
import { useGetRoleByNameQuery, useGetAllRolesQuery } from '@/services/Role/Role';
import { useAssignPermissionsToRoleMutation } from '@/services/Role/Role';
import { toast } from 'react-toastify';

const RolePermissionList = () => {
    const [roleName, setRoleName] = useState<string>("");
    const { data: roleNameData } = useGetAllRolesQuery();
    const [updatedPermissions, setUpdatedPermissions] = useState<Record<string, EntityPermissions[]>>({});
    const [callingItem, setCallingItem] = useState(false);
    const { data: roleNameDataWithDetails, refetch } = useGetRoleByNameQuery(roleName, { skip: !roleName });
    const [assingRole] = useAssignPermissionsToRoleMutation();
    const [isReadyToSubmit, setIsReadyToSubmit] = useState(false);

    const handleSetRoleName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRoleName(event.target.value);
        setUpdatedPermissions({});
        setIsReadyToSubmit(false);
    };

    const handleSetUpSubmit = () => {
        if (!roleName) {
            toast.warning("Please select a role before setting up permissions.");
            return;
        }
        setCallingItem(true)
        setIsReadyToSubmit(true);
        toast.info("Permissions are set up and ready for submission.");
    };


    const handleAssignPermissions = async () => {
        const permissionsArray = Object.entries(updatedPermissions).flatMap(([entityType, permissions]) =>
            permissions.flatMap(permissionEntry =>
                permissionEntry.permissions.map(permission => ({
                    entityType: permissionEntry.entityType,
                    action: permission.action,
                    isAllowed: permission.isAllowed,
                }))
            )
        );

        const jsonData = {
            userHasPermission: true,
            roleName: roleName,
            permissions: permissionsArray,
        };

        try {
            await assingRole(jsonData).unwrap();
            toast.success("New permissions will be assigned next time you log in");
            setCallingItem(false)
            setIsReadyToSubmit(false);
            refetch();
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to assign roles. Please try again later.");
        }
    }

    const handleUpdatePermissions = (entityType: string, permissions: EntityPermissions[]) => {
        setUpdatedPermissions((prev) => {
            const updated = {
                ...prev,
                [entityType]: permissions,
            };
            return updated;
        });
    };

    return (
        <div className="invenShopfy-content-area px-4 sm:px-7">
            <div className="invenShopfy-managesale-area bg-white p-5 sm:p-7 custom-shadow rounded-8 mb-5">
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="invenShopfy-form-field mb-7">
                        <h5>Search by role name</h5>
                        <div className="invenShopfy-input-field-style flex gap-5 items-center">
                            <div className="invenShopfy-select-field-style" style={{ flexBasis: '350px', flexShrink: 1 }}>
                                <TextField
                                    select
                                    label="Select"
                                    required
                                    value={roleName}
                                    onChange={handleSetRoleName}
                                    SelectProps={{
                                        displayEmpty: true,
                                        renderValue: (value: any) => {
                                            const selectRole = roleNameData?.data.find((role: TRoleInterface) => role.roleName === value);
                                            return selectRole ? selectRole.roleName : <em>Select Role</em>;
                                        },
                                        MenuProps: {
                                            PaperProps: {
                                                style: {
                                                    maxHeight: '200px',  
                                                    overflowY: 'auto',   
                                                },
                                            },
                                        },
                                    }}>
                                    {roleNameData && roleNameData.data.length > 0 ? (
                                        roleNameData.data.map((role: TRoleInterface) => (
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
                            <button
                                type="button"
                                onClick={handleSetUpSubmit}
                                className="invenShopfy-btn primary-btn whitespace-nowrap">
                                SetUp Permissions
                            </button>
                            <button
                                type="button"
                                onClick={handleAssignPermissions}
                                disabled={!isReadyToSubmit}
                                className={`invenShopfy-btn primary-btn whitespace-nowrap ${!isReadyToSubmit ? 'disabled' : ''}`}>
                                Assign Permissions
                            </button>
                        </div>
                    </div>
                    <div className="invenShopfy-role-area">
                        <div className="invenShopfy-role-inner">
                            <div className="invenShopfy-role-inner-wrapper border border-solid border-border border-b-0 mb-7">
                                {roleNameDataWithDetails ? (
                                    <>
                                        <RoleList
                                            permissionsByEntity={roleNameDataWithDetails?.flatMap((role: TRoleInterface) => role.permissionsByEntity)
                                                ?.filter((entity: EntityPermissions) =>
                                                    ['Roles'].includes(entity.entityType)) || []}
                                            calledItem={callingItem}
                                            setIsReadyToSubmit={isReadyToSubmit}
                                            onProcessComplete={() => { setCallingItem(false) }}
                                            updatePermissions={permissions => handleUpdatePermissions('Roles', permissions)}
                                        />
                                        <TransferRoleList
                                            permissionsByEntity={roleNameDataWithDetails?.flatMap((role: TRoleInterface) => role.permissionsByEntity)
                                                ?.filter((entity: EntityPermissions) =>
                                                    ['Transfers'].includes(entity.entityType)) || []}
                                            calledItem={callingItem}
                                            setIsReadyToSubmit={isReadyToSubmit}
                                            onProcessComplete={() => { setCallingItem(false) }}
                                            updatePermissions={permissions => handleUpdatePermissions('Transfers', permissions)}
                                        />
                                        <ReportRoleList
                                            permissionsByEntity={roleNameDataWithDetails?.flatMap((role: TRoleInterface) => role.permissionsByEntity)
                                                ?.filter((entity: EntityPermissions) =>
                                                    ['Report'].includes(entity.entityType)
                                                ) || []}
                                            calledItem={callingItem}
                                            setIsReadyToSubmit={isReadyToSubmit}
                                            onProcessComplete={() => setCallingItem(false)}
                                            updatePermissions={(permissions) => handleUpdatePermissions('Report', permissions)}
                                        />
                                        <ProductRoleList
                                            permissionsByEntity={roleNameDataWithDetails?.flatMap((role: TRoleInterface) => role.permissionsByEntity)
                                                ?.filter((entity: EntityPermissions) =>
                                                    ['Product', 'ProductBrand', 'ProductCategory', 'ProductUnit'].includes(entity.entityType)) || []}
                                            calledItem={callingItem}
                                            setIsReadyToSubmit={isReadyToSubmit}
                                            onProcessComplete={() => { setCallingItem(false) }}
                                            updatePermissions={permissions => handleUpdatePermissions('Product', permissions)}
                                        />
                                        <TradingRoleList
                                            permissionsByEntity={roleNameDataWithDetails?.flatMap((role: TRoleInterface) => role.permissionsByEntity)
                                                ?.filter((entity: EntityPermissions) =>
                                                    ['Sales', 'PosSales', 'SalesReturn', 'SalesPayment', 'Purchase', 'PurchaseReturn'].includes(entity.entityType)
                                                ) || []}
                                            calledItem={callingItem}
                                            setIsReadyToSubmit={isReadyToSubmit}
                                            onProcessComplete={() => setCallingItem(false)}
                                            updatePermissions={(permissions) => handleUpdatePermissions('Trading', permissions)}
                                        />
                                        <ExpenseRoleList
                                            permissionsByEntity={roleNameDataWithDetails?.flatMap((role: TRoleInterface) => role.permissionsByEntity)
                                                ?.filter((entity: EntityPermissions) =>
                                                    ['Expense', 'ExpenseCategory', 'ExpensePayment'].includes(entity.entityType)
                                                ) || []}
                                            calledItem={callingItem}
                                            setIsReadyToSubmit={isReadyToSubmit}
                                            onProcessComplete={() => setCallingItem(false)}
                                            updatePermissions={(permissions) => handleUpdatePermissions('Expense', permissions)}
                                        />
                                        <WarehouseRoleList
                                            permissionsByEntity={roleNameDataWithDetails?.flatMap((role: TRoleInterface) => role.permissionsByEntity)
                                                ?.filter((entity: EntityPermissions) =>
                                                    ['Warehouse'].includes(entity.entityType)
                                                ) || []}
                                            calledItem={callingItem}
                                            setIsReadyToSubmit={isReadyToSubmit}
                                            onProcessComplete={() => setCallingItem(false)}
                                            updatePermissions={(permissions) => handleUpdatePermissions('Warehouse', permissions)}
                                        />
                                        <PeopleRoleList
                                            permissionsByEntity={roleNameDataWithDetails?.flatMap((role: TRoleInterface) => role.permissionsByEntity)
                                                ?.filter((entity: EntityPermissions) =>
                                                    ['Customer', 'Supplier', 'Biller', 'User'].includes(entity.entityType)
                                                ) || []}
                                            calledItem={callingItem}
                                            setIsReadyToSubmit={isReadyToSubmit}
                                            onProcessComplete={() => setCallingItem(false)}
                                            updatePermissions={(permissions) => handleUpdatePermissions('People', permissions)}
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
    );
};

export default RolePermissionList;
