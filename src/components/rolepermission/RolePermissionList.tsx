"use client"
import React from 'react';
import ProductRoleList from './rolepermissionList/ProductRoleList';
import TradingRoleList from './rolepermissionList/TradingRoleList';
import ExpenseRoleList from './rolepermissionList/ExpenseRoleList';
import WarehouseRoleList from './rolepermissionList/WarehouseRoleList';
import PeopleRoleList from './rolepermissionList/PeopleRoleList';
import ReportRoleList from './rolepermissionList/ReportRoleList';
import SettingsRoleList from './rolepermissionList/SettingsRoleList';

const RolePermissionList = () => {

    return (

        <>
            <div className="inventual-content-area px-4 sm:px-7">
                <div className="inventual-managesale-area bg-white p-5 sm:p-7 custom-shadow rounded-8 mb-5">
                    <div className="grid grid-cols-12">
                        <div className="col-span-12 md:col-span-5">
                            <div className="inventual-form-field mb-7">
                                <h5>Role</h5>
                                <div className="inventual-input-field-style flex gap-5 items-center">
                                    <input type="text" placeholder='Role' />
                                    <button className='inventual-btn primary-btn whitespace-nowrap'>Create Role</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="inventual-role-area">
                        <div className="inventual-role-inner">
                            <div className="inventual-role-inner-wrapper border border-solid border-border border-b-0 mb-7">
                                <ProductRoleList />
                                <TradingRoleList />
                                <ExpenseRoleList />
                                <WarehouseRoleList />
                                <PeopleRoleList />
                                <ReportRoleList />
                                <SettingsRoleList />
                            </div>
                        </div >
                    </div >
                </div >
            </div >
        </>

    );
}

export default RolePermissionList