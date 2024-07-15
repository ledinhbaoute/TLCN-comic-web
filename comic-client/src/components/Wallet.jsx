import React, { useState, useEffect } from "react";
import "../sass/_wallet-page.scss";
import axios from "axios";
import API_URL from "../config/config";
import AlertDialog from "./dialogs/AlertDialog";
import { format } from "date-fns";
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
import { Link } from "react-router-dom";

// Component hiển thị thông tin ví
const Wallet = () => {
  //   const [balance, setBalance] = useState(null); // Số dư
  //   const [creationDate, setCreationDate] = useState(null); // Ngày tạo
  const [transactionHistory, setTransactionHistory] = useState([]); // Lịch sử giao dịch
  const [rcvDonateHistory, setrcvDonateHistory] = useState([]);
  const [sendDonateHistory, setSendDonateHistory] = useState([]);
  const [wallet, setWallet] = useState({
    id: null,
    user: null,
    balance: null,
    createdAt: null,
  });
  const [openAlertDialog, setAlertDialogOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [openConfirmDialog, setConfirmDialogOpen] = useState(false);

  useEffect(()=>{
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
    if (wallet !== null && wallet !== 'Not registered yet') {
      getTransactions()
    }
  },[wallet])


  useEffect(()=>{
    const getRcvDonates = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/received_donate_history`, {
          headers: {
            Authorization: "Bearer " + Cookies.get("access_token"),
          },
        });
        setrcvDonateHistory(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (wallet !== null && wallet !== 'Not registered yet') {
      getRcvDonates()
    }
  },[wallet])
  

  useEffect(() => {
    const getSendDonates = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/donate_history`, {
          headers: {
            Authorization: "Bearer " + Cookies.get("access_token"),
          },
        });
        setSendDonateHistory(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (wallet !== null && wallet !== 'Not registered yet') {
      getSendDonates()
    }
  }, [wallet])


  useEffect(() => {
    const getWallet = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/personal_wallet`, {
          headers: {
            Authorization: "Bearer " + Cookies.get("access_token"),
          },
        });
        setWallet(response.data);
      } catch (error) {
        setWallet(null);
        console.log(error);
      }
    };
    getWallet();
  }, []);

  //
  //Phân trang bảng transactions
  const [currentTransactionPage, setCurrentTransactionPage] = useState(1);
  const transactionPageNumbers = [];
  const transactionPerPage = 5;
  for (let i = 1; i <= Math.ceil(transactionHistory.length / transactionPerPage); i++) {
    transactionPageNumbers.push(i);
  }

  const indexOfLastTransaction = currentTransactionPage * transactionPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionPerPage;
  const currentTransactions = transactionHistory.slice(indexOfFirstTransaction, indexOfLastTransaction);
  const handleTransactionPageChange = (event) => {
    setCurrentTransactionPage(Number(event.target.id));
  };

  //
  //Phân trang bảng nhận donate
  const [currentrcvDonatePage, setCurrentrcvDonatePage] = useState(1);
  const rcvDonatePageNumbers = [];
  const rcvDonatePerPage = 5;
  for (let i = 1; i <= Math.ceil(rcvDonateHistory.length / rcvDonatePerPage); i++) {
    rcvDonatePageNumbers.push(i);
  }

  const indexOfLastrcvDonate = currentrcvDonatePage * rcvDonatePerPage;
  const indexOfFirstrcvDonate = indexOfLastrcvDonate - rcvDonatePerPage;
  const currentrcvDonates = rcvDonateHistory.slice(indexOfFirstrcvDonate, indexOfLastrcvDonate);
  const handlercvDonatePageChange = (event) => {
    setCurrentrcvDonatePage(Number(event.target.id));
  };

  //
  //Phân trang bảng gửi donate
  const [currentSendDonatePage, setCurrentSendDonatePage] = useState(1);
  const sendDonatePageNumbers = [];
  const sendDonatePerPage = 5;
  for (let i = 1; i <= Math.ceil(sendDonateHistory.length / sendDonatePerPage); i++) {
    sendDonatePageNumbers.push(i);
  }

  const indexOfLastSendDonate = currentSendDonatePage * sendDonatePerPage;
  const indexOfFirstSendDonate = indexOfLastSendDonate - sendDonatePerPage;
  const currentSendDonates = sendDonateHistory.slice(indexOfFirstSendDonate, indexOfLastSendDonate);
  const handleSendDonatePageChange = (event) => {
    setCurrentSendDonatePage(Number(event.target.id));
  };


  const openWallet = async () => {
    try {
      await axios.post(`${API_URL}/user/register_wallet`, {}, {
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
      <p>Số dư: {Number(wallet.balance).toLocaleString()} đ</p>
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
          <div>Loading...</div>
        </DialogContent>
      </Dialog>
      <div className="transaction-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nội dung</th>
              <th>Số tiền</th>
              <th>Thời gian</th>
              <th>Số dư</th>
            </tr>
          </thead>
          <tbody>
            {currentTransactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{transaction.title}</td>
                <td>{transaction.type === 2 || transaction.type === 3 ? '-' + Number(transaction.amount).toLocaleString() : '+' + Number(transaction.amount).toLocaleString()}đ</td>
                <td>{format(transaction.createdAt, 'yyyy/MM/dd HH:mm:ss')}</td>
                <td>{Number(transaction.balance).toLocaleString()} đ</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        {transactionPageNumbers.map((number) => (
          <button
            key={number}
            id={number}
            onClick={handleTransactionPageChange}
            className={currentTransactionPage === number ? "active" : ""}
          >
            {number}
          </button>
        ))}
      </div>
      <h3 style={{ marginTop: "10px" }}>Lịch sử nhận donate</h3>
      <div className="donate-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Người gửi</th>
              <th>Tin nhắn</th>
              <th>Số tiền</th>
              <th>Thời gian</th>
            </tr>
          </thead>
          <tbody>
            {currentrcvDonates.map((donate) => (
              <tr key={donate.id}>
                <td>{donate.id}</td>

                <td>
                  <Link to={`/user/${donate.donateWallet.user.id}`}>
                    <img src={donate.donateWallet.user.avatar} alt="aaa" style={{ height: 40, width: 40, borderRadius: 20 }} />
                  </Link>
                  {donate.donateWallet.user.name}
                </td>
                <td>{donate.message}</td>
                <td>{Number(donate.amount).toLocaleString()} đ</td>
                <td>{format(donate.donateDate, 'yyyy/MM/dd HH:mm:ss')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        {rcvDonatePageNumbers.map((number) => (
          <button
            key={number}
            id={number}
            onClick={handlercvDonatePageChange}
            className={currentrcvDonatePage === number ? "active" : ""}
          >
            {number}
          </button>
        ))}
      </div>
      <h3 style={{ marginTop: "10px" }}>Lịch sử gửi donate</h3>
      <div className="donate-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>
                Người nhận</th>
              <th>Tin nhắn</th>
              <th>Số tiền</th>
              <th>Thời gian</th>
            </tr>
          </thead>
          <tbody>
            {currentSendDonates.map((donate) => (
              <tr key={donate.id}>
                <td>{donate.id}</td>
                <td>
                  <Link to={`/user/${donate.receiverWallet.user.id}`} >
                    <img src={donate.receiverWallet.user.avatar} alt="aaa" style={{ height: 40, width: 40, borderRadius: 20 }} />
                  </Link>
                  {donate.receiverWallet.user.name}
                </td>

                <td>{donate.message}</td>
                <td>{Number(donate.amount).toLocaleString()} đ</td>
                <td>{format(donate.donateDate, 'yyyy/MM/dd HH:mm:ss')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        {sendDonatePageNumbers.map((number) => (
          <button
            key={number}
            id={number}
            onClick={handleSendDonatePageChange}
            className={currentSendDonatePage === number ? "active" : ""}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Wallet;
