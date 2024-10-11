import BreadCrumb from '@/components/sharedComponents/BreadCrumb';
import PurchaseInvoice from '@/components/trading/invoice/purchaseinvoice/PurchaseInvoice';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const page = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <BreadCrumb title='Purchase Invoice' subTitleOne='Trading' subTitleTwo='Invoice' subTitleThree='Purchase Invoice' />
                    <PurchaseInvoice/>
                </main>
            </Wrapper>
        </>
    );
};

export default page;  