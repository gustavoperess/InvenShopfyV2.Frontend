import BreadCrumb from '@/components/sharedComponents/BreadCrumb';
import ExpenseListInvoice from '@/components/trading/invoice/expenselistinvoice/ExpenseListInvoice';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const page = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <BreadCrumb title='Expense List Invoice' subTitleOne='Trading' subTitleTwo='Invoice' subTitleThree='Expense List Invoice' />
                    <ExpenseListInvoice />
                </main>
            </Wrapper>
        </>
    );
};

export default page;  