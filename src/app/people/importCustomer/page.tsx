import ImportCustomer from '@/components/people/importCustomer/ImportCustomer';
import BreadCrumb from '@/components/sharedComponents/BreadCrumb';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const page = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <BreadCrumb title='Import Customer' subTitleOne='People' subTitleTwo='Import Customer' />
                    <ImportCustomer />
                </main>
            </Wrapper>
        </>

    );
};

export default page;