import React from "react";
// import "../sass/style.scss";
// import "../css/AllStyles";
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
    <footer className="footer">
      <div className="page-up">
        <a onClick={handleScrollToTop} id="scrollToTopButton">
          <span className="arrow_carrot-up"></span>
        </a>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <div className="footer__logo">
              <Link to="./">
                <img src={logoUrl} alt="" />
              </Link>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="footer__nav">
              <ul>
                <li className="active">
                  <Link to="./">Về chúng tôi</Link>
                </li>
                <li>
                  <Link to="./">Điều khoản</Link>
                </li>
                <li>
                  <Link to="./">Quyền riêng tư</Link>
                </li>
                <li>
                  <Link to="/">Liên hệ</Link>
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
