import BreadCrumb from '@/components/sharedComponents/BreadCrumb';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';
import DiscountReport from '@/components/report/discountreport/DiscountReport';

const page = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <BreadCrumb title='Discount Report' subTitleOne='Report' subTitleTwo='Discount Report' />
                    <DiscountReport />
                </main>
            </Wrapper>
        </>
    );
};

export default page;  