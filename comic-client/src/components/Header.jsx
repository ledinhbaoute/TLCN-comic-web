import React, { useEffect, useState } from "react";
import "../sass/style.scss";
import "../css/AllStyles";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../config/config";
import Cookies from "js-cookie";
import { checkAuth } from "../security/Authentication";

const Header = () => {
  const logoUrl = `${process.env.PUBLIC_URL}/images/logo.png`;

  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();

  const logout = () => {
    Cookies.remove("access_token");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    window.location.reload();
    window.scrollTo({
      top: 0
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/genres`);
        setGenres(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
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
                    <NavLink to="./" activeClassName="active">
                      Trang chủ
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="./genres" activeClassName="active">
                      Thể loại <span className="arrow_carrot-down"></span>
                    </NavLink>
                    <ul className="dropdown">
                      <li>
                        {genres.map((item) => (
                          <Link to="./" key={item.id}>
                            {item.name}
                          </Link>
                        ))}
                      </li>
                      <li>
                        <Link to="./comic-detail">Comic Details</Link>
                      </li>
                      <li>
                        <Link to="./anime-watching.html">Anime Watching</Link>
                      </li>
                      <li>
                        <Link to="./register">Sign Up</Link>
                      </li>
                      <li>
                        <Link to="./login">Login</Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div className="col-lg-2">
            <div className="header__right">
              <Link to="./search" className="search-switch">
                <span className="icon_search"></span>
              </Link>
              {checkAuth() ? (
                <a>
                  <Link to="./profile">
                    <span className="icon_profile"></span>
                  </Link>
                  <Link to="./">
                    <span
                      title="Đăng xuất"
                      onClick={handleLogout}
                      className="icon_close_alt"
                    ></span>
                  </Link>
                </a>
              ) : (
                <Link to="./login">
                  <span className="icon_profile"></span>
                </Link>
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
