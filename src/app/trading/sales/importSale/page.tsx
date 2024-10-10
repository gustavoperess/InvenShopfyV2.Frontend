import BreadCrumb from '@/components/sharedComponents/BreadCrumb';
import ImportSale from '@/components/trading/sales/importSale/ImportSale';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const page = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <BreadCrumb title='Import Sale' subTitleOne='Sale' subTitleTwo='Import Sale' />
                    <ImportSale />
                </main>
            </Wrapper>
        </>

    );
};

export default page;