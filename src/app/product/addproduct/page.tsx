import AddProduct from '@/components/product/addproduct/AddProduct';
import BreadCrumb from '@/components/sharedComponents/BreadCrumb';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const page = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <BreadCrumb title='Add Products' subTitleOne='Product' subTitleTwo='Add Products' />
                    <AddProduct />
                </main>
            </Wrapper>
        </>

    );
};

export default page;