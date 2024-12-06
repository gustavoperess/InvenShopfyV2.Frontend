import BreadCrumb from '@/components/sharedComponents/BreadCrumb';
import CreateRoleList from '@/components/management/createrole/CreateRoleList';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const page = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <BreadCrumb title='Create Role' subTitleOne='Employee Management' subTitleTwo='Create Role'/>
                    <CreateRoleList/>   
                </main>
            </Wrapper>
        </>
    );
};

export default page;


