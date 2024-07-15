import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import API_URL from "../config/config";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

import {
  Dialog,
  DialogTitle,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  DialogActions,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { format } from "date-fns";
import AlertDialog from "./dialogs/AlertDialog";
import ConfirmDialog from "./dialogs/ConfirmDialog";
import '../css/paper-dashboard.min.css'
import { Link } from "react-router-dom";
function User() {
  const [user, setUser] = useState({});
  const [followList, setFollowList] = useState([]);
  const [followerList, setFollowerList] = useState([]);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthdate,setBirthDate]=useState()
  const [intro,setIntro]=useState()
  const [premium, setPremium] = useState({
    status: false,
    packagePremium: {},
    startDate: "",
  });

  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const fileInputRef = useRef(null);

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };
  const defaultAvatarUrl = `${process.env.PUBLIC_URL}/images/default-avatar.png`;
  useEffect(() => {
   
    getUser();
    getFollowList();
    getFollowerList()
  }, []);
  useEffect(() => {
    const getPremiumStatus = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/user_premium`, {
          headers: {
            Authorization: "Bearer " + Cookies.get("access_token"),
          },
        });
        if (response.data.message === "Not register premium") {
          setPremium(prevPremium => ({ ...prevPremium, status: false }));
        } else {
          setPremium(prevPremium => ({
            ...prevPremium,
            status: true,
            packagePremium: response.data.packagePremium,
            startDate: response.data.startDate,
          }));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getPremiumStatus();
  }, []);
  const getUser = async () => {
    try {
      const response = await axios.get(`${API_URL}/user`, {
        headers: {
          Authorization: "Bearer " + Cookies.get("access_token"),
        },
      });
      const userData = response.data;
      const formattedBirthDate = format(new Date(userData.birthDate), 'yyyy-MM-dd');
      const formattedCreatedDate = format(new Date(userData.createdAt), 'yyyy-MM-dd');
      setName(userData.name);
      setPhoneNumber(userData.phoneNumber);
      setIntro(userData.intro)
      setBirthDate(formattedBirthDate)
      setUser({
        ...userData,
        birthDate: formattedBirthDate,
        createdAt: formattedCreatedDate,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getFollowList = async () => {
    try {
      const response = await axios.get(`${API_URL}/user/following`, {
        headers: {
          Authorization: "Bearer " + Cookies.get("access_token"),
        },
      });
      setFollowList(response.data)
      
    } catch (error) {
      console.log(error);
    }
  };
  const getFollowerList = async () => {
    try {
      const response = await axios.get(`${API_URL}/user/follows`, {
        headers: {
          Authorization: "Bearer " + Cookies.get("access_token"),
        },
      });
      setFollowerList(response.data)
      
    } catch (error) {
      console.log(error);
    }
  };

  const uploadAvatar = async (formData) => {
    try {
      await axios.post(
        `${API_URL}/user/avt-upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + Cookies.get("access_token"),
          },
        }
      );
      getUser();
    } catch (error) {
      console.log(error); 
    }
  };

  const handleAvatarUpload = async(event) => {
    const formData = new FormData();

    formData.append("file", event.target.files[0]);
    const toastId = toast.loading("Đang tải lên ảnh đại diện...");
    try{
      await uploadAvatar(formData); 
    toast.success("Cập nhật ảnh đại diện thành công",{id:toastId});
    }
   catch (error) {
    toast.error("Cập nhật ảnh đại diện thất bại",{id:toastId});
  }
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };
  const handleIntroChange = (event) => {
    setIntro(event.target.value);
  };
  const handleBirthDateChange=(event)=>{
    setBirthDate(event.target.value)
  }

  const handleUpdateProfile = async (event) => {
    event.preventDefault();
    if (!/^\d{10}$/.test(phoneNumber)) {
      toast("Vui lòng nhập đúng định dạng số điện thoại 10 chữ số!",{
        icon:'🛈',
        position:"top-right",
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
        },
       })
      
    } else {
      try {
         await axios.post(
          `${API_URL}/user/update_profile`,
          { newName: name, newPhoneNumber: phoneNumber,newIntro:intro,newBirthDate:birthdate },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: "Bearer " + Cookies.get("access_token"),
            },
          }
        );
        getUser();
        toast.success("Cập nhật thông tin thành công!",{duration:3000,position:"top-right"})
      } catch (error) {
        console.log(error);
        toast.error("Lỗi, cập nhật thông tin thất bại!",{position:"top-right"});
      }
    }
  };

  //Doi mat khau
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [openChangePassDialog, setOpenChangePassDialog] = useState(false);
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const handleOldPassChange = (e) => {
    setOldPass(e.target.value);
  };

  const handleNewPassChange = (e) => {
    setNewPass(e.target.value);
  };

  const handleConfirmPassChange = (e) => {
    setConfirmPass(e.target.value);
  };

  const handleClickShowOldPassword = () => setShowOldPassword((show) => !show);
  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = async () => {
    try {
      await axios.post(
        `${API_URL}/user/change-password`,
        {
          password: oldPass,
          newPass: newPass,
          confirmPass: confirmPass,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Bearer " + Cookies.get("access_token"),
          },
        }
      );
      // console.log(response.data);
      toast.success("Đổi mật khẩu thành công!",{
        position:"top-right",
        duration:4000
      })
      setOpenChangePassDialog(false);
      setNewPass("");
      setOldPass("");
      setConfirmPass("");
    } catch (error) {
      console.log(error);
      if (error.message === "Request failed with status code 401") {
        toast.error("Mật khẩu cũ không đúng!",{
          position:"top-right"
        })
      } else if (error.message === "Request failed with status code 501") {
        toast("Mật khẩu không đủ mạnh. Đảm bảo mật khẩu trên 8 ký tự, có ít nhất 1 ký tự hoa, 1 ký tự thường, 1 chữ số và một ký tự đặc biệt",{
          icon:'🛈',
          position:"top-right",
          style: {
            border: '1px solid #713200',
            padding: '16px',
            color: '#713200',
          },
         })
     
      } else {
        toast.error("Đổi mật khẩu thất bại. Đã có lỗi xảy ra",{position:"top-right"})
      }
    }
  };

  const handleSubmitChangePassword = () => {
    if (oldPass === newPass) {
     
      toast("Mật khẩu cũ giống với mật khẩu mới",{
        icon:'🛈',
        position:"top-right",
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
        },
       })
    } else if (newPass !== confirmPass) {
      toast.error("Xác nhận mật khẩu không khớp",{position:"top-right"})
    } else {
      changePassword();
    }
  };

  //Đăng ký premium
  const [openPremiumPackage, setOpenPremiumPackage] = useState(false);
  const [premiumPackages, setPremiumPackages] = useState([]);
  const [openConfirmBuyDialog, setConfirmBuyDialogOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState({});

  const premiumCardStyle = {
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "20px",
    marginBottom: "20px",
    marginRight: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", // Thêm hiệu ứng bóng đổ
    transition: "transform 0.3s ease-in-out", // Thêm hiệu ứng hover
    cursor: "pointer", // Thêm con trỏ chuột khi hover
  };

  const buttonStyle = {
    marginTop: "10px",
    backgroundColor: "#4CAF50", // Màu nền
    color: "white",
    border: "none",
    borderRadius: "4px",
    padding: "10px 20px",
    textDecoration: "none",
    textTransform: "uppercase",
    fontWeight: "bold",
    transition: "background-color 0.3s ease-in-out", // Thêm hiệu ứng hover
  };

  const buttonHoverStyle = {
    backgroundColor: "#45a049", // Màu nền thay đổi khi hover
  };

  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const cardStyle = {
    ...premiumCardStyle,
  };

  const buttonDynamicStyle = {
    ...buttonStyle,
    ...(isHovered && buttonHoverStyle),
  };

  const getAllPackage = async () => {
    try {
      const response = await axios.get(`${API_URL}/package_premium`);
      setPremiumPackages(response.data);
      // console.log(premiumPackages);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenPackages = (e) => {
    e.preventDefault();

    getAllPackage();
    setOpenPremiumPackage(true);
  };

  const handleBuyClick = (packageData) => {
    setSelectedPackage(packageData);
    setConfirmBuyDialogOpen(true);
  };

  const buyPackage = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/user/register_premium`,
        { package_id: selectedPackage.id },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Bearer " + Cookies.get("access_token"),
          },
        }
      );
      setAlertMessage(response.data.message);
      setOpenAlertDialog(true);
    } catch (error) {
      console.log(error);
      setAlertMessage("Đăng ký thất bại, đã có lỗi xảy ra");
      setOpenAlertDialog(true);
    }
  };
  return (
    <>
      <div className="content">
      <AlertDialog
          open={openAlertDialog}
          onClose={() => setOpenAlertDialog(false)}
          message={alertMessage}
        />
        <Dialog
          open={openPremiumPackage}
          onClose={() => setOpenPremiumPackage(false)}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            {premiumPackages.map((packageData, index) => (
              <div
                className="premium-card"
                style={cardStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <h2>Gói {packageData.duration} ngày</h2>
                <p>Giá: {packageData.cost}VNĐ</p>
                <p>Thời hạn: {packageData.duration} ngày</p>
                <button
                  style={buttonDynamicStyle}
                  onClick={() => handleBuyClick(packageData)}
                >
                  Đăng ký
                </button>
              </div>
            ))}
          </div>
        </Dialog>
        <ConfirmDialog
          open={openConfirmBuyDialog}
          onClose={() => setConfirmBuyDialogOpen(false)}
          onAccept={buyPackage}
          message={`Bạn muốn mua gói premium ${selectedPackage.duration} tháng có giá ${selectedPackage.cost} VNĐ? `}
        ></ConfirmDialog>
        <Dialog
          open={openChangePassDialog}
          onClose={() => setOpenChangePassDialog(false)}
        >
          <DialogTitle>Đổi mật khẩu</DialogTitle>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <InputLabel htmlFor="oldPass">Mật khẩu cũ</InputLabel>
            <OutlinedInput
              id="oldPass"
              type={showOldPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowOldPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showOldPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="oldPassword"
              value={oldPass}
              onChange={handleOldPassChange}
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <InputLabel htmlFor="newPass">Mật khẩu mới</InputLabel>
            <OutlinedInput
              id="newPass"
              type={showNewPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowNewPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="newPassword"
              value={newPass}
              onChange={handleNewPassChange}
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <InputLabel htmlFor="confirmPass">Nhập lại mật khẩu</InputLabel>
            <OutlinedInput
              id="confirmPass"
              type={showConfirmPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="confirmPassword"
              value={confirmPass}
              onChange={handleConfirmPassChange}
            />
          </FormControl>
          <DialogActions>
            <Button onClick={handleSubmitChangePassword}> Xác nhận</Button>
          </DialogActions>
        </Dialog>
        <Row>
          <Col md="4">
            <Card className="card-user">
              <div className="image">
                <img alt="..." src="https://tse4.mm.bing.net/th?id=OIP.e3soQUyXZOwzwhUyPh2IxQHaEK&pid=Api&P=0&h=220" />
              </div>
              <CardBody>
                <div className="author">

                  <img
                    alt="..."
                    className="avatar border-gray"
                    src={user.avatar?user.avatar:defaultAvatarUrl}
                    onClick={handleAvatarClick}
                  />
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleAvatarUpload}
                    accept="image/*"
                  />

                  <h5 className="title">{user.name}</h5>

                  <p className="description">@{user.userName}</p>
                </div>
                <p className="description text-center">
                  "{user.intro}"
                </p>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="button-container">
                  <Row>
                    <Col className="ml-auto" lg="3" md="6" xs="6">
                      <h5>
                        {followerList.length} <br />
                        <small>Lượt theo dõi</small>
                      </h5>
                    </Col>
                    <Col className="ml-auto mr-auto" lg="4" md="6" xs="6">
                      <h5>
                        {followList.length} <br />
                        <small>Đang theo dõi</small>
                      </h5>
                    </Col>
                    {/* <Col className="mr-auto" lg="3">
                      <h5>
                        24,6$ <br />
                        <small>Spent</small>
                      </h5>
                    </Col> */}
                  </Row>
                </div>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Premium 👑</CardTitle>
              </CardHeader>
              <CardBody>
                {premium.status?(
                  <h5>Premium còn hạn đến{" "}
                  {new Date(
                    new Date().setDate(
                      new Date(premium.startDate).getDate() +
                      premium.packagePremium.duration
                    )
                  ).toLocaleDateString()} </h5>
                ): ( <Button
                onClick={handleOpenPackages}
                className="btn-round"
                color="primary"
              >
                Đăng ký ngay
              </Button>)}
             
             
              
              </CardBody>
            </Card>
          </Col>
          <Col md="8">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">Cập nhật thông tin</CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-1" md="5">
                      <FormGroup>
                        <label>Email (disabled)</label>
                        <Input
                          defaultValue={user.email}
                          disabled
                          placeholder="Email"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Họ và tên</label>
                        <Input
                          defaultValue={user.name}
                          placeholder="Họ và tên"
                          type="text"
                          onChange={handleNameChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          Số điện thoại
                        </label>
                        <Input placeholder="Số điện thoại"
                          defaultValue={user.phoneNumber} type="text" 
                          onChange={handlePhoneNumberChange}
                          />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>Ngày sinh</label>
                        <Input
                          defaultValue={user.birthDate}
                          placeholder="Company"
                          type="date"
                          onChange={handleBirthDateChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label>Ngày tạo</label>
                        <Input
                          disabled

                          // defaultValue={format(user.createdAt,'yyyy/MM/dd')}
                          defaultValue={user.createdAt}
                          placeholder="Last Name"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Giới thiệu</label>
                        <Input
                          type="textarea"
                          defaultValue={user.intro}
                          onChange={handleIntroChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <div className="update ml-auto mr-auto">
                      <Button
                        className="btn-round"
                        color="primary"
                        onClick={handleUpdateProfile}
                      >
                        Cập nhật thông tin
                      </Button>
                      <Button
                      onClick={() => setOpenChangePassDialog(true)}
                        className="btn-round"
                        color="primary"
                      >
                        Đổi mật khẩu
                      </Button>
                    </div>
                  </Row>
                </Form>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Đang theo dõi</CardTitle>
              </CardHeader>
              <CardBody>
                <ul className="list-unstyled team-members">
                {followList.map((follow,index)=>(
                  <li key={index}>
                  <Row>
                    <Col md="2" xs="2">
                      <div className="avatar">
                        <Link to={`/user/${follow.user.id}`}>
                        <img
                          alt="..."
                          className="img-circle img-no-padding img-responsive"
                          src={follow.user.avatar}
                        />
                        </Link>
                      </div>
                    </Col>
                    <Col md="7" xs="7">
                      {follow.user.name} <br />
                      <span className="text-muted">
                        <small>@{follow.user.userName}</small>
                      </span>
                    </Col>
                    <Col className="text-right" md="3" xs="3">
                      <Button
                        className="btn-round btn-icon"
                        color="success"
                        outline
                        size="sm"
                      >
                        <i className="fa fa-envelope" />
                      </Button>
                    </Col>
                  </Row>
                </li> )) }
                
                </ul>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Người theo dõi</CardTitle>
              </CardHeader>
              <CardBody>
                <ul className="list-unstyled team-members">
                {followerList.map((follow,index)=>(
                  <li key={index}>
                  <Row>
                    <Col md="2" xs="2">
                      <div className="avatar">
                      <Link to={`/user/${follow.user.id}`}>
                        <img
                          alt="..."
                          className="img-circle img-no-padding img-responsive"
                          src={follow.follower.avatar}
                        />
                        </Link>
                      </div>
                    </Col>
                    <Col md="7" xs="7">
                      {follow.follower.name} <br />
                      <span className="text-muted">
                        <small>@{follow.follower.userName}</small>
                      </span>
                    </Col>
                    <Col className="text-right" md="3" xs="3">
                      <Button
                        className="btn-round btn-icon"
                        color="success"
                        outline
                        size="sm"
                      >
                        <i className="fa fa-envelope" />
                      </Button>
                    </Col>
                  </Row>
                </li> )) }
                
                </ul>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default User;
