import BreadCrumb from '@/components/sharedComponents/BreadCrumb';
import AddUserList from '@/components/usermanagement/adduser/AddUserList';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const page = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <BreadCrumb title='Add User' subTitleOne='User Management' subTitleTwo='Add User'/>
                    <AddUserList/>
                </main>
            </Wrapper>
        </>
    );
};

export default page;


