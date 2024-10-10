import BreadCrumb from '@/components/sharedComponents/BreadCrumb';
import SalesInvoiceList from '@/components/trading/invoice/saleslistinvoice/SalesInvoiceList';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const page = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <BreadCrumb title='Sales List Invoice' subTitleOne='Trading' subTitleTwo='Invoice' subTitleThree='Sales List Invoice' />
                    <SalesInvoiceList/>
                </main>
            </Wrapper>
        </>
    );
};

export default page;  