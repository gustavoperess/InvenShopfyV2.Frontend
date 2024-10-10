import AddBiller from '@/components/people/addbiller/AddBiller';
import BreadCrumb from '@/components/sharedComponents/BreadCrumb';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const page = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <BreadCrumb title='Add Biller / Seller' subTitleOne='People' subTitleTwo='Add Biller / Seller' />
                    <AddBiller />
                </main>
            </Wrapper>
        </>
    );
};

export default page;