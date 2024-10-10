import ElementsMain from '@/components/elements/ElementsMain';
import BreadCrumb from '@/components/sharedComponents/BreadCrumb';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const ElementsPage = () => {
    return (
        <Wrapper>
            <main>
                <BreadCrumb title='Elements' subTitleOne='Elements' />
                <div className="inventual-content-area px-4 sm:px-7">
                    <ElementsMain />
                </div>
            </main>
        </Wrapper>
    );
};

export default ElementsPage;    