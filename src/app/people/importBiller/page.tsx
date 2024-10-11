import ImportBiller from '@/components/people/importBiller/ImportBiller';
import BreadCrumb from '@/components/sharedComponents/BreadCrumb';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const page = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <BreadCrumb title='Import Biller' subTitleOne='People' subTitleTwo='Import Biller' />
                    <ImportBiller />
                </main>
            </Wrapper>
        </>

    );
};

export default page;