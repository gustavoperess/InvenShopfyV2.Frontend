import BreadCrumb from '@/components/sharedComponents/BreadCrumb';
import ImportExpense from '@/components/trading/invoice/importExpenseInvoice/ImportExpense';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const page = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <BreadCrumb title='Import Expense Invoice' subTitleOne='Trading' subTitleTwo='Invoice' subTitleThree='Import Expense Invoice' />
                    <ImportExpense />
                </main>
            </Wrapper>
        </>
    );
};

export default page;  