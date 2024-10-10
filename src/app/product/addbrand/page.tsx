import AddBrandList from '@/components/product/addbrand/AddBrandList';
import BreadCrumb from '@/components/sharedComponents/BreadCrumb';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const page = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <BreadCrumb title='Add Brand' subTitleOne='Product' subTitleTwo='Add Brand' />
                    <AddBrandList/>
                </main>
            </Wrapper>
        </>

    );
};

export default page;