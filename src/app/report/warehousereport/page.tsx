import WarehouseReport from '@/components/report/warehousereport/WarehouseReport';
import BreadCrumb from '@/components/sharedComponents/BreadCrumb';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const page = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <BreadCrumb title='Warehouse Report' subTitleOne='Report' subTitleTwo='Warehouse Report' />
                    <WarehouseReport/>
                </main>
            </Wrapper>
        </>
    );
};

export default page;  