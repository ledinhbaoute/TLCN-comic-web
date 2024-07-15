import React, { useState } from "react";
import "../sass/style.scss";
import "../css/AllStyles";
import { Link } from "react-router-dom";
import axios from "axios";
import API_URL from "../config/config";
import { useNavigateTo } from "../service/navigation";
import OtpDialogInput from "./dialogs/OTPDialogInput";
import Loading from "./Loading";
import toast from "react-hot-toast"

const ForgetPassword = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  // const [otp, setOtp] = useState("");
  const [otpDialogOpen, setOtpDialogOpen] = useState(false);
  const [resetPassFormOpen, setResetPassFormOpen] = useState(false);
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfỉrmPass] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigateTo();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // const handleOtpChange = (event) => {
  //   setOtp(event.target.value);
  // };

  const handleNewPassChange = (event) => {
    setNewPass(event.target.value);
  };

  const handleConfirmPassChange = (event) => {
    setConfỉrmPass(event.target.value);
  };

  const handleOpenDialog = () => {
    setOtpDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setOtpDialogOpen(false);
  };

  const forgetpass = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${API_URL}/forgot_password`,
        { username: username, email: email },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      return response;
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // const verifyOtp = async () => {
  //   try {
  //     const response = await axios.post(
  //       `${API_URL}/verify_resetPassword`,
  //       { otpCode: otp, email: email },
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

  const resetpass = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/reset_password`,
        { email: email, newPass: newPass, confirmPass: confirmPass },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      return response;
    } catch (error) {}
  };

  const handleInfoSubmit = async (event) => {
    event.preventDefault();

    const forgetpassResponse = await forgetpass();
    if (!forgetpassResponse.data.status)
    toast.error(forgetpassResponse.data.message,{
      position:"top-right",
      duration:3000
    })
    else {
      handleOpenDialog();
    }
  };

  const handleResetPassSubmit = async (event) => {
    event.preventDefault();

    const resetPassResponse = await resetpass();
    if (!resetPassResponse.data.status)
      toast.error(resetPassResponse.data.message,{
        duration:3000,
        position:"top-right"
      })
    else {
      toast.success("Cập nhật mật khẩu thành công!",{
        duration:3000,
        position:"top-right"
      })
      setResetPassFormOpen(false);
      navigate("/login");
    }
  };

  // const handleOtpSubmit = async (event) => {
  //   event.preventDefault();

  //   const verifyResponse = await verifyOtp();
  //   if (!verifyResponse.data.status) window.alert(verifyResponse.data.message);
  //   else {
  //     window.alert("Xác thực thành công. Mời nhập mật khẩu mới");
  //     handleCloseDialog();
  //     setResetPassFormOpen(true);
  //   }
  // };

  return (
    <>
   
    {isLoading && <Loading/>}
      <section className="login spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="login__form">
                <h3>Lấy lại mật khẩu</h3>
                {!resetPassFormOpen && (
                  <form onSubmit={handleInfoSubmit}>
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
                    <button type="submit" className="site-btn">
                      Xác nhận
                    </button>
                  </form>
                )}
                {resetPassFormOpen && (
                  <form onSubmit={handleResetPassSubmit}>
                    <div className="input__item">
                      <input
                        type="password"
                        id="newPass"
                        placeholder="Mật khẩu mới"
                        value={newPass}
                        onChange={handleNewPassChange}
                      />
                      <span className="icon_lock"></span>
                    </div>
                    <div className="input__item">
                      <input
                        type="password"
                        id="confirmPass"
                        placeholder="Nhập lại mật khẩu"
                        value={confirmPass}
                        onChange={handleConfirmPassChange}
                      />
                      <span className="icon_lock"></span>
                    </div>
                    <button type="submit" className="site-btn">
                      Xác nhận
                    </button>
                  </form>
                )}
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
                <OtpDialogInput
                  open={otpDialogOpen}
                  onClose={handleCloseDialog}
                  otpType={"resetpassword"}
                  email={email}
                  openResetPassForm={() => setResetPassFormOpen(true)}
                />
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
    </>
  );
};

export default ForgetPassword;
