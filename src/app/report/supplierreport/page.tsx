import BreadCrumb from '@/components/sharedComponents/BreadCrumb';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';
import SupplierReport from '@/components/report/supplierreport/SupplierReport';

const page = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <BreadCrumb title='Supplier Report' subTitleOne='Report' subTitleTwo='Supplier Report'/>
                    <SupplierReport/>
                </main>
            </Wrapper>
        </>
    );
};

export default page;  