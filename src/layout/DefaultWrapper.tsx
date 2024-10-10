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
      <div className="inventual-dashboard-area">
        <ToastContainer></ToastContainer>
        <div className="inventual-dashboard-main">
          <div className={`inventual-dashboard-main-sidebar ${!showingNavigationDropdown ? "show-dashboard-sidebar" : "hidden-dashboard-sidebar"}`}>
            <SidebarMenu />
          </div>
          <div className={`inventual-dashboard-main-content w-full ${!showingNavigationDropdown ? "show-dashboard-content" : "hidden-dashboard-content"}`}>
            <div className="inventual-dashboard-main-content-wrap">
              <header>
                <div className="inventual-header-area">
                  <div className="inventual-header-wrapper custom-height-70 px-5 sm:px-7 custom-height-70 bg-white border-b border-solid border-border">
                    <Header />
                  </div>
                </div>
              </header>
              {children}
              <footer>
                <div className="inventual-copyright-area">
                  <FooterCopyright />
                </div>
              </footer>
              <div className={`inventual-dashboard-menu-overlay ${!showingNavigationDropdown ? "show-menu-overlay" : "hidden-menu-overlay"}`} onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Wrapper;
