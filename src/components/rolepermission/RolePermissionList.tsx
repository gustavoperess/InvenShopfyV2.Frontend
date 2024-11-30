"use client"
import React, { useState, useEffect } from 'react';
import ProductRoleList from './rolepermissionList/ProductRoleList';
import TradingRoleList from './rolepermissionList/TradingRoleList';
import ExpenseRoleList from './rolepermissionList/ExpenseRoleList';
import WarehouseRoleList from './rolepermissionList/WarehouseRoleList';
import PeopleRoleList from './rolepermissionList/PeopleRoleList';
import ReportRoleList from './rolepermissionList/ReportRoleList';
import SettingsRoleList from './rolepermissionList/SettingsRoleList';
import TextField from '@mui/material/TextField';
import { TRoleInterface,EntityPermissions } from '@/interFace/interFace';
import { useGetRoleByNameQuery } from '@/services/Role/Role';

const RolePermissionList = () => {
    const [roleName, setRoleName] = useState<string>("");  
    const [permissionsByEntity, setPermissionsByEntity] = useState<EntityPermissions[]>([]);
    const [fetchSuggestions, setFetchSuggestions] = useState(true); 
    const [suggestions, setSuggestions] = useState<TRoleInterface[]>([]); 

    // Debounced value for role name input
    const debouncedSearchTerm = useDebounce(roleName, 500);

    // Debounce hook implementation
    function useDebounce(value: string, delay: number) {
        const [debouncedValue, setDebouncedValue] = useState(value);

        useEffect(() => {
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);
            return () => clearTimeout(handler);
        }, [value, delay]);

        return debouncedValue;
    }


    const handleRoleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRoleName(e.target.value);
        setFetchSuggestions(true); 
    };

    
    const { data: roleSuggestionsData, error } = useGetRoleByNameQuery(debouncedSearchTerm, {
        skip: !debouncedSearchTerm.trim().length || !fetchSuggestions, 
    });

    
    useEffect(() => {
        if (roleSuggestionsData) {
            setSuggestions(roleSuggestionsData); 
        }
    }, [roleSuggestionsData]);

  
    const handleSuggestionSelect = (suggestion: TRoleInterface) => {
        setRoleName(suggestion.roleName); 
        setPermissionsByEntity(suggestion.permissionsByEntity)
        setSuggestions([]); 
        setFetchSuggestions(false); 
    };


    const handRolePermissionFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };


    // console.log(permissionsByEntity);

    return (
        <>
            <div className="inventual-content-area px-4 sm:px-7">
                <div className="inventual-managesale-area bg-white p-5 sm:p-7 custom-shadow rounded-8 mb-5">
                    <form onSubmit={handRolePermissionFormSubmit}>
                        <div className="inventual-form-field mb-7">
                            <h5>Search by role name</h5>
                            <div className="inventual-input-field-style flex gap-5 items-center">
                                <div className="inventual-input-field-style search-field" style={{ flexBasis: '500px', flexShrink: 1 }}>
                                    <TextField
                                        fullWidth
                                        placeholder="Admin"
                                        variant="outlined"
                                        value={roleName}
                                        onChange={handleRoleNameChange}
                                    />
                                    {suggestions.length > 0 && (
                                        <div className='search-dropdown dropdown-scroll'>
                                            <ul>
                                                {suggestions.map((role, index) => (
                                                    <li key={`${role.roleName}-${index}`} onClick={() => handleSuggestionSelect(role)}>
                                                        <p className='title'>{role.roleName}</p>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                <button className='inventual-btn primary-btn whitespace-nowrap'>Assign Permissions</button>
                            </div>
                        </div>
                        <div className="inventual-role-area">
                            <div className="inventual-role-inner">
                                <div className="inventual-role-inner-wrapper border border-solid border-border border-b-0 mb-7">
                                    <ProductRoleList permissionsByEntity={
                                        permissionsByEntity.filter(entity => 
                                            entity.entityType === 'ProductBrand' || 
                                            entity.entityType === 'ProductCategory' || 
                                            entity.entityType === 'ProductUnit' || 
                                            entity.entityType === 'Product'
                                          )} />
                                    <TradingRoleList />
                                    <ExpenseRoleList />
                                    <WarehouseRoleList />
                                    <PeopleRoleList />
                                    <ReportRoleList />
                                    <SettingsRoleList />
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
