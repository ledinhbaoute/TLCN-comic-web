import React, { useState, useEffect } from "react";
import axios from "axios";
import "../sass/_public-profile.scss";
import { Link, useParams } from "react-router-dom";
import { useNavigateTo } from "../service/navigation";
import API_URL from "../config/config";
import Cookies from "js-cookie";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import AlertDialog from "./dialogs/AlertDialog";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const PublicProfile = () => {
  const userId = useParams("userId");
  const [user, setUser] = useState({});
  const navigate = useNavigateTo();
  const [comics, setComics] = useState([]);
  const [openAlertDialog, setAlertDialogOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const getUser = async () => {
    try {
      const response = await axios.get(`${API_URL}/findUser/${userId.userId}`);
      console.log(response.data);
      if (response.data) {
        setUser(response.data);
      } else {
        navigate("/NotFound");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getComics = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/comicbooks/filter/actor/${userId.userId}`
      );
      setComics(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // console.log(userId.userId);
    // console.log(window.sessionStorage.getItem("userid"));
    if (userId.userId === window.sessionStorage.getItem("userid")) {
      navigate("/profile");
    } else {
      getUser();
      getComics();
    }
  }, [userId]);

  const [currentPage, setCurrentPage] = useState(1);
  const comicsPerPage = 10;
  const totalPages = Math.ceil(comics.length / comicsPerPage);
  const indexOfLastStory = currentPage * comicsPerPage;
  const indexOfFirstStory = indexOfLastStory - comicsPerPage;
  const currentcomics = comics.slice(indexOfFirstStory, indexOfLastStory);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  //
  //Donate

  const [openDonateDialog, setOpenDonateDialog] = useState(false);
  const [amount, setAmount] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [donateMessage, setDonateMessage] = useState("");

  const handleAmountChange = (e) => {
    const inputValue = e.target.value;

    // Lọc chỉ giữ lại các kí tự số
    const numericValue = inputValue.replace(/\D/g, "");

    // Cập nhật giá trị của amount
    setAmount(numericValue);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const donate = async () => {
    try {
      const respone = await axios.post(
        `${API_URL}/user/donate`,
        {
          receiver: userId.userId,
          amount: amount,
          message: donateMessage,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Bearer " + Cookies.get("access_token"),
          },
        }
      );
      setAlertMessage(respone.data.message);
      setAlertDialogOpen(true);
    } catch (error) {
      setAlertMessage("Donate thất bại, đã có lỗi xảy ra");
      setAlertDialogOpen(true);
      console.log(error);
    }
  };

  const handleClickDonate = () => {
    if (Number(amount) < 1000) {
      window.alert("Số tiền tối thiểu là 1000VNĐ");
    }
      else if(Number(amount)>1000000) {
        window.alert("Số tiền donate tối đa 1 000 000 trong một lần");
      
    } else if(donateMessage.length>1000){
      window.alert("Tin nhắn quá dài, tối đa 1000 ký tự");
    } else {
      donate();
    }
  };

  return (
    <div className="profile-page-container">
      <AlertDialog
        open={openAlertDialog}
        onClose={() => setAlertDialogOpen(false)}
        message={alertMessage}
      />
      <Dialog open={openDonateDialog}>
        <DialogTitle>Donate</DialogTitle>
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <InputLabel htmlFor="amount">Số tiền</InputLabel>
          <OutlinedInput
            id="amount"
            type="text"
            label="amount"
            value={amount}
            onChange={handleAmountChange}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <InputLabel htmlFor="pass">Mật khẩu</InputLabel>
          <OutlinedInput
            id="pass"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="pass"
            value={password}
            onChange={handlePasswordChange}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <InputLabel htmlFor="message">Tin nhắn</InputLabel>
          <OutlinedInput
            id="message"
            type="text"
            label="message"
            value={donateMessage}
            onChange={(e) => setDonateMessage(e.target.value)}
          />
        </FormControl>
        <DialogActions>
          <Button
            onClick={() => setOpenDonateDialog(false)}
            sx={{ color: "red" }}
          >
            {" "}
            Hủy
          </Button>
          <Button onClick={handleClickDonate}> Xác nhận</Button>
        </DialogActions>
      </Dialog>

      <div className="profile-container">
        <h3 style={{ marginTop: "20px" }}>PROFILE</h3>
        <div style={{ marginTop: "20px", marginBottom: "20px" }}>
          <img
            className="profile-avatar"
            src={`${API_URL}/files/${user.avatar}`}
            alt="Avatar"
          />
          <h2 className="profile-username">{user.name}</h2>
          <div className="button-container">
            <Button
              variant="contained"
              onClick={() => setOpenDonateDialog(true)}
            >
              Ủng hộ
            </Button>
          </div>
        </div>

        <h4>DANH SÁCH TRUYỆN</h4>
        <table className="profile-table">
          <thead>
            <tr>
              <th>Tên truyện</th>
              <th></th>
              <th>Premium</th>
            </tr>
          </thead>
          <tbody>
            {currentcomics.map((comic) => (
              <tr key={comic.id}>
                <td>
                  <Link to={`/comic-detail/${comic.id}`}>{comic.name}</Link>
                </td>
                <td>
                  <img src={comic.image} alt={comic.name} />
                </td>
                <td>{comic.premium ? "Premium" : "Free"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination-container">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            disabled={currentPage === page}
            className={currentPage === page ? "selected" : ""}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PublicProfile;
