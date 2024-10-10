import AdjustmentLIst from '@/components/product/adjustment/AdjustmentLIst';
import BreadCrumb from '@/components/sharedComponents/BreadCrumb';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const page = () => {
    return (
        <div>
            <Wrapper>
                <main>
                    <BreadCrumb title='Adjustment' subTitleOne='Product' subTitleTwo='Adjustment' />
                    <AdjustmentLIst/>
                </main>
            </Wrapper>
        </div>
    );
};

export default page;