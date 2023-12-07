import React, { Component, useState } from "react";
import { useLocation, NavLink, Link, Outlet } from "react-router-dom";

import "../css/sidebar.css";

function ProfileSidebar() {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };
  return (
    <div className="layout">
      <div className="sidebar">
        <a className="toggle-button">Quản lý cá nhân</a>
        <ul className="sidebar-menu">
          <li>
            <Link
              to="./profile"
              className={`sidebar-link ${
                selectedItem === "menu-item-1" ? "selected" : ""
              }`}
              onClick={() => handleItemClick("menu-item-1")}
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              to="./profile"
              className={`sidebar-link ${
                selectedItem === "menu-item-2" ? "selected" : ""
              }`}
              onClick={() => handleItemClick("menu-item-2")}
            >
              Truyện của tôi
            </Link>
          </li>
          <li>
            <Link
              to="/menu-item-3"
              className={`sidebar-link ${
                selectedItem === "menu-item-3" ? "selected" : ""
              }`}
              onClick={() => handleItemClick("menu-item-3")}
            >
              Menu Item 3
            </Link>
          </li>
          {/* Add more menu items as needed */}
        </ul>
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default ProfileSidebar;
