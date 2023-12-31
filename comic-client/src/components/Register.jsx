import React from "react";
import "../sass/style.scss";
import "../css/AllStyles";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import API_URL from "../config/config";
import { useNavigateTo } from "../service/navigation";
import OtpDialogInput from "./dialogs/OTPDialogInput";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Loading from "./Loading";

const Register = () => {
  const imgBgUrl = `${process.env.PUBLIC_URL}images/normal-breadcrumb.jpg`;

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpDialogOpen, setOtpDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const registerFailReasons = {
    "Password must be 8 or more characters in length.":
      "Mật khẩu phải từ 8 ký tự trở lên",
    "Password must contain 1 or more lowercase characters.":
      "Mật khẩu phải có tối thiểu 1 ký tự viết thường",
    "Password must contain 1 or more uppercase characters.":
      "Mật khẩu phải có tối thiểu 1 ký tự viết hoa",
    "Password must contain 1 or more digit characters.":
      "Mật khẩu phải có tối thiểu 1 ký tự số",
    "Password must contain 1 or more special characters.":
      "Mật khẩu phải có tối thiểu 1 ký tự đặc biệt",
    "User name or Email already exist!":
      "Tên đăng nhập hoặc email đã được đăng ký",
    "Password and confirm password doesn't match!":
      "Mật khẩu nhập lại không khớp",
  };

  const navigate = useNavigateTo();

  const handleFullnameChange = (event) => {
    setFullname(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleUsernameChange = (event) => {
    const inputValue = event.target.value;
    const filteredValue = inputValue.replace(/[^a-z0-9]/g, '');
    setUsername(filteredValue);
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

  const register = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
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
    } finally {
      setIsLoading(false);
    }
  };

  // const verifyOtp = async () => {
  //   try {
  //     const response = await axios.post(
  //       `${API_URL}/verify_registration`,
  //       { otp: otp, email: email },
  //       {
  //         headers: {
  //           "Content-Type": "application/x-www-form-urlencoded",
  //         },
  //       }
  //     );
  //     return response;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleRegisterFormSubmit = async (event) => {
    event.preventDefault();

    const registerResponse = await register();
    // console.log(registerResponse.data);
    if (!registerResponse.data.status)
      window.alert(registerResponse.data.message);
    else {
      handleOpenDialog();
      // console.log(otpDialogOpen);
    }
  };

  // const handleOtpSubmit = async () => {
  //   Xử lý logic khi người dùng gửi mã OTP
  //   console.log("OTP:", otp);
  //   const verifyResponse = await verifyOtp();
  //   if (!verifyResponse.data.status) window.alert(verifyResponse.data.message);
  //   else {
  //     window.alert("Tạo tài khoản thành công");
  //     navigate("/login");
  //   }
  //   handleCloseDialog();
  // };

  return (
    <div>
      {isLoading && <Loading />}
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
                      className="inputText"
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
                      className="inputText"
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
                      className="inputText"
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
                      className="inputText"
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
                      className="inputText"
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
                {/* <Dialog open={otpDialogOpen}>
                  <DialogTitle>Nhập OTP</DialogTitle>
                  <DialogContent>
                    <a>Nhập mã OTP được gửi tới email của bạn</a>
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
                </Dialog> */}
                <OtpDialogInput open={otpDialogOpen} onClose={()=>setOtpDialogOpen(false)} otpType={"register"} email={email}/>
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
