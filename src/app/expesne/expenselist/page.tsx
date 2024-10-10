import ExpenseList from '@/components/expesne/expenselist/ExpenseList';
import BreadCrumb from '@/components/sharedComponents/BreadCrumb';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const page = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <BreadCrumb title='Expense List' subTitleOne='Sale' subTitleTwo='Expense List' />
                    <ExpenseList/>
                </main>
            </Wrapper>
        </>
    );
};

export default page;