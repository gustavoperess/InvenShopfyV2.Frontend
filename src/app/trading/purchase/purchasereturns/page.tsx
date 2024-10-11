import BreadCrumb from '@/components/sharedComponents/BreadCrumb';
import PurchaseReturnsList from '@/components/trading/purchase/purchasereturns/PurchaseReturnsList';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const page = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <BreadCrumb title='Purchase Returns' subTitleOne='Trading' subTitleTwo='Sale' subTitleThree='Purchase Returns' />
                    <PurchaseReturnsList/>
                </main>
            </Wrapper>
        </>
    );
};

export default page;  