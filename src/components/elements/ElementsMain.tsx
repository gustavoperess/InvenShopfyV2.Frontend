import React from 'react';
import FormElements from './FormElements';
import CalenderElements from './CalenderElements';
import SmallDefaultTable from './tables/SmallDefaultTable';
import SelectElements from './SelectElements';
import MaterialTableWithCheck from './tables/MaterialTableWithCheck';
import BadgeElements from './BadgeElements';
import CheckboxElement from './CheckboxElement';
import PopupElements from './PopupElements';
import TabElements from './TabElements';
import ButtonElement from './ButtonElement';
import ActionButtonElement from './ActionButtonElement';
import RadioElements from './RadioElements';

const ElementsMain = () => {
    return (
        <>
            <ButtonElement />
            <ActionButtonElement />
            <BadgeElements />
            <PopupElements />
            <TabElements />
            <CheckboxElement />
            <FormElements />
            <SelectElements />
            <CalenderElements />
            <RadioElements />
            <SmallDefaultTable />
            <MaterialTableWithCheck />
        </>
    );
};

export default ElementsMain;