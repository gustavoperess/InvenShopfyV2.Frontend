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
        </ul>
    );
};

export default EmailDropdown;