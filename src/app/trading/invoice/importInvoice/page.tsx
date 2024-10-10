import BreadCrumb from '@/components/sharedComponents/BreadCrumb';
import ImportSale from '@/components/trading/invoice/importSaleInvoice/ImportSale';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const page = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <BreadCrumb title='Import Sale Invoice' subTitleOne='Trading' subTitleTwo='Invoice' subTitleThree='Import Sale Invoice' />
                    <ImportSale />
                </main>
            </Wrapper>
        </>
    );
};

export default page;  