import { imageLoader } from '@/hooks/imgLoader';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useGetAllNotificationsQuery } from '@/services/Notifications/Notification';


const NotificationDropdown = () => {
    const { data: notificationData, error: notificationError, isLoading: notificationLoading, refetch } = useGetAllNotificationsQuery();

    if (notificationLoading) {
        return (
            <div className="inventual-loading-container">
                <span className="inventual-loading"></span>
            </div>
        );
    }
    if (notificationError) {
        return <div className="text-red-500">Failed to load notifications.</div>;
    }
    const notifications = notificationData?.data || [];

    

    return(
        <ul>
            {notifications.length > 0 ? (
                notifications.map((notification: any) => (
                    <li key={notification.id}>
                        <div className="inventual-notify-dropdown-item">
                        <div className="thumb">
                            <Link href={notification.href}>   
                                <Image src={notification.image} height={32} width={32} alt='image not found' priority />
                            </Link>
                            </div>
                            <div className="content">
                                <h6>
                                    <Link href={notification.href}>{notification.title}</Link>
                                </h6>
                                <span>{notification.createAt || 'Unknown Date'}</span>
                            </div>
                        </div>
                    </li>
                ))
            ) : (
                <li>
                    <div className="text-gray-500 text-center py-2">No notifications available</div>
                </li>
            )}
        </ul>
    );
};

export default NotificationDropdown;