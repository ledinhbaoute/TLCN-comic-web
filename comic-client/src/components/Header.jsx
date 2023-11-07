import React from "react";
import "../sass/style.scss";
import "../css/AllStyles";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  const logoUrl = `${process.env.PUBLIC_URL}/images/logo.png`;

  var genres = [
    "Lãng mạn",
    "Trinh thám",
    "Hài hước",
    "Chuyển sinh",
    "Học đường",
    "Hành động",
  ];
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
                        {genres.map((item, index) => (
                          <Link to="./" key={index}>{item}</Link>
                        ))}
                      </li>
                      <li>
                        <Link to="./anime-detail">Anime Details</Link>
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
                  {/* <li>
                      <Link to="./blog.html">Our Blog</Link>
                    </li>
                    <li>
                      <Link to="#">Contacts</Link>
                    </li> */}
                </ul>
              </nav>
            </div>
          </div>
          <div className="col-lg-2">
            <div className="header__right">
              <a href="#" className="search-switch">
                <span className="icon_search"></span>
              </a>
              <Link to="./login">
                <span className="icon_profile"></span>
              </Link>
            </div>
          </div>
        </div>
        <div id="mobile-menu-wrap"></div>
      </div>
    </header>
  );
};

export default Header;
