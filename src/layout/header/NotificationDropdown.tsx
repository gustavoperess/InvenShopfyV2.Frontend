import { imageLoader } from '@/hooks/imgLoader';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import userImgOne from "../../../public/assets/img/user/user-1.png"
import userImgTwo from "../../../public/assets/img/user/user-2.png"
import userImgThree from "../../../public/assets/img/user/user-3.png"
import userImgFour from "../../../public/assets/img/user/user-4.png"
import userImgFive from "../../../public/assets/img/user/user-5.png"

const NotificationDropdown = () => {
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
                                Stock Movement Alerts
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
                                Supplier Communication Updates
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
                                Demand Forecasting Reminders
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
                                Inventory Valuation Reports
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
                                Training and Development Opportunities
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

export default NotificationDropdown;