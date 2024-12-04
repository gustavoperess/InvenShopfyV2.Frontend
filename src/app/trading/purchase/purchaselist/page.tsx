import BreadCrumb from '@/components/sharedComponents/BreadCrumb';
import PurchaseList from '@/components/trading/purchase/purchaselist/purchaseList';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const page = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <BreadCrumb title='Purchase List' subTitleOne='Trading' subTitleTwo='Purchase' subTitleThree='Purchase List' />
                    <PurchaseList/>
                </main>
            </Wrapper>
        </>
    );
};

export default page;  