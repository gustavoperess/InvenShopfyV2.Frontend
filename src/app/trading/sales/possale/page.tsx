import BreadCrumb from '@/components/sharedComponents/BreadCrumb';
import PosSaleMain from '@/components/trading/sales/possale/PosSaleMain';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const page = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <BreadCrumb title='Trading' subTitleOne='Trading' subTitleTwo='Sale' subTitleThree='POS Sale' />
                    <PosSaleMain />
                </main>
            </Wrapper>
        </>
    );
};

export default page;  