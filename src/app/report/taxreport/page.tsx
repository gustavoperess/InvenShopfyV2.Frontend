import BreadCrumb from '@/components/sharedComponents/BreadCrumb';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';
import TaxReport from '@/components/report/taxreport/TaxReport';

const page = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <BreadCrumb title='Tax Report' subTitleOne='Report' subTitleTwo='Tax Report' />
                    <TaxReport/>
                </main>
            </Wrapper>
        </>
    );
};

export default page;  