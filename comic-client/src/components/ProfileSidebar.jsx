import React, { Component, useState } from "react";
import { useLocation, NavLink, Link, Outlet, Navigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { checkAuth } from "../security/Authentication";

import "../css/sidebar.css";

function ProfileSidebar() {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };
  return (
    <>
      <Header />
      <div className="layout">
        <div className="sidebar">
          <a className="toggle-button">🏡 Quản lý cá nhân</a>
          <ul className="sidebar-menu">
            <li className={`sidebar-link ${
                  selectedItem === "menu-item-1" ? "selected" : ""
                }`}>
              <Link
                to="./profile"
                
                onClick={() => handleItemClick("menu-item-1")}
              >
                👤 Profile
              </Link>
            </li>
            <li className={`sidebar-link ${
                  selectedItem === "menu-item-2" ? "selected" : ""
                }`}>
              <Link
                to="./comic-manage"
                
                onClick={() => handleItemClick("menu-item-2")}
              >
                📓 Truyện của tôi
              </Link>
            </li>
            <li className={`sidebar-link ${
                  selectedItem === "menu-item-3" ? "selected" : ""
                }`}><Link
                to="./wallet"
                
                
                onClick={() => handleItemClick("menu-item-3")}
              >
                🗃️ Ví của tôi
              </Link></li>
            <li className={`sidebar-link ${
                  selectedItem === "menu-item-4" ? "selected" : ""
                }`}>
              <Link
                to="/statistic"
                
                
                onClick={() => handleItemClick("menu-item-4")}
              >
                📶 Thống kê
              </Link>
            </li>
            {/* Add more menu items as needed */}
          </ul>
        </div>
        <div className="content" >
          <Outlet />
        </div>
      </div>
      <Footer />
    </>)
}

export default ProfileSidebar;
