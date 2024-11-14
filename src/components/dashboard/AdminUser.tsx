import React from 'react';
import Link from 'next/link';
import { useGetUsersDashboardQuery } from '@/services/User/User';
import Image from 'next/image';

const AdminUser = () => {
    const { data: userData, error: userError, isLoading: userLoading } = useGetUsersDashboardQuery();

    const dateTimeSplit = (string: "") => {
        if (string.length > 0) {
            let date = string.split("T")[0];
            let time = string.split("T")[1].split(".")[0];
            return `${date} ${time}`;
        }
        return "";
    };

    const splitname = (string: "") => {
        if (string.length > 0) {
            const words = string.split(" ");
            const firstName = words[0];
            const lastName = words[words.length - 1];
            return `${firstName} ${lastName}`;
        }
    };

    return (
        <div className="custom-boxshadow inventual-dashboard-user-wrapper p-5 sm:p-7 bg-white rounded-8">
            <div className="inventual-dashboard-user users-view gap-2.5 mb-5">
                <h5 className="text-[18px] text-heading font-bold">User</h5>
                <span className='badge badge-primary view-btn'>
                    <Link href="/client/userlist">View All</Link>
                </span>
            </div>
            <div className="inventual-dashboard-user">
                {userLoading ? (
                    <div>Loading...</div> 
                ) : userError ? (
                    <div>Error loading user data</div>
                ) : userData?.length > 0 ? (
                    userData.map((item: any, index: number) => (
                        <div key={index} className="inventual-dashboard-user-list flex flex-wrap justify-between items-center mb-5 last:mb-0">
                            <div className="inventual-dashboard-user-list-left flex flex-wrap items-center gap-4">
                                <div className="inventual-dashboard-user-list-left-img">
                                    <Image 
                                        src={item.profilePicture || "/defaultProfileImage.png"}  // Add a default image path
                                        height={60} 
                                        width={50} 
                                        alt='profileImage' 
                                        priority 
                                        style={{ maxHeight: '60px', maxWidth: '50px', objectFit: 'contain' }}
                                    />
                                </div>
                                <div className="inventual-dashboard-user-list-left-text">
                                    <h5 className="text-[16px] text-heading font-semibold">
                                        <Link href="#">{splitname(item.userName)}</Link>
                                    </h5>
                                    <span className="text-[14px] font-normal block">{item.roleName}</span>
                                    <span className="text-[12px] text-blue font-normal block">
                                        Sign in - {dateTimeSplit(item.lastLogin)}
                                    </span>
                                </div>
                            </div>
                            <div className="inventual-dashboard-user-list-right">
                                {item.roleName.toLowerCase() === "admin" ? (
                                    <span className='badge-stroke badge-success'>online</span>
                                ) : (
                                    <span className='badge-stroke badge-warning'>offline</span>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div>Data not found</div>
                )}
            </div>
        </div>
    );
};

export default AdminUser;
