
import React from 'react';
import Wrapper from '@/layout/DefaultWrapper';
import BreadCrumb from '@/components/sharedComponents/BreadCrumb';
import DashboardMain from '@/components/dashboard/DashboardMain';


const DashboardPage = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <BreadCrumb title='Dashboard' subTitleOne='Dashboard' />
                    <DashboardMain />
                </main>
            </Wrapper>
        </>
    );
};

export default DashboardPage;