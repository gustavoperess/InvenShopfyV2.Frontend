"use client"

import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <div>
                    <div>{children}</div>
                </div>
            )}
        </div>
    );
}
function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const TabElements = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div className="inventual-common-card mb-5">
            <div className='inventual-common-tab-menus'>
                <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons allowScrollButtonsMobile aria-label="basic tabs example">
                    <Tab label="Sale" {...a11yProps(0)} />
                    <Tab label="Purchase" {...a11yProps(1)} />
                    <Tab label="Payment" {...a11yProps(2)} />
                    <Tab label="Returns" {...a11yProps(3)} />
                    <Tab label="Quotation" {...a11yProps(4)} />
                </Tabs>
            </div>
            <CustomTabPanel value={value} index={0}>
                Item One
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                Item Two
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                Item Three
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
                Item Four
            </CustomTabPanel>
            <CustomTabPanel value={value} index={4}>
                Item Five
            </CustomTabPanel>
        </div>
    );
}

export default TabElements;