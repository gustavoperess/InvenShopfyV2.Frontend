import StockReport from '@/components/report/stockreport/StockReport';
import BreadCrumb from '@/components/sharedComponents/BreadCrumb';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const page = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <BreadCrumb title='Stock Report' subTitleOne='Report' subTitleTwo='Stock Report'/>
                    <StockReport/>
                </main>
            </Wrapper>
        </>
    );
};

export default page;  