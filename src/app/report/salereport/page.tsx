import SaleReport from '@/components/report/salereport/SaleReport';
import BreadCrumb from '@/components/sharedComponents/BreadCrumb';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const page = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <BreadCrumb title='Sale Report' subTitleOne='Report' subTitleTwo='Sale Report' />
                    <SaleReport/>
                </main>
            </Wrapper>
        </>
    );
};

export default page;  