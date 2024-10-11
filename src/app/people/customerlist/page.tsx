import AddCustomer from '@/components/people/addcustomer/AddCustomer';import CustomerList from '@/components/people/customerlist/CustomerList';
;
import BreadCrumb from '@/components/sharedComponents/BreadCrumb';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const page = () => {
    return (
        <>
        <Wrapper>
            <main>
                <BreadCrumb title='Customer List' subTitleOne='People' subTitleTwo='Customer List' />
                <CustomerList/>
            </main>
        </Wrapper>
    </>
 
    );
};

export default page;