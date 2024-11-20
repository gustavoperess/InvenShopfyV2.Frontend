import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { useGetLastFiveInboxMessagesQuery } from '@/services/Messages/Messages';

const EmailDropdown = () => {
    const { data: messagesData, error: messagesError, isLoading: messagesLoading } = useGetLastFiveInboxMessagesQuery();
   
    if (messagesLoading) {
        return (
            <div className="inventual-loading-container">
                <span className="inventual-loading"></span>
            </div>
        );
    }
    if (messagesLoading) {
        return <div className="text-red-500">Failed to load messages.</div>;
    }
   
    const messages = messagesData?.data || [];

    return (
        <ul>
            {messages.length > 0 ? (
                messages.map((msg: any) => (
                    <li key={msg.id}>
                        <div className="inventual-notify-dropdown-item">
                            <div className="thumb">
                                <Link href="/message">
                                    <Image
                                        src={msg.profilePicture}
                                        width="0"
                                        height="0"
                                        alt='image not found'
                                        sizes="100vw"
                                        style={{ width: '52px', height: '42px' }}
                                    />
                                </Link>
                            </div>
                            <div className="content">
                                <h6>
                                    <Link href="/message">Message from {msg.toUser}</Link>
                                </h6>
                                <span>{msg.time || 'Unknown Date'}</span>
                            </div>
                        </div>
                    </li>
                ))
            ) : (
                <li>
                    <div className="text-gray-500 text-center py-2">No messages available</div>
                </li>
            )}
            <div className="border-t border-gray-300 my-2"></div>
            <li>
                <Link href="/message">
                    <div className="inventual-notify-dropdown-list py-1 flex items-center justify-center cursor-pointer">
                        <div className="thumb flex items-center">
                            See All
                            <span className="ml-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                                </svg>
                            </span>
                        </div>
                    </div>
                </Link>
            </li>
        </ul>
    );
};

export default EmailDropdown;