import BreadCrumb from '@/components/sharedComponents/BreadCrumb';
import ImportPurchase from '@/components/trading/purchase/importPurchase/ImportPurchase';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const page = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <BreadCrumb title='Import Purchase' subTitleOne='Purchase' subTitleTwo='Import Purchase' />
                    <ImportPurchase />
                </main>
            </Wrapper>
        </>

    );
};

export default page;