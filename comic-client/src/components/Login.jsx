import React, { useState } from "react";
import "../sass/style.scss";
import "../css/AllStyles";
import { Link} from "react-router-dom";
import axios from "axios";
import API_URL from "../config/config";
import Cookies from "js-cookie";
import { useNavigateTo } from "../service/navigation";
import toast from "react-hot-toast";

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
  
  const getUser = async () => {
    try {
      const response = await axios.get(`${API_URL}/user`, {
        headers: {
          Authorization: "Bearer " + Cookies.get("access_token"),
        },
      });
      window.sessionStorage.setItem("userid", response.data.id);
    } catch (error) {
      console.log(error);
    }
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
        await getUser();
        navigate("/");
    } catch (error) {
      toast.error("Đăng nhập thất bại. Sai tên đăng nhập hoặc mật khẩu",{
        duration: 3000,
        position: 'top-right',
      });
      
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
                    className="inputText"
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
                    className="inputText"
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
