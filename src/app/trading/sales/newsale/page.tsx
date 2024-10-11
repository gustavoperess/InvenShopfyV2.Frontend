import BreadCrumb from '@/components/sharedComponents/BreadCrumb';
import NewSaleList from '@/components/trading/sales/newsale/NewSaleList';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const page = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <BreadCrumb title='Add Sale' subTitleOne='Trading' subTitleTwo='Sale' subTitleThree='Add Sale' />
                    <NewSaleList/>
                </main>
            </Wrapper>
        </>
    );
};

export default page;  