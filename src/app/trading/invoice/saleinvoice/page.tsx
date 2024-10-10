import BreadCrumb from '@/components/sharedComponents/BreadCrumb';
import SaleInvoiceList from '@/components/trading/invoice/saleinvoice/SaleInvoiceList';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const page = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <BreadCrumb title='Sale Invoice' subTitleOne='Trading' subTitleTwo='Invoice' subTitleThree='Sale Invoice' />
                    <SaleInvoiceList />
                </main>
            </Wrapper>
        </>
    );
};

export default page;  