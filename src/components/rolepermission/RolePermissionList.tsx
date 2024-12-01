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
    const [permissionsByEntity, setPermissionsByEntity] = useState<EntityPermissions[]>([]);
    const [fetchSuggestions, setFetchSuggestions] = useState(true);
    const [suggestions, setSuggestions] = useState<TRoleInterface[]>([]);
    const { data: roleNameData } = useGetAllRolesQuery();
    const { data: roleNameDataWithDetails } = useGetRoleByNameQuery(roleName, { skip: !roleName });

    console.log(roleNameDataWithDetails, roleName);

    const handleSuggestionSelect = (suggestion: TRoleInterface) => {
        setRoleName(suggestion.roleName);
        setPermissionsByEntity(suggestion.permissionsByEntity);
        setSuggestions([]);
        setFetchSuggestions(false);
    };

    const handRolePermissionFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

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
                                        onChange={(e) => setRoleName(e.target.value)}
                                        SelectProps={{
                                            displayEmpty: true,
                                            renderValue: (value: any) => {
                                                const selectRole = roleNameData?.find((role: TRoleInterface) => role.id === value);
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
                                    {roleNameDataWithDetails && roleNameDataWithDetails.length > 0 ? (
                                        <>
                                            <ProductRoleList
                                                permissionsByEntity={roleNameDataWithDetails.filter(
                                                    (entity: EntityPermissions) =>
                                                        entity.entityType === 'ProductBrand' ||
                                                        entity.entityType === 'ProductCategory' ||
                                                        entity.entityType === 'ProductUnit' ||
                                                        entity.entityType === 'Product'
                                                )}
                                            />
                                            <TradingRoleList />
                                            <ExpenseRoleList />
                                            <WarehouseRoleList />
                                            <PeopleRoleList />
                                            <ReportRoleList />
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
