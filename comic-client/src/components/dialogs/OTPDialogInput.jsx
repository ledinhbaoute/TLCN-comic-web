import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import { DialogContentText, DialogActions } from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";
import API_URL from "../../config/config";
import axios from "axios";
import { useNavigateTo } from "../../service/navigation";

const OtpDialogInput = ({ open, onClose, otpType, email , ...props}) => {
  const otpURL = {
    register: `${API_URL}/verify_registration`,
    resetpassword: `${API_URL}/verify_resetPassword`,
  };

  const navigate = useNavigateTo();

  const otpResponseMessageList = {
    "OTP Invalid!": "Nhập sai OTP, vui lòng nhập lại",
    "OTP Expired!": "OTP đã hết hạn",
    Success: "Xác thực thành công",
  };
  const [otp, setOtp] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [finishVerify, setFinishVerify] = useState(false);

  const handleChange = (newValue) => {
    setOtp(newValue);
  };

  useEffect(() => {
    setOtp("");
    setFinishVerify(false);
  }, []);

  const verifyOtp = async () => {
    try {
      const response = await axios.post(
        otpURL[otpType],
        { otp: otp, email: email },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    // Xử lý logic khi người dùng gửi mã OTP
    e.preventDefault();

    const verifyResponse = await verifyOtp();
    if (!verifyResponse.data.status) {
      setResponseMessage(otpResponseMessageList[verifyResponse.data.message]);
      if (verifyResponse.data.message === "OTP Expired!") {
        setFinishVerify(true);
      }
    } else {
      setResponseMessage(otpResponseMessageList.Success);
      setFinishVerify(true);
      // navigate("/login");
      // console.log("OTP:", otp);
      // onClose();
    }
  };

  const handleCloseRedirect = () => {
    onClose();
    if(otpType==="register")
      navigate("/login");
    else if(otpType==="resetpassword")
      props.openResetPassForm();
  };

  const handleClose = () => {
    onClose();
  }

  return (
    <React.Fragment>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Nhập OTP</DialogTitle>
        {!finishVerify && (
          <>
            <DialogContent>
              <DialogContentText>
                Nhập mã OTP đã được gửi về email của bạn
              </DialogContentText>
              <DialogContentText  style={{color: "black"}} sx={{my: 1}}>{responseMessage}</DialogContentText>
              <MuiOtpInput
                length={6}
                value={otp}
                onChange={handleChange}
                validateChar={(val) => !isNaN(val)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} style={{ color: "red" }}>
                Hủy
              </Button>
              <Button onClick={handleSubmit}>Xác nhận</Button>
            </DialogActions>
          </>
        )}
        {finishVerify && (
          <>
            <DialogContentText sx={{mx: 2, my: 1}}>{responseMessage}</DialogContentText>
            <DialogActions>
              <Button onClick={handleCloseRedirect}>Xác nhận</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </React.Fragment>
  );
};

export default OtpDialogInput;
