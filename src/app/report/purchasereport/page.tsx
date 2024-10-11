import PurchaseReport from '@/components/report/purchasereport/PurchaseReport';
import BreadCrumb from '@/components/sharedComponents/BreadCrumb';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const page = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <BreadCrumb title='Purchase Report' subTitleOne='Report' subTitleTwo='Purchase Report' />
                    <PurchaseReport/>
                </main>
            </Wrapper>
        </>
    );
};

export default page;  