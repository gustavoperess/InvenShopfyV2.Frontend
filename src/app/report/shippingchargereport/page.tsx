import ShippingChargeReport from '@/components/report/shippingchargereport/ShippingChargeReport';
import BreadCrumb from '@/components/sharedComponents/BreadCrumb';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const page = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <BreadCrumb title='Shipping Charge Report' subTitleOne='Report' subTitleTwo='Shipping Charge Report' />
                    <ShippingChargeReport />
                </main>
            </Wrapper>
        </>
    );
};

export default page;  