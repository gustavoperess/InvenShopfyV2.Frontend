//@refresh
"use client";
import React from "react";
import SidebarMenu from "./sidebar/SidebarMenu";
import Header from "./header/Header";
import FooterCopyright from "./footer/FooterCopyright";
import { ToastContainer } from "react-toastify";
import useGlobalContext from "@/hooks/use-context";

interface WrapperProps {
  children: React.ReactNode;
}
const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  const { setShowingNavigationDropdown, showingNavigationDropdown } = useGlobalContext()

  return (
    <>
      <div className="invenShopfy-dashboard-area">
        <ToastContainer></ToastContainer>
        <div className="invenShopfy-dashboard-main">
          <div className={`invenShopfy-dashboard-main-sidebar ${!showingNavigationDropdown ? "show-dashboard-sidebar" : "hidden-dashboard-sidebar"}`}>
            <SidebarMenu />
          </div>
          <div className={`invenShopfy-dashboard-main-content w-full ${!showingNavigationDropdown ? "show-dashboard-content" : "hidden-dashboard-content"}`}>
            <div className="invenShopfy-dashboard-main-content-wrap">
              <header>
                <div className="invenShopfy-header-area">
                  <div className="invenShopfy-header-wrapper custom-height-70 px-5 sm:px-7 custom-height-70 bg-white border-b border-solid border-border">
                    <Header />
                  </div>
                </div>
              </header>
              {children}
              <footer>
                <div className="invenShopfy-copyright-area">
                  <FooterCopyright />
                </div>
              </footer>
              <div className={`invenShopfy-dashboard-menu-overlay ${!showingNavigationDropdown ? "show-menu-overlay" : "hidden-menu-overlay"}`} onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Wrapper;
