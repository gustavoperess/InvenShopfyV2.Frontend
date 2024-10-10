import BreadCrumb from '@/components/sharedComponents/BreadCrumb';
import PurchaseListInvoice from '@/components/trading/invoice/purchaselistinvoice/PurchaseListInvoice';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const page = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <BreadCrumb title='Purchase List Invoice' subTitleOne='Trading' subTitleTwo='Invoice' subTitleThree='Purchase List Invoice' />
                    <PurchaseListInvoice/>
                </main>
            </Wrapper>
        </>
    );
};

export default page;  