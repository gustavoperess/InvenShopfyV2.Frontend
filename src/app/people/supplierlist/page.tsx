import SupplierList from '@/components/people/supplierlist/SupplierList';
import BreadCrumb from '@/components/sharedComponents/BreadCrumb';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const page = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <BreadCrumb title='Supplier List' subTitleOne='People' subTitleTwo='Supplier List' />
                    <SupplierList />
                </main>
            </Wrapper>
        </>

    );
};

export default page;