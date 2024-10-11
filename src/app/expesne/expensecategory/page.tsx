import React from 'react';
import BreadCrumb from '@/components/sharedComponents/BreadCrumb';
import Wrapper from '@/layout/DefaultWrapper';
import ExpenseCategory from './../../../components/expesne/expensecategory/ExpenseCategory';

const page = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <BreadCrumb title='Expense Category' subTitleOne='Expense' subTitleTwo='Category' />
                    <ExpenseCategory />
                </main>
            </Wrapper>
        </>
    );
};

export default page;