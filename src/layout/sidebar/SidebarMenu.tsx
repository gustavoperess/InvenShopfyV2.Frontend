import React from 'react';
import SidebarNavs from './SidebarNavs';
import Link from 'next/link';
import sidebarLogo from '../../../public/assets/img/logo/logo.png'
import sidebarSmallLogo from '../../../public/assets/img/logo/small-logo.png'
import Image from 'next/image';
import useGlobalContext from '@/hooks/use-context';
const SidebarMenu = () => {
    const { setShowingNavigationDropdown, showingNavigationDropdown } = useGlobalContext()
    return (
        <div className='inventual-sidebar-area'>
            <div className="inventual-sidebar-main">
                <div className="inventual-sidebar-main-logo-bar">
                    <div className="inventual-sidebar-main-logo-bar-wrap">
                        <div className="inventual-sidebar-main-logo">
                            <div className="sidebar-logo">
                                <Link href="/dashboard">
                                    <Image 
                                    className='rounded' 
                                    width="0"
                                    height="0" 
                                    sizes="100vw"
                                    src={sidebarLogo}
                                    style={{ maxHeight: '50px', maxWidth: '50px', objectFit: 'contain' }}
                                    alt="logo thimb" />
                                </Link>
                            </div>
                            <div className="sidebar-small-logo">
                                <Link href="/dashboard">
                                    <Image 
                                    src={sidebarSmallLogo}
                                    width="0"
                                    height="0" 
                                    alt="logo thimb"
                                    sizes="100vw"
                                    style={{ maxHeight: '50px', maxWidth: '50px', objectFit: 'contain' }}
                                   />
                                </Link>
                            </div>
                        </div>
                        <div className="inventual-sidebar-icon-bar !hidden" onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}>
                            <button type="button">
                                <i className="fa-solid fa-bars-sort"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="inventual-sidebar-navigation mb-6">
                    <nav>
                        <SidebarNavs />
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default SidebarMenu;