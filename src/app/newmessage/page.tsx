"use client"
import React from 'react';
import Wrapper from '@/layout/DefaultWrapper';
import BreadCrumb from '@/components/sharedComponents/BreadCrumb';
import NewMessage from '@/components/newmessage/NewMessage';

const DashboardPage = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <BreadCrumb title='New Message' subTitleOne='Message' subTitleTwo='New Message' />
                    <NewMessage/>
                </main>
            </Wrapper>
        </>
    );
};

export default DashboardPage;