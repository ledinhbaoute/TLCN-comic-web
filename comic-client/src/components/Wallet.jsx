import React, { useState, useEffect } from "react";
import "../sass/_wallet-page.scss";
import axios from "axios";
import API_URL from "../config/config";
import AlertDialog from "./dialogs/AlertDialog";
import ConfirmDialog from "./dialogs/ConfirmDialog";
import Cookies from "js-cookie";
import {
  Dialog,
  DialogActions,
  TextField,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Button,
} from "@mui/material";

// Component hiển thị thông tin ví
const Wallet = () => {
  //   const [balance, setBalance] = useState(null); // Số dư
  //   const [creationDate, setCreationDate] = useState(null); // Ngày tạo
  const [transactionHistory, setTransactionHistory] = useState([]); // Lịch sử giao dịch
  const [wallet, setWallet] = useState({
    id: null,
    user: null,
    balance: null,
    createdAt: null,
  });
  const [openAlertDialog, setAlertDialogOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [openConfirmDialog, setConfirmDialogOpen] = useState(false);

  const getTransactions = async () => {
    try {
      const response = await axios.get(`${API_URL}/user/transactions`, {
        headers: {
          Authorization: "Bearer " + Cookies.get("access_token"),
        },
      });
      setTransactionHistory(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getWallet = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/personal_wallet`, {
          headers: {
            Authorization: "Bearer " + Cookies.get("access_token"),
          },
        });
        setWallet(response.data);
        console.log(wallet);
      } catch (error) {
        setWallet(null);
        console.log(error);
      }
    };
    getWallet();
    if (wallet !== "Not registered yet" && wallet !== null) {
      getTransactions();
    }
  }, []);

  const openWallet = async () => {
    try {
      const response = await axios.post(`${API_URL}/user/register_wallet`, {
        headers: {
          Authorization: "Bearer " + Cookies.get("access_token"),
        },
      });
      //   console.log(response.data);
      setAlertMessage("Tạo ví thành công");
      setAlertDialogOpen(true);
    } catch (error) {
      console.log(error);
      setAlertMessage("Tạo ví thất bại, đã có lỗi xảy ra.");
      setAlertMessage(true);
    }
  };

  const handleConfirmClick = (e) => {
    e.preventDefault();
    console.log(Cookies.get("access_token"));
    openWallet();
    setConfirmDialogOpen(false);
  };

  //
  //
  //Nạp tiền
  const [openRechargeDialog, setRechargeDialogOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [paymentUrl, setPaymentUrl] = useState("");
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [openPaymentInfoDialog, setPaymentInfoDialogOpen] = useState(false);

  const handleAmountChange = (e) => {
    const inputValue = e.target.value;

    // Lọc chỉ giữ lại các kí tự số
    const numericValue = inputValue.replace(/\D/g, "");

    // Cập nhật giá trị của amount
    setAmount(numericValue);
  };

  const createPayment = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/user/create_payment`,
        { amount: amount },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Bearer " + Cookies.get("access_token"),
          },
        }
      );
      setPaymentUrl(response.data.data);
      //   console.log(paymentUrl);
    } catch (error) {
      console.log(error);
      setAlertMessage("Đã có lỗi xảy ra");
      setAlertDialogOpen(true);
    }
  };

  useEffect(() => {
    if (paymentUrl) {
      window.location.href = paymentUrl;
    }
  }, [paymentUrl]);

  const handleRechargeClick = async () => {
    await createPayment();
    // console.log(paymentUrl);

    setRechargeDialogOpen(false);
    setPaymentInfoDialogOpen(true);
  };

  //
  //Xử lý trả về
  if (wallet === "Not registered yet") {
    return (
      <div className="wallet-page">
        <Dialog
          open={openConfirmDialog}
          onClose={() => setConfirmDialogOpen(false)}
        >
          <DialogTitle>Đăng ký ví</DialogTitle>
          <DialogContent>
            Bằng việc xác nhận, bạn đồng ý với các điều khoản dịch vụ của chúng
            tôi
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setConfirmDialogOpen(false)}
              sx={{ color: "red" }}
            >
              Hủy
            </Button>
            <Button onClick={handleConfirmClick}>Xác nhận</Button>
          </DialogActions>
        </Dialog>
        <AlertDialog
          open={openAlertDialog}
          onClose={() => setAlertDialogOpen(false)}
          message={alertMessage}
        />
        <p>Bạn chưa mở ví</p>
        <button onClick={() => setConfirmDialogOpen(true)}>
          Mở một ví ngay
        </button>
      </div>
    );
  }

  if (wallet === null) {
    return (
      <div className="wallet-page">
        <p>Lấy thông tin ví thất bại. Vui lòng thử lại sau.</p>
      </div>
    );
  }

  return (
    <div className="wallet-page">
      <AlertDialog
        open={openAlertDialog}
        onClose={() => {
          setAlertDialogOpen(false);
        }}
        message={alertMessage}
      />
      <p>Số dư: {wallet.balance}</p>
      <p>Ngày tạo: {wallet.createdAt}</p>
      <h2>Lịch sử giao dịch</h2>
      <button
        className="add-button"
        onClick={() => setRechargeDialogOpen(true)}
      >
        Nạp tiền
      </button>
      <Dialog
        open={openRechargeDialog}
        onClose={() => setRechargeDialogOpen(false)}
      >
        <DialogTitle>Nạp tiền</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {"Nhập số tiền bạn muốn nạp vào ví. (Đơn vị: VNĐ)"}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Số tiền muốn nạp"
            type="text"
            value={Number(amount).toLocaleString()}
            onChange={handleAmountChange}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRechargeDialogOpen(false)}>Hủy</Button>
          <Button onClick={handleRechargeClick}>Xác nhận</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openPaymentInfoDialog}
        onClose={() => setPaymentInfoDialogOpen(false)}
      >
        <DialogTitle>Kết quả giao dịch</DialogTitle>
        <DialogContent>
          {!paymentInfo ? (
            <div>Loading...</div>
          ) : (
            <div>
              <h1>Payment Information</h1>
              <p>Amount: {paymentInfo.vnp_Amount}</p>
              <p>Pay Date: {paymentInfo.vnp_PayDate}</p>
              <p>Response Code: {paymentInfo.vnp_ResponseCode}</p>
              <p>Transaction Status: {paymentInfo.vnp_TransactionStatus}</p>
              <p>Transaction No: {paymentInfo.vnp_TransactionNo}</p>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPaymentInfoDialogOpen(false)}>Thoát</Button>
        </DialogActions>
      </Dialog>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nội dung</th>
            <th>Số tiền giao động</th>
            <th>Thời gian</th>
          </tr>
        </thead>
        <tbody>
          {transactionHistory.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.title}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Wallet;
