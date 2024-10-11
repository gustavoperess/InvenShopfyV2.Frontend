import BreadCrumb from '@/components/sharedComponents/BreadCrumb';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';
import ExpenseReport from '@/components/report/expensereport/ExpenseReport';

const page = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <BreadCrumb title='Expense Report' subTitleOne='Report' subTitleTwo='Expense Report' />
                    <ExpenseReport />
                </main>
            </Wrapper>
        </>
    );
};

export default page;  