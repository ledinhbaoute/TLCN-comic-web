import React, { useState } from "react";
import "../sass/style.scss";
import "../css/AllStyles";
import { Link, redirect } from "react-router-dom";
import axios from "axios";
import API_URL from "../config/config";
import Cookies from "js-cookie";
import { useNavigateTo } from "../service/navigation";

const Login = () => {
  const imgBgUrl = `${process.env.PUBLIC_URL}images/normal-breadcrumb.jpg`;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigateTo();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const login = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/u/login`,
        { username: username, password: password },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
        Cookies.set("access_token", response.data.accessToken);
        navigate("/");
    } catch (error) {
      window.alert("Đăng nhập thất bại. Sai tên đăng nhập hoặc mật khẩu");
      console.error(error);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    login();
  };

  return (
    <div>
      {/* <!-- Normal Breadcrumb Begin --> */}
      <section
        className="normal-breadcrumb set-bg"
        style={{ backgroundImage: `url(${imgBgUrl})` }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="normal__breadcrumb__text">
                <h2>Đăng nhập</h2>
                <p>Chào mừng đến với BQComic</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Normal Breadcrumb End --> */}

      {/* <!-- Login Section Begin --> */}
      <section className="login spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="login__form">
                <h3>Đăng nhập</h3>
                <form onSubmit={handleFormSubmit}>
                  <div className="input__item">
                    <input
                      type="text"
                      id="username"
                      placeholder="Tên đăng nhập"
                      value={username}
                      onChange={handleUsernameChange}
                    />
                    <span className="icon_mail"></span>
                  </div>
                  <div className="input__item">
                    <input
                      type="password"
                      id="password"
                      placeholder="Mật khẩu"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                    <span className="icon_lock"></span>
                  </div>
                  <button type="submit" className="site-btn">
                    Đăng nhập
                  </button>
                </form>
                <Link to="../forgetpass" className="forget_pass">
                  Quên mật khẩu?
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="login__register">
                <h3>Chưa có tài khoản?</h3>
                <Link to="../register" className="primary-btn">
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
