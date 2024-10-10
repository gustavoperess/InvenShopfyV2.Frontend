import BreadCrumb from '@/components/sharedComponents/BreadCrumb';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';
import RolePermissionList from '@/components/rolepermission/RolePermissionList';

const page = () => {
    return (
        <>
            <Wrapper>
                <main>
                    <BreadCrumb title='Role Permission' subTitleOne='Administrative Tools' subTitleTwo='Settings' subTitleThree='Role Permission' />
                    <RolePermissionList/>
                </main>
            </Wrapper>
        </>
    );
};

export default page;  