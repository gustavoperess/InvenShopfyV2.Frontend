import BreadCrumb from '@/components/sharedComponents/BreadCrumb';
import AddTransfer from '@/components/transfer/addtransfer/AddTransfer';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const page = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <BreadCrumb title='Add Transfer' subTitleOne='Transfer' subTitleTwo='Add Transfer' />
                    <AddTransfer />
                </main>
            </Wrapper>
        </>
    );
};

export default page;  