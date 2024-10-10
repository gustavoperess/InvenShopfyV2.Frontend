import BreadCrumb from '@/components/sharedComponents/BreadCrumb';
import AddWarehouse from '@/components/warehouse/addWarehouse/AddWarehouse';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const page = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <BreadCrumb title='Add Warehouse' subTitleOne='Warehouse' subTitleTwo='Add Warehouse' />
                    <AddWarehouse />
                </main>
            </Wrapper>
        </>
    );
};

export default page;  