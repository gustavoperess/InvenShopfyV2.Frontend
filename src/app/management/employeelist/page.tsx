import BreadCrumb from '@/components/sharedComponents/BreadCrumb';
import EmployeeList from '@/components/management/employeeList/EmployeeList';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const page = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <BreadCrumb title='Employee List' subTitleOne='Employee Management' subTitleTwo='Employee List'/>
                    <EmployeeList/>
                </main>
            </Wrapper>
        </>
    );
};

export default page;


