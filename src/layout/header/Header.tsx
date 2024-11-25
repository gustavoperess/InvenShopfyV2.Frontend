"use client"
import Image from "next/image";
import React, { useState } from "react";
import EmailDropdown from "./EmailDropdown";
import NotificationDropdown from "./NotificationDropdown";
import QuickMenuDropdown from "./QuickMenuDropdown";
import LanguageDropdown from "./LanguageDropdown";
import useGlobalContext from "@/hooks/use-context";
import { useUserLogOutMutation } from "@/services/Authentication/Authentication";
import { useGetCurrentUserQuery } from "@/services/User/User";

const Header = () => {
  const [isQuickDropdown, setQuickDropdown] = useState<boolean>(false);
  const [isLanguageDropdown, setLanguageDropdown] = useState<boolean>(false);
  const [isEmailDropdown, setEmailDropdown] = useState<boolean>(false);
  const [isProfileDropdown, setProfileDropdown] = useState<boolean>(false);
  const [isNotificationDropdown, setNotificationDropdown] = useState<boolean>(false);
  const { data: currentuser, error: currentUserError, isLoading: currentUserLoading } = useGetCurrentUserQuery();
  const [logout] = useUserLogOutMutation();

  const toggleQuickDropdown = () => {
    setQuickDropdown(!isQuickDropdown);
    setLanguageDropdown(false);
    setEmailDropdown(false);
    setProfileDropdown(false);
    setNotificationDropdown(false);
  };

  const toggleLanguageDropdown = () => {
    setLanguageDropdown(!isLanguageDropdown);
    setQuickDropdown(false);
    setEmailDropdown(false);
    setProfileDropdown(false);
    setNotificationDropdown(false);
  };

  const toggleEmailDropdown = () => {
    setEmailDropdown(!isEmailDropdown);
    setQuickDropdown(false);
    setLanguageDropdown(false);
    setProfileDropdown(false);
    setNotificationDropdown(false);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdown(!isProfileDropdown);
    setQuickDropdown(false);
    setLanguageDropdown(false);
    setEmailDropdown(false);
    setNotificationDropdown(false);
  };

  const toggleNotificationDropdown = () => {
    setNotificationDropdown(!isNotificationDropdown);
    setQuickDropdown(false);
    setLanguageDropdown(false);
    setEmailDropdown(false);
    setProfileDropdown(false);
  };


  const { setShowingNavigationDropdown, showingNavigationDropdown } = useGlobalContext()


  const splitname = (fullName: string) => {
    if (currentuser != undefined) {
        const words = fullName.split(" ");
        const firstName = words[0];
        const lastName = words[words.length - 1];
        return `${firstName} ${lastName}`;
    }
    return '';
};




  return (
    <>
      <div className="flex justify-between items-center gap-4">
        <div className="inventual-sidebar">
          <button className="inventual-sidebar-icon-bar" onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)} type="button">
            <i className="fa-solid fa-bars-sort"></i>
          </button>
        </div>
        <div className="inventual-header-content flex items-center justify-end min-h-[70px] w-full">
          <div className="inventual-header-shortmenu pe-5 maxSm:pe-4 border-e items-center flex flex-col justify-center border-borderLight min-h-[70px] border-solid">
            <button type="button" className="h-10 w-10 leading-[38px] border border-borderLight border-solid text-center inline-block rounded-[3px] text-body short" onClick={toggleQuickDropdown}>
              <i className="fas fa-plus"></i>
            </button>
            <div className={`inventual-quick-dropdown ${isQuickDropdown ? 'shortmenu-enable' : ''}`}>
              <QuickMenuDropdown />
            </div>
          </div>
          <div
            className="inventual-header-notify-wrapper px-5 border-e border-solid border-borderLight min-h-[70px] flex items-center">
            <div className="inventual-header-notification pe-5 relative">
              <button type="button" className="noti"><i className="fal fa-bell" onClick={toggleNotificationDropdown}></i></button>
              <div className={`inventual-notify-dropdown ${isNotificationDropdown ? 'notifydropdown-enable' : ''}`}>
                <NotificationDropdown />
              </div>
            </div>
            <div className="inventual-header-email pe-5 relative">
              <button type="button" className="emai" onClick={toggleEmailDropdown}><i className="fal fa-envelope"></i></button>
              <div className={`inventual-notify-dropdown ${isEmailDropdown ? 'emaildropdown-enable' : ''}`}>
                <EmailDropdown />
              </div>
            </div>
            <div className="inventual-header-language flex items-center gap-2 relative" onClick={toggleLanguageDropdown}>
              <div className="inventual-header-language-icon">
                <button type="button" className="text-[18px] text-body leading-none"><i className="fal fa-globe"></i></button>
              </div>
              <div className="inventual-header-language-content maxMd:hidden">
                <ul>
                  <li className="flex"><button type="button" className="text-[14px] font-bold text-body">ENG <i className="far fa-chevron-down"></i></button></li>
                </ul>
              </div>
              <div className={`inventual-quick-dropdown inventual-quick-lang-dropdown ${isLanguageDropdown ? 'langmenu-enable' : ''}`}>
                <LanguageDropdown />
              </div>
            </div>
          </div>
          <div className="inventual-header-profile relative ps-5 flex flex-wrap items-center pe-11 maxMd:pe-0">
            <div className="inventual-header-profile-img w-12 maxMd:me-0 cursor-pointer">
              <button type="button" className="w-12 h-12 rounded min-w-[48px]" onClick={toggleProfileDropdown}>
                {currentUserLoading ? (
                  <div>Loading...</div>
                )
                  : currentUserError ? (
                    <div>Error loading user data</div>
                  ) :
                    <Image src={currentuser?.profilePicture}  
                    width="0"
                    height="0" 
                    sizes="100vw"
                    alt='profilePicture' 
                    style={{ maxHeight: '50px', width: '50px', height:"50px", maxWidth: "50px", objectFit: 'contain' }}
                    />
                }
              </button>
            </div>
            <div className="inventual-header-profile-info maxMd:hidden ps-2.5 cursor-pointer">
              <h5 className="text-[15px] font-bold text-heading cursor-pointer" onClick={toggleProfileDropdown}>{splitname(currentuser?.fullName)}</h5>
              <span className="text-[14px] font-normal text-body cursor-pointer">{currentuser?.roles[0]}</span>
              <i className="far fa-chevron-down" onClick={toggleProfileDropdown}></i>
            </div>

            <div className={`inventual-quick-dropdown inventual-quick-pro-dropdown ${isProfileDropdown ? 'promenu-enable' : ''}`}>
              <ul>
                <li><a href="/profile"><i className="fal fa-user"></i> Profile</a></li>
                <li><a onClick={logout} href="/"><i className="fal fa-sign-out"></i> Logout</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>


      <div className={`inventual-header-overlay ${isQuickDropdown ? 'shortmenu-enable' : ''}`} onClick={toggleQuickDropdown}></div>
      <div className={`inventual-header-overlay ${isLanguageDropdown ? 'langmenu-enable' : ''}`} onClick={toggleLanguageDropdown}></div>
      <div className={`inventual-header-overlay ${isProfileDropdown ? 'promenu-enable' : ''}`} onClick={toggleProfileDropdown}></div>
      <div className={`inventual-header-overlay ${isNotificationDropdown ? 'notifydropdown-enable' : ''}`} onClick={toggleNotificationDropdown}></div>
      <div className={`inventual-header-overlay ${isEmailDropdown ? 'emaildropdown-enable' : ''}`} onClick={toggleEmailDropdown}></div>

    </>
  );
};

export default Header;
