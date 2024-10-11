import React from 'react';
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';
import adminUserOneImg from '../../../public/assets/img/user/user-1.png';
import adminUserTwoImg from '../../../public/assets/img/user/user-2.png';
import adminUserThreeImg from '../../../public/assets/img/user/user-3.png';
import adminUserFourImg from '../../../public/assets/img/user/user-4.png';
import adminUserFiveImg from '../../../public/assets/img/user/user-5.png';


interface Data {
    image: string | StaticImageData;
    name: string;
    role: string;
    signIn: string;
    status: string;
}

const AdminUser = () => {

    const sampleData: Data[] = [
        { image: adminUserOneImg, name: 'John David', role: 'Manager', signIn: '09:30', status: "Online" },
        { image: adminUserTwoImg, name: 'Jhon Doe', role: 'Manager', signIn: '09:25', status: "Ofline" },
        { image: adminUserThreeImg, name: 'Killiyan Ampa', role: 'Manager', signIn: '09:20', status: "Online" },
        { image: adminUserFourImg, name: 'Shane Watson', role: 'Manager', signIn: '09:29', status: "Online" },
        { image: adminUserFiveImg, name: 'Mendela Peter', role: 'Manager', signIn: '09:22', status: "Online" },
    ]

    return (
        <div className="custom-boxshadow inventual-dashboard-user-wrapper p-5 sm:p-7 bg-white rounded-8">
            <div className="inventual-dashboard-user users-view gap-2.5 mb-5">
                <h5 className="text-[18px] text-heading font-bold">User</h5>
                <span className='badge badge-primary view-btn'>
                    <Link href="/client/userlist">View All</Link>
                </span>
            </div>
            <div className="inventual-dashboard-user">
                {
                    sampleData.length > 0 ? (
                        sampleData.map((item, index) =>
                            <div key={index} className="inventual-dashboard-user-list flex flex-wrap justify-between items-center mb-5 last:mb-0">
                                <div className="inventual-dashboard-user-list-left flex flex-wrap items-center gap-4">
                                    <div className="inventual-dashboard-user-list-left-img">
                                        <Link href="#"><Image src={item.image} style={{ width: "60px", height: 'auto' }} alt="user not found" /></Link>
                                    </div>
                                    <div className="inventual-dashboard-user-list-left-text">
                                        <h5 className="text-[16px] text-heading font-semibold"><Link href="#">{item.name}</Link></h5>
                                        <span className="text-[14px] font-normal block">{item.role}</span>
                                        <span className="text-[12px] text-blue font-normal block">Sign in -{item.signIn}</span>
                                    </div>
                                </div>
                                <div className="inventual-dashboard-user-list-right">
                                    {
                                        item.status.toLowerCase() === "online" ? (
                                            <span className='badge-stroke badge-success'>{item.status}</span>
                                        ) : (
                                            <span className='badge-stroke badge-warning'>{item.status}</span>
                                        )
                                    }
                                </div>
                            </div>)
                    ) : <div className=''>Data not found</div>
                }
            </div>
        </div>
    );
};

export default AdminUser;