import AddCustomer from '@/components/people/addcustomer/AddCustomer';;
import BreadCrumb from '@/components/sharedComponents/BreadCrumb';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const page = () => {
    return (
        <>
        <Wrapper>
            <main>
                <BreadCrumb title='Add Customer' subTitleOne='People' subTitleTwo='Add Customer' />
                <AddCustomer/>
            </main>
        </Wrapper>
    </>
 
    );
};

export default page;