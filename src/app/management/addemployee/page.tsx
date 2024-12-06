import BreadCrumb from '@/components/sharedComponents/BreadCrumb';
import AddEmployeeList from '@/components/management/addemployee/addEmployeeList';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const page = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <BreadCrumb title='Add Employee' subTitleOne='Employee Management' subTitleTwo='Add Employee'/>
                    <AddEmployeeList/>
                </main>
            </Wrapper>
        </>
    );
};

export default page;


