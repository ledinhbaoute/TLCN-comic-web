import React from "react";
import "../sass/style.scss";
import "../css/AllStyles";
import { Link } from "react-router-dom";

const Footer = () => {
  const logoUrl=`${process.env.PUBLIC_URL}/images/logo.png`
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
                <img src={logoUrl} alt="" />
              </Link>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="footer__nav">
              <ul>
                <li class="active">
                  <Link to="./">Về chúng tôi</Link>
                </li>
                <li>
                  <Link to="./">Điều khoản</Link>
                </li>
                <li>
                  <Link to="./">Quyền riêng tư</Link>
                </li>
                <li>
                  <Link to="#">Liên hệ</Link>
                </li>
              </ul>
            </div>
          </div>
       
        </div>
      </div>
    </footer>
  );
};

export default Footer;
