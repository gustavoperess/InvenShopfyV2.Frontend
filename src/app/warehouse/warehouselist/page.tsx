import BreadCrumb from '@/components/sharedComponents/BreadCrumb';
import WarehouseList from '@/components/warehouse/warehouselist/WarehouseList';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const page = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <BreadCrumb title='Warehouse List' subTitleOne='Warehouse' subTitleTwo='Warehouse List' />
                    <WarehouseList />
                </main>
            </Wrapper>
        </>
    );
};

export default page;  