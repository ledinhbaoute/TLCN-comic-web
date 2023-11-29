import React from "react";
import "../sass/style.scss";
import "../css/AllStyles";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import API_URL from "../config/config";
import { useNavigateTo } from "../service/navigation";
import OtpDialogInput from "./OTPDialogInput";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Register = () => {
  const imgBgUrl = `${process.env.PUBLIC_URL}images/normal-breadcrumb.jpg`;

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpDialogOpen, setOtpDialogOpen] = useState(false);

  const navigate = useNavigateTo();

  const handleFullnameChange = (event) => {
    setFullname(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleOtpChange = (event) => {
    setOtp(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleOpenDialog = () => {
    setOtpDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setOtpDialogOpen(false);
  };

  const handleOtpSubmit = () => {
    // Xử lý logic khi người dùng gửi mã OTP
    console.log("OTP:", otp);
    handleCloseDialog();
  };

  const register = async () => {
    try {
      const response = axios.post(
        `${API_URL}/register`,
        {
          name: fullname,
          email: email,
          username: username,
          password: password,
          confirmPass: confirmPassword,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const verifyOtp = async (otp) => {
    const response = await axios.post(
      `${API_URL}/otp/verify_registration`,
      { otp: otp, email: email },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response;
  };

  const handleRegisterFormSubmit = async (event) => {
    event.preventDefault();

    const registerResponse = await register();
    console.log(registerResponse.data);
    if (!registerResponse.data.status)
      window.alert("Tên đăng nhập hoặc email đã được sử dụng");
    else {
      handleOpenDialog();
      console.log(otpDialogOpen);
      handleOtpSubmit();
    }
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
                <h2>Đăng ký</h2>
                <p>Chào mừng đến với BQComic</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Normal Breadcrumb End --> */}

      {/* <!-- Signup Section Begin --> */}
      <section className="signup spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="login__form">
                <h3>Đăng ký</h3>
                <form onSubmit={handleRegisterFormSubmit}>
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
                      type="email"
                      id="email"
                      placeholder="Email"
                      value={email}
                      onChange={handleEmailChange}
                    />
                    <span className="icon_mail"></span>
                  </div>
                  <div className="input__item">
                    <input
                      type="text"
                      id="fullname"
                      placeholder="Họ và tên"
                      value={fullname}
                      onChange={handleFullnameChange}
                    />
                    <span className="icon_info"></span>
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
                  <div className="input__item">
                    <input
                      type="password"
                      id="confirmPassword"
                      placeholder="Nhập lại mật khẩu"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                    />
                    <span className="icon_lock"></span>
                  </div>
                  <button type="submit" className="site-btn">
                    Đăng ký
                  </button>
                </form>
                {otpDialogOpen && <Dialog>
                  <DialogTitle>Nhập OTP</DialogTitle>
                  <DialogContent>
                    <TextField
                      label="OTP"
                      variant="outlined"
                      type="number"
                      value={otp}
                      onChange={handleOtpChange}
                    />
                  </DialogContent>
                  <DialogContent>
                    <Button variant="contained" onClick={handleOtpSubmit}>
                      Xác nhận
                    </Button>
                  </DialogContent>
                </Dialog>}
                {/* <h5>
                  Đã có tài khoản?{" "}
                  <Link to="../login">
                    {" "}
                    <a>Đăng nhập!</a>{" "}
                  </Link>
                </h5> */}
              </div>
            </div>
            <div className="col-lg-6">
              <div className="login__register">
                <h3>Đã có tài khoản</h3>
                <Link to="../login" className="primary-btn">
                  Đăng nhập
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Signup Section End --> */}
    </div>
  );
};

export default Register;
