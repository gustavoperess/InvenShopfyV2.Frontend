import BillerList from '@/components/people/billerlist/BillerList';
import BreadCrumb from '@/components/sharedComponents/BreadCrumb';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const page = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <BreadCrumb title='Biller List' subTitleOne='People' subTitleTwo='Biller List' />
                    <BillerList/>
                </main>
            </Wrapper>
        </>
    );
};

export default page; 