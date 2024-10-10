import BreadCrumb from '@/components/sharedComponents/BreadCrumb';
import SaleList from '@/components/trading/sales/salelist/SaleList';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const page = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <BreadCrumb title='Sale List' subTitleOne='Trading' subTitleTwo='Sale' subTitleThree='Manage Sale' />
                    <SaleList/>
                </main>
            </Wrapper>
        </>
    );
};

export default page;  