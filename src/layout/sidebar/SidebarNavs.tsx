import { menuData } from "@/data/sidebar-menu";
import Link from "next/link";
import React, { useState } from "react";

const SidebarNavs = () => {
    const [activeMenu, setActiveMenu] = useState(null);
    const [activeSubMenu, setActiveSubMenu] = useState(null);

    const handleMenuClick = (index: any) => {
        if (activeMenu === index) {
            setActiveMenu(null);
        } else {
            setActiveMenu(index);
            setActiveSubMenu(null); // Reset active submenu when clicking a menu item
        }
    };

    const handleSubMenuClick = (subIndex: any) => {
        if (activeSubMenu === subIndex) {
            setActiveSubMenu(null);
        } else {
            setActiveSubMenu(subIndex);
        }
    };


    return (
        <ul className="sidenav-nav">
            {menuData?.map((menuItem, index) => (
                <li
                    key={index}
                    className={`sidenav-nav-item ${activeMenu === index ? "active" : ""
                        }`}
                >
                    <Link
                        href={menuItem.routeLink}
                        className="sidenav-nav-link"
                        onClick={() => handleMenuClick(index)}
                    >
                        <i className={`common-dashboard-icon ${menuItem.iconClas}`}></i>{" "}
                        <span>{menuItem.label}</span>
                        {menuItem.subItems ? (
                            <i className="fa-regular fa-chevron-right sidenav-nav-link-icon"></i>
                        ) : null}
                    </Link>
                    {activeMenu === index && menuItem.subItems && (
                        <ul className="sublevel-nav-A">
                            {menuItem.subItems.map((subItem, subIndex) => (
                                <li
                                    key={subIndex}
                                    className={`sublevel-nav-item-A ${activeSubMenu === subIndex
                                        ? "active"
                                        : ""
                                        }`}
                                >
                                    <Link
                                        href={subItem.routeLink}
                                        className="sublevel-nav-link"
                                        onClick={() =>
                                            handleSubMenuClick(subIndex)
                                        }
                                    >
                                        <span>{subItem.label}</span>
                                        {subItem?.subSubItems ? (
                                            <i className="fa-regular fa-chevron-right sidenav-nav-link-icon"></i>
                                        ) : null}
                                    </Link>
                                    {activeSubMenu === subIndex &&
                                        subItem?.subSubItems && (
                                            <ul className="sublevel-nav-B">
                                                {subItem.subSubItems.map(
                                                    (
                                                        subSubItem,
                                                        subSubIndex
                                                    ) => (
                                                        <li
                                                            key={subSubIndex}
                                                            className="sublevel-nav-item-B"
                                                        >
                                                            <Link
                                                                href={
                                                                    subSubItem.routeLink
                                                                }
                                                                className="sublevel-nav-link"
                                                            >
                                                                <span>{subSubItem.label}</span>
                                                            </Link>
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        )}
                                </li>
                            ))}
                        </ul>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default SidebarNavs;