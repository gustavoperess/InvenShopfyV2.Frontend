import BreadCrumb from '@/components/sharedComponents/BreadCrumb';
import ImportPurchase from '@/components/trading/invoice/importPurchaseInvoice/ImportPurchase';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const page = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <BreadCrumb title='Import Purchase Invoice' subTitleOne='Trading' subTitleTwo='Invoice' subTitleThree='Import Purchase Invoice' />
                    <ImportPurchase />
                </main>
            </Wrapper>
        </>
    );
};

export default page;  