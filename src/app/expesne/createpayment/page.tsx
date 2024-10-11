import CreatePayment from '@/components/expesne/createpayment/CreatePayment';
import BreadCrumb from '@/components/sharedComponents/BreadCrumb';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const page = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <BreadCrumb title='Create Payment' subTitleOne='Expense' subTitleTwo='Create Payment' />
                    <CreatePayment />
                </main>
            </Wrapper>
        </>
    );
};

export default page;