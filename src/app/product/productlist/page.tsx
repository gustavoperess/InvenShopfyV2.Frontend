import ProductLIst from '@/components/product/productlist/ProductLIst';
import BreadCrumb from '@/components/sharedComponents/BreadCrumb';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const page = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <BreadCrumb title='Product List' subTitleOne='Trading' subTitleTwo='Product' subTitleThree='Product List' />
                    <ProductLIst />
                </main>
            </Wrapper>
        </>

    );
};

export default page;