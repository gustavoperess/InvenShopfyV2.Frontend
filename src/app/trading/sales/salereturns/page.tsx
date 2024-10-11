import BreadCrumb from '@/components/sharedComponents/BreadCrumb';
import SaleReturnsList from '@/components/trading/sales/salereturns/SaleReturnsList';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const page = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <BreadCrumb title='Sale Returns' subTitleOne='Trading' subTitleTwo='Sale' subTitleThree='Sale Returns' />
                    <SaleReturnsList/>
                </main>
            </Wrapper>
        </>
    );
};

export default page;  