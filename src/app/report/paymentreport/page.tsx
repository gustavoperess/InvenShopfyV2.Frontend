import BreadCrumb from '@/components/sharedComponents/BreadCrumb';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';
import PaymentReport from '@/components/report/paymentreport/PaymentReport';

const page = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <BreadCrumb title='Payment Report' subTitleOne='Report' subTitleTwo='Payment Report' />
                    <PaymentReport />
                </main>
            </Wrapper>
        </>
    );
};

export default page;  