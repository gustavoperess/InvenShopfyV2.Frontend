import BreadCrumb from '@/components/sharedComponents/BreadCrumb';
import ImportTransfer from '@/components/transfer/importTransfer/ImportTransfer';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const page = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <BreadCrumb title='Import Transfer' subTitleOne='Transfer' subTitleTwo='Import Transfer' />
                    <ImportTransfer />
                </main>
            </Wrapper>
        </>

    );
};

export default page;