import React, { useState } from "react";
import "../sass/style.scss";
import "../css/AllStyles";
import { Link } from "react-router-dom";

const Login = () => {
  const imgBgUrl = `${process.env.PUBLIC_URL}images/normal-breadcrumb.jpg`

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  var message

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if(username=="Bao" && password=="Bao")
      message = "Đăng nhập thành công"
    else
      message = "Đăng nhập thất bại"

    window.alert(message)
  };

  return (
    <div>
      {/* <!-- Normal Breadcrumb Begin --> */}
      <section
        class="normal-breadcrumb set-bg"
        style={{ backgroundImage: `url(${imgBgUrl})`}}
      >
        <div class="container">
          <div class="row">
            <div class="col-lg-12 text-center">
              <div class="normal__breadcrumb__text">
                <h2>Đăng nhập</h2>
                <p>Chào mừng đến với BQComic</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Normal Breadcrumb End --> */}

      {/* <!-- Login Section Begin --> */}
      <section class="login spad">
        <div class="container">
          <div class="row">
            <div class="col-lg-6">
              <div class="login__form">
                <h3>Đăng nhập</h3>
                <form onSubmit={handleFormSubmit}>
                  <div class="input__item">
                    <input
                      type="text"
                      id="username"
                      placeholder="Tên đăng nhập"
                      value={username}
                      onChange={handleUsernameChange}
                    />
                    <span class="icon_mail"></span>
                  </div>
                  <div class="input__item">
                    <input
                      type="password"
                      id="password"
                      placeholder="Mật khẩu"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                    <span class="icon_lock"></span>
                  </div>
                  <button type="submit" class="site-btn">
                    Đăng nhập
                  </button>
                </form>
                <Link to="../forgetpass" class="forget_pass">
                  Quên mật khẩu?
                </Link>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="login__register">
                <h3>Chưa có tài khoản?</h3>
                <Link to="../register" class="primary-btn">
                  Đăng ký ngay
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Login Section End --> */}
    </div>
  );
};

export default Login;
