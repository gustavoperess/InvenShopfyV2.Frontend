import ImportSupplier from '@/components/people/importSupplier/ImportSupplier';
import BreadCrumb from '@/components/sharedComponents/BreadCrumb';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const page = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <BreadCrumb title='Import Supplier' subTitleOne='People' subTitleTwo='Import Supplier' />
                    <ImportSupplier />
                </main>
            </Wrapper>
        </>

    );
};

export default page;