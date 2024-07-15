import React from "react";
import "../sass/style.scss";
import "../css/AllStyles";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import API_URL from "../config/config";
import OtpDialogInput from "./dialogs/OTPDialogInput";
import Loading from "./Loading";
import toast from "react-hot-toast";

const Register = () => {
  const imgBgUrl = `${process.env.PUBLIC_URL}images/normal-breadcrumb.jpg`;

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [birthdate,setBirthDate]=useState(new Date())
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpDialogOpen, setOtpDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOlderThanToday, setIsOlderThanToday] = useState(false);

  const handleFullnameChange = (event) => {
    setFullname(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleBirthDateChange=(event)=>{
    const selectedDate = event.target.value;
    setBirthDate(selectedDate);
    const birthDateObject = new Date(selectedDate);
    const today = new Date();
    setIsOlderThanToday(birthDateObject < today);
  }

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
          birthDate: birthdate,
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
    if(!isOlderThanToday){
      toast.error("Ngày sinh vượt quá ngày hiện tại",{position:"top-right"});
      return;
    }

    const registerResponse = await register();
    console.log(birthdate)
    if (!registerResponse.data.status){
      
    
    toast.error(registerResponse.data.message,{duration:3000,position:"top-right"})
  }
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
                      required
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
                      required
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
                      required
                      onChange={handleFullnameChange}
                    />
                    <span className="icon_info"></span>
                  </div>
                  <h5 style={{marginTop:0}}>Ngày sinh</h5>
                  <div className="input__item">
                    
                    <input
                      className="inputText"
                      type="date"
                      id="birthdate"
                      placeholder="Ngày Sinh"
                      value={birthdate}
                      required
                      onChange={handleBirthDateChange}
                    />
                    <span className="fa fa-calendar"></span>
                  </div>
                  <div className="input__item">
                    <input
                      className="inputText"
                      type="password"
                      id="password"
                      placeholder="Mật khẩu"
                      value={password}
                      required
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
                      required
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
