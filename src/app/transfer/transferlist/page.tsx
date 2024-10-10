import BreadCrumb from '@/components/sharedComponents/BreadCrumb';
import TransferList from '@/components/transfer/transferlist/TransferList';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const page = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <BreadCrumb title='Transfer List' subTitleOne='Transfer' subTitleTwo='Transfer List' />
                    <TransferList />
                </main>
            </Wrapper>
        </>
    );
};

export default page;  