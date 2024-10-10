import AddExpenseList from '@/components/expesne/addexpense/AddExpenseList';
import BreadCrumb from '@/components/sharedComponents/BreadCrumb';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const page = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <BreadCrumb title='Add Expense' subTitleOne='Expense' subTitleTwo='Add Expense' />
                    <AddExpenseList />
                </main>
            </Wrapper>
        </>
    );
};

export default page;
