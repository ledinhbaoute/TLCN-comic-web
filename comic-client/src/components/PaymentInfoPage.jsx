import React, { useEffect, useState } from "react";
import "../css/payment-info.css";
import axios from "axios";
import API_URL from "../config/config";
import Cookies from "js-cookie";

const PaymentInfoPage = () => {
  const [paymentInfo, setPaymentInfo] = useState({});

  // const topUpMoney = async () => {
  //   try {
  //     const response = await axios.post(
  //       `${API_URL}/user/top_up`,
  //       { amount: paymentInfo.vnp_Amount / 100 },
  //       {
  //         headers: {
  //           "Content-Type": "application/x-www-form-urlencoded",
  //           Authorization: "Bearer " + Cookies.get("access_token"),
  //         },
  //       }
  //     );
  //     // console.log(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    // Lấy thông tin thanh toán từ URL hoặc Local Storage/Cookies
    const urlParams = new URLSearchParams(window.location.search);
    const vnp_Amount = urlParams.get("vnp_Amount");
    const vnp_PayDate = urlParams.get("vnp_PayDate");
    const vnp_ResponseCode = urlParams.get("vnp_ResponseCode");
    const vnp_TransactionStatus = urlParams.get("vnp_TransactionStatus");
    const vnp_TransactionNo = urlParams.get("vnp_TransactionNo");

    // Lưu thông tin thanh toán vào state
    setPaymentInfo({
      vnp_Amount,
      vnp_PayDate,
      vnp_ResponseCode,
      vnp_TransactionStatus,
      vnp_TransactionNo,
    });
    
  }, []);

  // useEffect(()=> {
  //   console.log(paymentInfo);
  //   if(paymentInfo.vnp_ResponseCode==="00" && paymentInfo.vnp_TransactionStatus==="00")
  //     topUpMoney();
  // }, [paymentInfo]);

  

  const errorMessages = [
    { code: "00", message: "Giao dịch thành công" },
    {
      code: "07",
      message:
        "Trừ tiền thành công. Giao dịch bị nghi ngờ (liên quan tới lừa đảo, giao dịch bất thường)",
    },
    {
      code: "09",
      message:
        "Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng chưa đăng ký dịch vụ InternetBanking tại ngân hàng",
    },
    {
      code: "10",
      message:
        "Giao dịch không thành công do: Khách hàng xác thực thông tin thẻ/tài khoản không đúng quá 3 lần",
    },
    {
      code: "11",
      message:
        "Giao dịch không thành công do: Đã hết hạn chờ thanh toán. Xin quý khách vui lòng thực hiện lại giao dịch",
    },
    {
      code: "12",
      message:
        "Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng bị khóa",
    },
    {
      code: "13",
      message:
        "Giao dịch không thành công do Quý khách nhập sai mật khẩu xác thực giao dịch (OTP). Xin quý khách vui lòng thực hiện lại giao dịch",
    },
    {
      code: "24",
      message: "Giao dịch không thành công do: Khách hàng hủy giao dịch",
    },
    {
      code: "51",
      message:
        "Giao dịch không thành công do: Tài khoản của quý khách không đủ số dư để thực hiện giao dịch",
    },
    {
      code: "65",
      message:
        "Giao dịch không thành công do: Tài khoản của Quý khách đã vượt quá hạn mức giao dịch trong ngày",
    },
    { code: "75", message: "Ngân hàng thanh toán đang bảo trì" },
    {
      code: "79",
      message:
        "Giao dịch không thành công do: KH nhập sai mật khẩu thanh toán quá số lần quy định. Xin quý khách vui lòng thực hiện lại giao dịch",
    },
    {
      code: "99",
      message:
        "Các lỗi khác (lỗi còn lại, không có trong danh sách mã lỗi đã liệt kê)",
    },
  ];

  return (
    <div className="payment-info">
      <h1>Thông tin thanh toán</h1>
      <p>Số tiền: {Number(paymentInfo.vnp_Amount / 100).toLocaleString()}VNĐ</p>
      <p>Ngày thanh toán: {Date(paymentInfo.vnp_PayDate)}</p>
      <p>
        Kết quả giao dịch:{" "}
        {
          errorMessages.find(
            (error) => error.code === paymentInfo.vnp_ResponseCode
          )?.message
        }
      </p>
      <p>Mã giao dịch: {paymentInfo.vnp_TransactionNo}</p>
    </div>
  );
};

export default PaymentInfoPage;
