import BreadCrumb from '@/components/sharedComponents/BreadCrumb';
import ManagePurchaseList from '@/components/trading/purchase/managepurchase/ManagePurchaseList';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const page = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <BreadCrumb title='Purchase List' subTitleOne='Trading' subTitleTwo='Sale' subTitleThree='Manage Purchase' />
                    <ManagePurchaseList/>
                </main>
            </Wrapper>
        </>
    );
};

export default page;  