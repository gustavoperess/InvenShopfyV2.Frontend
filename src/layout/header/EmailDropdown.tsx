import { imageLoader } from '@/hooks/imgLoader';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import userImgOne from "../../../public/assets/img/user/user-1.png"
import userImgTwo from "../../../public/assets/img/user/user-2.png"
import userImgThree from "../../../public/assets/img/user/user-3.png"
import userImgFour from "../../../public/assets/img/user/user-4.png"
import userImgFive from "../../../public/assets/img/user/user-5.png"

const EmailDropdown = () => {
    return (
        <ul>
            <li>
                <div className="inventual-notify-dropdown-item">
                    <div className="thumb">
                        <Link href="/message">
                            <Image src={userImgOne} loader={imageLoader} placeholder="blur" loading='lazy' style={{ width: '100%', height: "auto" }} alt="genres img" />
                        </Link>
                    </div>
                    <div className="content">
                        <h6>
                            <Link href="/message">
                                Urgent Low Stock Alert for ZenithX Pro
                            </Link>
                        </h6>
                        <span>
                            31 Dec 2023 - 08:36
                            PM
                        </span>
                    </div>
                </div>
            </li>
            <li>
                <div className="inventual-notify-dropdown-item">
                    <div className="thumb">
                        <Link href="/message">
                            <Image src={userImgTwo} loader={imageLoader} placeholder="blur" loading='lazy' style={{ width: '100%', height: "auto" }} alt="genres img" />
                        </Link>
                    </div>
                    <div className="content">
                        <h6>
                            <Link href="/message">
                                Scheduled System Maintenance Notice
                            </Link>
                        </h6>
                        <span>
                            31 Dec 2021 - 08:36
                            PM
                        </span>
                    </div>
                </div>
            </li>
            <li>
                <div className="inventual-notify-dropdown-item">
                    <div className="thumb">
                        <Link href="/message">
                            <Image src={userImgThree} loader={imageLoader} placeholder="blur" loading='lazy' style={{ width: '100%', height: "auto" }} alt="genres img" />
                        </Link>
                    </div>
                    <div className="content">
                        <h6>
                            <Link href="/message">
                                User Permissions Update Inventory System Access
                            </Link>
                        </h6>
                        <span>
                            31 Dec 2021 - 08:36
                            PM
                        </span>
                    </div>
                </div>
            </li>
            <li>
                <div className="inventual-notify-dropdown-item">
                    <div className="thumb">
                        <Link href="/message">
                            <Image src={userImgFour} loader={imageLoader} placeholder="blur" loading='lazy' style={{ width: '100%', height: "auto" }} alt="genres img" />
                        </Link>
                    </div>
                    <div className="content">
                        <h6>
                            <Link href="/message">
                                {" "}
                                Training Opportunity Inventory Management Skills
                            </Link>
                        </h6>
                        <span>
                            31 Dec 2021 - 08:36
                            PM
                        </span>
                    </div>
                </div>
            </li>
            <li>
                <div className="inventual-notify-dropdown-item">
                    <div className="thumb">
                        <Link href="/message">
                            <Image src={userImgFive} loader={imageLoader} placeholder="blur" loading='lazy' style={{ width: '100%', height: "auto" }} alt="genres img" />
                        </Link>
                    </div>
                    <div className="content">
                        <h6>
                            <Link href="/message">
                                Supplier Communication Update
                            </Link>
                        </h6>
                        <span>
                            31 Dec 2021 - 08:36
                            PM
                        </span>
                    </div>
                </div>
            </li>
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