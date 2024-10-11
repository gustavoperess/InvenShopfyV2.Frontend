import ProductReport from '@/components/report/productreport/ProductReport';
import BreadCrumb from '@/components/sharedComponents/BreadCrumb';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const page = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <BreadCrumb title='Product Report' subTitleOne='Report' subTitleTwo='Product Report' />
                    <ProductReport />
                </main>
            </Wrapper>
        </>
    );
};

export default page;  