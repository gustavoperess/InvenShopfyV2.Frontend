import BreadCrumb from '@/components/sharedComponents/BreadCrumb';
import UserList from '@/components/usermanagement/userlist/UserList';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const page = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <BreadCrumb title='User List' subTitleOne='User Management' subTitleTwo='User List'/>
                    <UserList/>
                </main>
            </Wrapper>
        </>
    );
};

export default page;


