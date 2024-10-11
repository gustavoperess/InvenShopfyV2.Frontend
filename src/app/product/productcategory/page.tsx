import ProductCategory from '@/components/product/productcategory/ProductCategory';
import BreadCrumb from '@/components/sharedComponents/BreadCrumb';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const page = () => {
    return (
        <>
        <Wrapper>
            <main>
                <BreadCrumb title='Category' subTitleOne='Product' subTitleTwo='Category' />
                <ProductCategory />
            </main>
        </Wrapper>
    </>
 
    );
};

export default page;