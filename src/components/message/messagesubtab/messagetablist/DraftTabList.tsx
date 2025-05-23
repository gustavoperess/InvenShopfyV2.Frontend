import { Tab, Tabs } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import IndexMailTabData from '@/data/index-mail-tab-data';
import userTabList from '@/data/users-tab-list';
import DownloadSvg from '@/svg/DownloadSvg';
import TrashSvg from '@/svg/TrashSvg';
import StarSvg from '@/svg/StarSvg';
import ForwardSvg from '@/svg/ForwardSvg';

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

const DraftTabList = () => {
    const [subTabValue, setSubTabValue] = React.useState(0); // Set the default value for the "Sale" subtabs

    const handleSubTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setSubTabValue(newValue);
    };
    return (
        <>
            <div className="invenShopfy-inbox-top-wrapper mb-2.5">
                <div className="invenShopfy-inbox-top-wrapper mb-2.5">
                    <div className="grid grid-cols-12 items-center mb-5 gap-5">
                        <div className="col-span-12 lg:col-span-8">
                            <div className="invenShopfy-notification-search">
                                <div className="invenShopfy-message-search relative">
                                    <input type="text" placeholder="Search mail" />
                                    <span><i className="fa-sharp fa-regular fa-magnifying-glass"></i></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="invenShopfy-newmessage-wrapper flex flex-col md:flex-row gap-12 minMax2Xl:gap-7">
                    <div className="invenShopfy-message-vertical-subtab">
                        <Tabs value={subTabValue}
                            onChange={handleSubTabChange}
                            TabIndicatorProps={{
                                style: { display: 'none' }
                            }}
                            scrollButtons allowScrollButtonsMobile aria-label="basic tabs example">

                            {
                                userTabList.slice(12, 15).map((item) => (
                                    <Tab key={item.id} {...a11yProps(item.indexNum)} label={
                                        <div className='invenShopfy-inbox-user'>
                                            <div className="invenShopfy-inbox-user-thumb">
                                                <Image src={item.image} style={{ width: '100%', height: "100%" }} alt="Index image not found" />
                                            </div>
                                            <div className="inventua-inbox-user-text w-full text-start">
                                                <h5 className="user-name">{item.userName}</h5>
                                                <span className="sub-title">{item.subTitle}</span>
                                                <p className="description" >{item.desc}</p>
                                                <small className="time-title">{item.time}</small>
                                            </div>
                                        </div>}
                                    />
                                ))
                            }
                        </Tabs>
                    </div>
                    <div className="invenShopfy-inbox-wrapper-inner w-full">
                        {
                            IndexMailTabData.slice(12, 15).map((item) => (
                                <CustomTabPanel value={subTabValue} index={item.indexNum} key={item.id}>
                                    <div className="invenShopfy-notification-body">
                                        <div className="col-span-12 lg:col-span-4 gap-5">
                                            <div className="invenShopfy-notification-action flex justify-end gap-2">
                                                <button type="button">
                                                    <DownloadSvg />
                                                </button>
                                                <button type="button">
                                                    <TrashSvg />
                                                </button>
                                                <button type="button">
                                                    <StarSvg />
                                                </button>
                                                <a href="/newmessage">
                                                    <ForwardSvg />
                                                </a>
                                            </div>
                                        </div>
                                        <h4 className="text-[24px] font-bold text-heading mb-2">{item.title}</h4>
                                        <h5 className="text-[14px] text-heading mb-12">Important Matter</h5>

                                        <h5 className="text-[18px] font-bold text-heading mb-1">From: {item.subTitle}</h5>
                                        <span className="text-[14px] font-semibold block mb-11">Date: {item.time}</span>
                                        <span className="text-[16px] font-normal block mb-4 pb-0.5">Hi, </span>
                                        <p className="text-[16px] font-normal leading-[26px] mb-6">{item.description}</p>
                                        <p className="text-[16px] font-normal leading-[26px] mb-6">{item.descriptionTwo}</p>
                                        <p className="text-[16px] font-normal leading-[26px] mb-12 pb-0.5">{item.descriptionThree}</p>
                                        <p className="text-[16px] font-normal mb-12">Thanks!</p>
                                        <div className="invenShopfy-notification-feedback default-light-theme flex flex-wrap gap-3">
                                            <a href="/newmessage" className="invenShopfy-btn outline-btn h-38">
                                                <span><i className="fa-sharp fa-solid fa-reply"></i></span>Reply
                                            </a>
                                            <button className='invenShopfy-btn outline-btn h-38' type="submit"><span><i className="fa-solid fa-right-long"></i></span>Forward</button>
                                            <button className='invenShopfy-btn outline-btn h-38' type="submit"><span><i className="fa-light fa-trash-can"></i></span>Delete</button>
                                        </div>
                                    </div>
                                </CustomTabPanel>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default DraftTabList;