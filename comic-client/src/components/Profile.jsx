import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import API_URL from "../config/config";
import Cookies from "js-cookie";
import { useNavigateTo } from "../service/navigation";
import AlertDialog from "./dialogs/AlertDialog";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";
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
import ConfirmDialog from "./dialogs/ConfirmDialog";

const Profile = () => {
  const navigate = useNavigateTo();

  const [user, setUser] = useState({});

  const defaultAvatarUrl = `${process.env.PUBLIC_URL}/images/default-avatar.png`;
  const [premium, setPremium] = useState({
    status: false,
    packagePremium: {},
    startDate: "",
  });

  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const uploadAvatar = async (formData) => {
    try {
      const response = await axios.post(
        `${API_URL}/user/avt-upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + Cookies.get("access_token"),
          },
        }
      );
      // console.log(response);
      setAlertMessage("Cập nhật ảnh đại diện thành công");
      setOpenAlertDialog(true);
    } catch (error) {
      console.log(error);
      setAlertMessage("Cập nhật ảnh đại diện thất bại");
      setOpenAlertDialog(true);
    }
  };

  const handleAvatarUpload = (event) => {
    const formData = new FormData();

    formData.append("file", event.target.files[0]);

    console.log(formData.get("file"));
    uploadAvatar(formData);
    //window.alert("Cập nhật thành công");
    // navigate("../profile");
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleUpdateProfile = async (event) => {
    event.preventDefault();
    if (!/^\d{10}$/.test(phoneNumber)) {
      window.alert("Vui lòng nhập đúng định dạng số điện thoại 10 chữ số");
    } else {
      try {
        const response = await axios.post(
          `${API_URL}/user/update_profile`,
          { newName: name, newPhoneNumber: phoneNumber },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: "Bearer " + Cookies.get("access_token"),
            },
          }
        );
        setAlertMessage("Cập nhật thông tin thành công");
        setOpenAlertDialog(true);
        // navigate("../profile");
      } catch (error) {
        console.log(error);
        setAlertMessage("Cập nhật ảnh đại diện thất bại");
        setOpenAlertDialog(true);
      }
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`${API_URL}/user`, {
          headers: {
            Authorization: "Bearer " + Cookies.get("access_token"),
          },
        });
        setUser(response.data);
        setName(response.data.name);
        setPhoneNumber(response.data.phoneNumber);
        console.log(user.avatar);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
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
          setPremium({ ...premium, status: false });
        } else {
          setPremium({
            status: true,
            packagePremium: response.data.packagePremium,
            startDate: response.data.startDate,
          });
        }
        console.log(premium);
        // console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    getPremiumStatus();
  }, []);

  //
  //
  //Đổi mật khẩu
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
      const response = await axios.post(
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
      window.alert("Đổi mật khẩu thành công");
      setOpenChangePassDialog(false);
      setNewPass("");
      setOldPass("");
      setConfirmPass("");
    } catch (error) {
      console.log(error);
      if (error.message === "Request failed with status code 401") {
        window.alert("Mật khẩu cũ không đúng");
      } else if (error.message === "Request failed with status code 501") {
        window.alert(
          "Mật khẩu không đủ mạnh. Đảm bảo mật khẩu trên 8 ký tự, có ít nhất 1 ký tự hoa, 1 ký tự thường, 1 chữ số và một ký tự đặc biệt"
        );
      } else {
        window.alert("Đổi mật khẩu thất bại. Đã có lỗi xảy ra");
      }
    }
  };

  const handleSubmitChangePassword = () => {
    if (oldPass === newPass) {
      window.alert("Mật khẩu cũ giống với mật khẩu mới");
    } else if (newPass !== confirmPass) {
      window.alert("Xác nhận mật khẩu không khớp");
    } else {
      changePassword();
    }
  };

  //
  //
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
      <Container fluid>
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

        <AlertDialog
          open={openAlertDialog}
          onClose={() => setOpenAlertDialog(false)}
          message={alertMessage}
        />
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
          <Col md="12">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Profile</Card.Title>
              </Card.Header>
              <Card.Body>
                <div className="author">
                  {/* <a onClick={(e) => e.preventDefault()}> */}
                  <img
                    style={{
                      width: "150px",
                      height: "150px",
                      borderRadius: 75,
                      position: "center",
                    }}
                    alt="avatar"
                    className="avatar border-gray"

                    src={
                      user.avatar !== ""
                        ? user.avatar
                        : defaultAvatarUrl
                    }
                  ></img>
                  <a
                    style={{
                      position: "relative",
                      justifyContent: "right",
                      marginLeft: "250px",
                      backgroundColor: "white",
                      // border: "1px solid yellow",
                      padding: "20px",
                      minWidth: "200px",
                    }}
                  >
                    <i
                      className="fa fa-star"
                      style={{ marginRight: "5px" }}
                    ></i>
                    Premium:
                    {/* <a style={{backgroundColor: "white"}}>Còn hạn đến ngày dd:mm:yyyy</a> */}
                    {premium.status == true ? (
                      <a>
                        còn hạn đến{" "}
                        {new Date(
                          new Date().setDate(
                            new Date(premium.startDate).getDate() +
                            premium.packagePremium.duration
                          )
                        ).toLocaleDateString()}
                      </a>
                    ) : (
                      <Button
                        style={{
                          marginLeft: "10px",
                        }}
                        onClick={handleOpenPackages}
                      >
                        Đăng ký ngay
                      </Button>
                    )}
                  </a>
                  {/* </a> */}

                  {/* <p className="description">michael24</p> */}
                </div>
                <label
                  htmlFor="file-upload"
                  className="custom-file-upload"
                  style={{
                    marginLeft: 35,
                  }}
                >
                  Chọn ảnh
                </label>
                <input
                  id="file-upload"
                  type="file"
                  onChange={handleAvatarUpload}
                  style={{ display: "none" }}
                />

                <br></br>

                <Form>
                  <Row>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>Email</label>
                        <Form.Control
                          defaultValue={user.email}
                          disabled
                          placeholder="email"
                          type="email"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="3">
                      <Form.Group>
                        <label>Họ tên</label>
                        <Form.Control
                          defaultValue={name}
                          placeholder="Họ và tên"
                          type="text"
                          onChange={handleNameChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>SĐT</label>
                        <Form.Control
                          defaultValue={user.phoneNumber}
                          placeholder="SĐT"
                          type="tel"
                          pattern="[0-9]{10}"
                          onChange={handlePhoneNumberChange}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                     </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>First Name</label>
                        <Form.Control
                          defaultValue="Mike"
                          placeholder="Company"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        <label>Last Name</label>
                        <Form.Control
                          defaultValue="Andrew"
                          placeholder="Last Name"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Address</label>
                        <Form.Control
                          defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                          placeholder="Home Address"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <Form.Group>
                        <label>City</label>
                        <Form.Control
                          defaultValue="Mike"
                          placeholder="City"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="px-1" md="4">
                      <Form.Group>
                        <label>Country</label>
                        <Form.Control
                          defaultValue="Andrew"
                          placeholder="Country"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className="pl-1" md="4">
                      <Form.Group>
                        <label>Postal Code</label>
                        <Form.Control
                          placeholder="ZIP Code"
                          type="number"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>About Me</label>
                        <Form.Control
                          cols="80"
                          defaultValue="Lamborghini Mercy, Your chick she so thirsty, I'm in
                          that two seat Lambo."
                          placeholder="Here can be your description"
                          rows="4"
                          as="textarea"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                    style={{
                      marginTop: 10,
                    }}
                    onClick={handleUpdateProfile}
                  >
                    Chỉnh sửa thông tin
                  </Button>

                  <div className="clearfix"></div>
                </Form>
                <Button onClick={() => setOpenChangePassDialog(true)}>
                  {" "}
                  
                  Đổi mật khẩu
                </Button>
              </Card.Body>
            </Card>
          </Col>
          {/* <Col md="4">
            <Card className="card-user">
              <div className="card-image">
                <img
                  alt="..."
                  src={require("")}
                ></img>
              </div>
              <Card.Body>
                <div className="author">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      style={{
                        width: "124px",
                        height: "124px",
                        border: "5px solid #FFFFFF",
                        position: "relative",
                      }}
                      alt="..."
                      className="avatar border-gray"
                      src={`${API_URL}/files/${user.avatar}`}
                    ></img>
                    <h5 className="title">Mike Andrew</h5>
                  </a>
                  <p className="description">michael24</p>
                </div>
                <p className="description text-center">
                  "Lamborghini Mercy <br></br>
                  Your chick she so thirsty <br></br>
                  I'm in that two seat Lambo"
                </p>
              </Card.Body>
              <hr></hr>
              <div className="button-container mr-auto ml-auto">
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-facebook-square"></i>
                </Button>
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-twitter"></i>
                </Button>
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-google-plus-square"></i>
                </Button>
              </div>
            </Card>
          </Col> */}
        </Row>
      </Container>
    </>
  );
};

export default Profile;
