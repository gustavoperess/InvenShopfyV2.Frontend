"use client"
import React from 'react';
import Wrapper from '@/layout/DefaultWrapper';
import BreadCrumb from '@/components/sharedComponents/BreadCrumb';
import ProfileList from '@/components/profile/ProfileList';

const DashboardPage = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <BreadCrumb title='Profile' subTitleOne='User' subTitleTwo='Profile' />
                    <ProfileList/>
                </main>
            </Wrapper>
        </>
    );
};

export default DashboardPage;