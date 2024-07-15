import React, { useEffect, useContext } from "react";
// import "../sass/style.scss";
// import "../css/AllStyles";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { checkAuth } from "../security/Authentication";
import AppContext from "../context/AppContext";
import axios from "axios";
import API_URL from "../config/config";
import NotificationsPopover from "./notifications-popover";
import MessagesPopover from "./MessagesPopover";
import SearchResultPopover from "./SearchResultPopover";

const Header = () => {
  const appContext = useContext(AppContext);

  const logoUrl = `${process.env.PUBLIC_URL}/images/logo.png`;

  const navigate = useNavigate();

  const logout=async()=>{
    try{
      await axios.post(
        `${API_URL}/logout`, {accessToken:Cookies.get("access_token")},
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
    }catch (error) {
      console.log(error);
    } 

  }

  const handleLogout = async () => {
    await logout();
    Cookies.remove("access_token");
    window.sessionStorage.clear();
    navigate("/");
    window.location.reload();
    window.scrollTo({
      top: 0,
    });
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <header className="header">
      <div className="container">
        <div className="row">
          <div className="col-lg-2">
            <div className="header__logo">
              <Link to="./">
                <img
                  src={logoUrl}
                  alt=""
                  style={{ maxWidth: "93", maxHeight: "23" }}
                />
              </Link>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="header__nav">
              <nav className="header__menu mobile-menu">
                <ul>
                  <li>
                    <NavLink to="./" activeclassname="active">
                      Trang chủ
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to="./genres" activeclassname="active">
                      Thể loại <span className="arrow_carrot-down"></span>
                    </NavLink>
                    <ul className="dropdown">
                      <li>
                        {appContext.map((item) => (
                          <Link
                            to={{ pathname: `./genres/${item.id}/1` }}
                            key={item.id}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </li>

                    </ul>
                  </li>
                  <li>
                  </li>
                  <li>
                    <NavLink to="./favorite-comic" activeclassname="active">
                      Ưa thích
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="./history-reading" activeclassname="active">
                      Lịch sử
                    </NavLink>
                  </li>
                  <li>
                    <SearchResultPopover/>
                    {/* <input className="searchTerm" type="text" placeholder="Search Here..." onChange={handleKeyWordChange}></input>        
                    {(keyWord !== "" && searchingList != []) && (

                      
                      <ul className="dropdown-search">
                        <li>
                          {searchingList.map((item) => (
                            <SearchResutlItem searchItem={item}></SearchResutlItem>
                          ))}
                        </li>
                      </ul>
                    )} */}
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div className="col-lg-2">
            <div className="header__right">

              {checkAuth() ? (
                <>
                  <MessagesPopover/>
                  <NotificationsPopover />
                  <Link to="./profile">
                    <span className="icon_profile"></span>
                  </Link>
                  <Link to="./search-comic" class="search-switch">
                   <span className="icon_search"></span>
                   </Link>
                  <Link to="./">
                    <span
                      title="Đăng xuất"
                      onClick={handleLogout}
                      className="fa fa-sign-out"
                    ></span>
                  </Link>  
                </>
              ) : (
                <>
                <Link to="./search-comic" class="search-switch">
                   <span class="icon_search"></span>
                   </Link>
                  <Link to="./login">
                    <span className="fa fa-sign-in"></span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
        <div id="mobile-menu-wrap"></div>
      </div>
    </header>
  );
};

export default Header;
