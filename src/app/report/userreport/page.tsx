import UserReport from '@/components/report/userreport/UserReport';
import BreadCrumb from '@/components/sharedComponents/BreadCrumb';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const page = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <BreadCrumb title='User Report' subTitleOne='Report' subTitleTwo='User Report' />
                    <UserReport/>
                </main>
            </Wrapper>
        </>
    );
};

export default page;  