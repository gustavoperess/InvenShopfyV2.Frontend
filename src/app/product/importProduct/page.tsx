import ImportProduct from '@/components/product/importProduct/ImportProduct';
import BreadCrumb from '@/components/sharedComponents/BreadCrumb';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const page = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <BreadCrumb title='Import Product' subTitleOne='Product' subTitleTwo='Import Product' />
                    <ImportProduct />
                </main>
            </Wrapper>
        </>

    );
};

export default page;