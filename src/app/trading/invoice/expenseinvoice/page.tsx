import BreadCrumb from '@/components/sharedComponents/BreadCrumb';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';
import ExpenseInvoice from './../../../../components/trading/invoice/expenseinvoice/ExpenseInvoice';

const page = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <BreadCrumb title='Expense Invoice' subTitleOne='Trading' subTitleTwo='Invoice' subTitleThree='Expense Invoice' />
                    <ExpenseInvoice/>
                </main>
            </Wrapper>
        </>
    );
};

export default page;  