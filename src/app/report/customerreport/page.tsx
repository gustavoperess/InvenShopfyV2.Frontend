import CustomerReport from '@/components/report/customerreport/CustomerReport';
import BreadCrumb from '@/components/sharedComponents/BreadCrumb';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const page = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <BreadCrumb title='Customer Report' subTitleOne='Report' subTitleTwo='Customer Report'/>
                    <CustomerReport/>
                </main>
            </Wrapper>
        </>
    );
};

export default page;  