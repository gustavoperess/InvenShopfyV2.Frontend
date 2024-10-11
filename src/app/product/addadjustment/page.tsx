
import AddAdjustmentList from '@/components/product/addadjustment/AddAdjustmentList';
import BreadCrumb from '@/components/sharedComponents/BreadCrumb';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const page = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <BreadCrumb title='Add Adjustment' subTitleOne='Product' subTitleTwo='Add Adjustment' />
                    <AddAdjustmentList/>
                </main>
            </Wrapper>
        </>

    );
};

export default page;