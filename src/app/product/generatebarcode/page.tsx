import GenerateBarcodeList from '@/components/product/generatebarcode/GenerateBarcodeList';
import BreadCrumb from '@/components/sharedComponents/BreadCrumb';
import Wrapper from '@/layout/DefaultWrapper';
import React from 'react';

const page = () => {
    return (
        <div>
            <Wrapper>
                <main>
                    <BreadCrumb title='Generate Barcode' subTitleOne='Products' subTitleTwo='Generate Barcode' />
                    <GenerateBarcodeList/>
                </main>
            </Wrapper>
        </div>
    );
};

export default page;