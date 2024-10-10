"use client"
import React from 'react';
import Wrapper from '@/layout/DefaultWrapper';
import BreadCrumb from '@/components/sharedComponents/BreadCrumb';
import MessageList from '@/components/message/MessageList';

const DashboardPage = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <BreadCrumb title='Message' subTitleOne='Admin User' subTitleTwo='Message' />
                    <MessageList />
                </main>
            </Wrapper>
        </>
    );
};

export default DashboardPage;