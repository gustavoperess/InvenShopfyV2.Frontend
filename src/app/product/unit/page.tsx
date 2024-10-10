import UnitList from '@/components/product/unit/UnitList';
import BreadCrumb from '@/components/sharedComponents/BreadCrumb';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const page = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <BreadCrumb title='Unit/Value' subTitleOne='Product' subTitleTwo='Unit/Value' />
                    <UnitList />
                </main>
            </Wrapper>
        </>
    );
};

export default page;