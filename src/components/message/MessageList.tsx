"use client"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Link from 'next/link';
import React from 'react';
import IndexTabList from './messagesubtab/messagetablist/IndexTabList';
import SendTabList from './messagesubtab/messagetablist/SendTabList';
import DraftTabList from './messagesubtab/messagetablist/DraftTabList';
import ImportantTabList from './messagesubtab/messagetablist/ImportantTabList';
import TrashTabList from './messagesubtab/messagetablist/TrashTabList';
import { useGetTotalAmountOfInboxMessagesQuery, useGetTotalAmountOfSentMessagesQuery, useGetTotalAmountOfImportantMessagesQuery, useGetTotalAmountOftrashMessagesQuery } from '@/services/Messages/Messages';


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

const MessageList = () => {
    const { data: totalAmountSentMessages } = useGetTotalAmountOfSentMessagesQuery();
    const { data: totalAmountInboxMessages } = useGetTotalAmountOfInboxMessagesQuery();
    const { data: totalAmountImportantMessages } = useGetTotalAmountOfImportantMessagesQuery();
    const { data: totalAmounTrashMessages } = useGetTotalAmountOftrashMessagesQuery();
    const [mainTabValue, setMainTabValue] = React.useState(0);
    const [subTabValue, setSubTabValue] = React.useState(0); // Set the default value for the "Sale" subtabs
    


    const handleMainTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setMainTabValue(newValue);

        // Set the default "Sale" subtab value based on the selected main tab
        if (newValue === 0) {
            setSubTabValue(0); // Adjust this value based on the actual index of the first subtab in "Sale"
        }
    };

    const handleSubTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setSubTabValue(newValue);
    };


    return (
        <>
            <div className="invenShopfy-content-area px-4 sm:px-7">
                <div className="invenShopfy-addbrand-area bg-white p-5 sm:p-7 custom-shadow rounded-8 mb-5">
                    <h4 className="text-[20px] font-bold text-heading mb-9">Message</h4>
                    <div className="invenShopfy-message-inbox-wrapper">
                        <div className="btn-wrapper mb-8">
                            <Link className='invenShopfy-btn' href="/newmessage"><span><i className="fa-regular fa-circle-plus"></i></span>New Message</Link>
                        </div>
                        <div className="invenShopfy-newmessage-wrapper flex flex-col lg:flex-row gap-[50px] minMax2Xl:gap-7">
                            <div className="invenShopfy-message-vertical">
                                <Tabs
                                    value={mainTabValue}
                                    onChange={handleMainTabChange}
                                    TabIndicatorProps={{
                                        style: { display: 'none' }
                                    }}
                                    sx={{
                                        "& button": {
                                          borderRadius: 5,
                                        },
                                        "& button:hover": {
                                          backgroundColor: '!primary',
                                        },
                                      }}                                      
                                    scrollButtons allowScrollButtonsMobile aria-label="basic tabs example">
                                    <Tab label={<div className="invenShopfy-newmessage-nav-menu"><span className='invenShopfy-newmessage-nav-menu-title'><i className="fas fa-message-lines"></i>Inbox</span><span>({totalAmountInboxMessages?.data})</span></div>} {...a11yProps(0)} />
                                    <Tab label={<div className="invenShopfy-newmessage-nav-menu"><span className='invenShopfy-newmessage-nav-menu-title'><i className="fa-sharp fa-regular fa-paper-plane"></i>Send</span><span>({totalAmountSentMessages?.data})</span></div>} {...a11yProps(1)} />
                                    <Tab label={<div className="invenShopfy-newmessage-nav-menu"><span className='invenShopfy-newmessage-nav-menu-title'><i className="fa-solid fa-envelope-open"></i>Draft</span><span>(3)</span></div>} {...a11yProps(2)} />
                                    <Tab label={<div className="invenShopfy-newmessage-nav-menu"><span className='invenShopfy-newmessage-nav-menu-title'><i className="fa-sharp fa-solid fa-circle-exclamation"></i>Important</span><span>({totalAmountImportantMessages?.data})</span></div>} {...a11yProps(3)} />
                                    <Tab label={<div className="invenShopfy-newmessage-nav-menu"><span className='invenShopfy-newmessage-nav-menu-title'><i className="fa-solid fa-trash"></i>Trash</span><span>({totalAmounTrashMessages?.data})</span></div>} {...a11yProps(4)} />
                                </Tabs>
                            </div>
                            <div className="invenShopfy-inbox-wrapper-inner w-full">
                                <CustomTabPanel value={mainTabValue} index={0}>
                                    <IndexTabList />
                                </CustomTabPanel>
                                <CustomTabPanel value={mainTabValue} index={1}>
                                    <SendTabList  />
                                </CustomTabPanel>
                                <CustomTabPanel value={mainTabValue} index={2}>
                                    <DraftTabList />
                                </CustomTabPanel>
                                <CustomTabPanel value={mainTabValue} index={3}>
                                    <ImportantTabList />
                                </CustomTabPanel>
                                <CustomTabPanel value={mainTabValue} index={4}>
                                    <TrashTabList />
                                </CustomTabPanel>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        </>
    );
}

export default MessageList;