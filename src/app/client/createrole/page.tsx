import BreadCrumb from '@/components/sharedComponents/BreadCrumb';
import CreateRoleList from '@/components/usermanagement/createrole/CreateRoleList';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const page = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <BreadCrumb title='Create Role' subTitleOne='User Management' subTitleTwo='Create Role'/>
                    <CreateRoleList/>   
                </main>
            </Wrapper>
        </>
    );
};

export default page;


