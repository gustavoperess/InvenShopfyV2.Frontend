import AddSupplier from '@/components/people/addsupplier/AddSupplier';
import BreadCrumb from '@/components/sharedComponents/BreadCrumb';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const page = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <BreadCrumb title='Add Supplier' subTitleOne='People' subTitleTwo='Add Supplier' />
                    <AddSupplier />
                </main>
            </Wrapper>
        </>
    );
};

export default page;