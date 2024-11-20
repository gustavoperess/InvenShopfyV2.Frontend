import { Tab, Tabs } from '@mui/material';
import Image from 'next/image';
import DownloadSvg from '@/svg/DownloadSvg';
import TrashSvg from '@/svg/TrashSvg';
import StarSvg from '@/svg/StarSvg';
import React, { useState, useEffect } from 'react';
import ForwardSvg from '@/svg/ForwardSvg';
import { useGetMessagesInboxQuery } from '@/services/Messages/Messages';

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
    };
}

const IndexTabList = () => {
    const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
    const [currentPageSize, setCurrentPageSize] = useState(10);
    const { data: messagesData, error: messagesError, isLoading: messagesLoading } = useGetMessagesInboxQuery({ pageNumber: currentPageNumber, pageSize: currentPageSize });
    const [subTabValue, setSubTabValue] = useState<number>(0);
    const [isReady, setIsReady] = useState<boolean>(false);

    const handleSubTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setSubTabValue(newValue);
    };

    useEffect(() => {
        if (messagesData?.data && !subTabValue) {
            setSubTabValue(messagesData.data[0]?.id);
            setIsReady(true); 
        }
    }, [messagesData]);

    const sliceMessageBody = (message: string) => {
        const words = message.split(' ');
        const firstFourWords = words.slice(0, 4).join(' ');
        return firstFourWords + '...';
    };

    const splitname = (string: "") => {
        if (string.length > 0) {
            const words = string.split(" ");
            const firstName = words[0];
            const lastName = words[words.length - 1];
            return `${firstName} ${lastName}`;
        }
        return "";
    };

    if (!isReady || messagesLoading) {
        return <div>Loading...</div>; 
    }


    return (
        <>
            <div className="inventual-inbox-top-wrapper mb-2.5">
                <div className="inventual-inbox-top-wrapper mb-2.5">
                    <div className="grid grid-cols-12 items-center mb-5 gap-5">
                        <div className="col-span-12 lg:col-span-8">
                            <div className="inventual-notification-search">
                                <div className="inventual-message-search relative">
                                    <input type="text" placeholder="Search mail" />
                                    <span><i className="fa-sharp fa-regular fa-magnifying-glass"></i></span>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12 lg:col-span-4 gap-5">
                            <div className="inventual-notification-action flex justify-end gap-2">
                                <button type="button">
                                    <DownloadSvg />
                                </button>
                                <button type="button">
                                    <TrashSvg />
                                </button>
                                <button type="button">
                                    <StarSvg />
                                </button>
                                <button type="button">
                                    <ForwardSvg />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="inventual-newmessage-wrapper flex flex-col md:flex-row gap-12 minMax2Xl:gap-7">
                    <div className="inventual-message-vertical-subtab">
                        <Tabs value={subTabValue}
                            onChange={handleSubTabChange}
                            TabIndicatorProps={{
                                style: { display: 'none' }
                            }}
                            scrollButtons allowScrollButtonsMobile aria-label="basic tabs example">

                            {messagesData?.data.map((item: any) => (
                                <Tab
                                    key={item.id}
                                    value={item.id}
                                    {...a11yProps(item.id)}
                                    label={
                                        <div className="inventual-inbox-user">
                                            <div className="min-h-[70px] inline-flex items-center justify-cente">
                                                <Image
                                                    src={item.profilePicture}
                                                    width="0"
                                                    height="0"
                                                    alt="Profile Picture"
                                                    sizes="100vw"
                                                    style={{ width: '62px', height: '52px' }}
                                                />
                                            </div>
                                            <div className="inventua-inbox-user-text w-full text-start">
                                                <h5 className="user-name">{splitname(item.toUser)}</h5>
                                                <span className="sub-title">{item.subject}</span>
                                                <p className="description">{sliceMessageBody(item.messageBody)}</p>
                                                <small className="time-title">{item.time}</small>
                                            </div>
                                        </div>
                                    }
                                />
                            ))}
                        </Tabs>
                    </div>
                    <div className="inventual-inbox-wrapper-inner w-full">
                    {messagesData?.data.map((item: any) => (
                            <CustomTabPanel value={subTabValue} index={item.id} key={item.id}>
                                <div className="inventual-notification-body">
                                    <h4 className="text-[24px] font-bold text-heading mb-10">{item.title}</h4>
                                    <h5 className="text-[18px] font-bold text-heading mb-1">{item.toUser}</h5>
                                    <span className="text-[14px] font-semibold block mb-11">{item.time}</span>
                               
                                    <p className="text-[16px] font-normal leading-[26px] mb-6">{item.messageBody}</p>
                                    <div className="inventual-notification-feedback default-light-theme flex flex-wrap gap-3">
                                        <button className="inventual-btn outline-btn h-38" type="submit">
                                            <span><i className="fa-sharp fa-solid fa-reply"></i></span>Reply
                                        </button>
                                        <button className="inventual-btn outline-btn h-38" type="submit">
                                            <span><i className="fa-solid fa-right-long"></i></span>Forward
                                        </button>
                                        <button className="inventual-btn outline-btn h-38" type="submit">
                                            <span><i className="fa-light fa-trash-can"></i></span>Delete
                                        </button>
                                    </div>
                                </div>
                            </CustomTabPanel>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default IndexTabList;