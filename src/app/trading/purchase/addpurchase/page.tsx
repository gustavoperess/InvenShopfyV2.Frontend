import BreadCrumb from '@/components/sharedComponents/BreadCrumb';
import AddPurchaseList from '@/components/trading/purchase/addpurchase/AddPurchaseList';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const page = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <BreadCrumb title='Add Purchase' subTitleOne='Trading' subTitleTwo='Purchase' subTitleThree='Add Purchase' />
                    <AddPurchaseList/>
                </main>
            </Wrapper>
        </>
    );
};

export default page;  