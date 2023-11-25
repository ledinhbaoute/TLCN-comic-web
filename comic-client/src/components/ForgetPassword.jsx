import React, { useState } from "react";
import "../sass/style.scss";
import "../css/AllStyles";
import { Link } from "react-router-dom";

const ForgetPassword = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleOtpChange = (event) => {
    setOtp(event.target.value);
  };

  const handleFormInfoSubmit = (event) => {
    event.preventDefault();

    if (username == "Bao" && email == "Bao") setIsOpen(true);
    else setIsOpen(false);
  };

  const handleFormOtpSubmit = (event) => {
    event.preventDefault();
    var message
    if (otp =="123456")
        message = "Đúng"
    else message = "Sai"

    window.alert(message)

  }

  return (
    <section className="login spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="login__form">
              <h3>Lấy lại mật khẩu</h3>
              <form onSubmit={handleFormInfoSubmit}>
                <div className="input__item">
                  <input
                    type="text"
                    id="username"
                    placeholder="Tên đăng nhập"
                    value={username}
                    onChange={handleUsernameChange}
                  />
                  <span className="icon_profile"></span>
                </div>
                <div className="input__item">
                  <input
                    type="text"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                  <span className="icon_mail"></span>
                </div>
                <button type="submit" className="site-btn">
                  Xác nhận
                </button>
              </form>
              <div>
                {isOpen && (
                  <form onSubmit={handleFormOtpSubmit}>
                  <div className="input__item">
                    <input
                      type="text"
                      id="otp"
                      placeholder="Nhập otp"
                      value={otp}
                      onChange={handleOtpChange}
                    />
                    <span className="icon_lock"></span>
                  </div>
                  <button type="submit" className="site-btn">
                    Xác nhận
                  </button>
                </form>
                )}
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="login__register">
              <h3>Đã có tài khoản?</h3>
              <Link to="../login" className="primary-btn">
                Đăng nhập ngay
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgetPassword;
