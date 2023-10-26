import React from "react";
import "../sass/style.scss";
import "../css/AllStyles";
import logo from "../img/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <header className="header">
        <div className="container">
          <div className="row">
            <div className="col-lg-2">
              <div className="header__logo">
                <Link to="./">
                  <img src={logo} alt="" />
                </Link>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="header__nav">
                <nav className="header__menu mobile-menu">
                  <ul>
                    <li className="active">
                      <Link to="./">Homepage</Link>
                    </li>
                    <li>
                      <Link to="./categories.html">
                        Categories <span className="arrow_carrot-down"></span>
                      </Link>
                      <ul className="dropdown">
                        <li>
                          <Link to="./categories.html">Categories</Link>
                        </li>
                        <li>
                          <Link to="./anime-details.html">Anime Details</Link>
                        </li>
                        <li>
                          <Link to="./anime-watching.html">Anime Watching</Link>
                        </li>
                        <li>
                          <Link to="./blog-details.html">Blog Details</Link>
                        </li>
                        <li>
                          <Link to="./signup.html">Sign Up</Link>
                        </li>
                        <li>
                          <Link to="./login">Login</Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Link to="./blog.html">Our Blog</Link>
                    </li>
                    <li>
                      <Link to="#">Contacts</Link>
                    </li>
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

      <script src="../js/jquery-3.3.1.min.js"></script>
      <script src="../js/bootstrap.min.js"></script>
      <script src="../js/player.js"></script>
      <script src="../js/jquery.nice-select.min.js"></script>
      <script src="../js/mixitup.min.js"></script>
      <script src="../js/jquery.slicknav.js"></script>
      <script src="../js/owl.carousel.min.js"></script>
      <script src="../js/main.js"></script>
    </div>
  );
};

export default Header;
