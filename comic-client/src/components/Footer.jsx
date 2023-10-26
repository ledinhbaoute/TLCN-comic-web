import React from "react";
import "../sass/style.scss";
import "../css/AllStyles";
import logo from "../img/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
  };
  return (
    <footer class="footer">
      <div class="page-up">
        <a onClick={handleScrollToTop} id="scrollToTopButton">
          <span class="arrow_carrot-up"></span>
        </a>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-lg-3">
            <div class="footer__logo">
              <Link to="./index.html">
                <img src={logo} alt="" />
              </Link>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="footer__nav">
              <ul>
                <li class="active">
                  <Link to="./index.html">Homepage</Link>
                </li>
                <li>
                  <Link to="./categories.html">Categories</Link>
                </li>
                <li>
                  <Link to="./blog.html">Our Blog</Link>
                </li>
                <li>
                  <Link to="#">Contacts</Link>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-lg-3">
            <p>
              {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
              Copyright &copy;{currentYear} All rights reserved | This template
              is made with <i className="fa fa-heart" aria-hidden="true"></i> by{" "}
              <Link
                href="https://colorlib.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Colorlib
              </Link>
              {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
