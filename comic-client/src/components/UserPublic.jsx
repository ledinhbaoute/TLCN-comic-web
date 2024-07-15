import React, { useState, useEffect,useCallback } from "react";
import axios from "axios";
import "../sass/_public-profile.scss";
import { Link, useParams } from "react-router-dom";
import { useNavigateTo } from "../service/navigation";
import API_URL from "../config/config";
import Cookies from "js-cookie";
import { checkAuth } from "../security/Authentication";
import {

    Dialog,
    DialogActions,
    DialogTitle,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton
} from "@mui/material";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Row,
    Col,
} from "reactstrap";
import AlertDialog from "./dialogs/AlertDialog";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import toast from "react-hot-toast";
import Chatbox from "./Chatbox";
import ChatHead from "./ChatHead";
import Comment from "@mui/icons-material/Comment";

const UserPublic = () => {
    const { userId } = useParams();
    const [user, setUser] = useState({});
    const navigate = useNavigateTo();
    const [comics, setComics] = useState([]);
    const [openAlertDialog, setAlertDialogOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [follow, setFollow] = useState(false)
    const defaultAvatarUrl = `${process.env.PUBLIC_URL}/images/default-avatar.png`;
    const getUser = useCallback(async () => {
        try {
            const response = await axios.get(`${API_URL}/findUser/${userId}`);
            if (response.data) {
                setUser(response.data);
                checkFollow(response.data.userName);
            } else {
                navigate("/NotFound");
            }
        } catch (error) {
            console.log(error);
        }
    }, [userId, navigate]);

    const getComics = useCallback(async () => {
        try {
            const response = await axios.get(`${API_URL}/comicbooks/filter/actor/${userId}`);
            setComics(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }, [userId]);

    useEffect(() => {
        if (userId === window.sessionStorage.getItem("userid")) {
            navigate("/profile");
        } else {
            getUser();
            getComics();
        }
    }, [userId,getUser, getComics,navigate]);

    const [currentPage, setCurrentPage] = useState(1);
    const comicsPerPage = 10;
    const totalPages = Math.ceil(comics.length / comicsPerPage);
    const indexOfLastStory = currentPage * comicsPerPage;
    const indexOfFirstStory = indexOfLastStory - comicsPerPage;
    const currentcomics = comics.slice(indexOfFirstStory, indexOfLastStory);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

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
    const handleButonDonateClick=()=>{
        if(checkAuth()){
            setOpenDonateDialog(true)
        }
        else{
            toast("Bạn cần đăng nhập để theo dõi người dùng!",{
                icon:'🛈',
                position:"top-right",
                style: {
                  border: '1px solid #713200',
                  padding: '16px',
                  color: '#713200',
                },
               })
        }
    }
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleButtonFollowClick = () => {
        if (checkAuth()) {
            if (follow) {
                unfollow();
            } else {
                addfollow();
            }
        }
        else{
            toast("Bạn cần đăng nhập để theo dõi người dùng!",{
                icon:'🛈',
                position:"top-right",
                style: {
                  border: '1px solid #713200',
                  padding: '16px',
                  color: '#713200',
                },
               })
        }
    };

    const checkFollow = async (userName) => {
        try {
            const respone = await axios.get(
                `${API_URL}/user/checkFollow?username=${userName}`,
                {
                    headers: {
                        Authorization: "Bearer " + Cookies.get("access_token"),
                    },
                }
            );
            setFollow(respone.data)


        } catch (error) {
            console.log(error);
        }
    };



    const addfollow = async () => {
        try {
            const respone = await axios.post(
                `${API_URL}/user/follows`,
                {
                    username: user.userName,
                },
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        Authorization: "Bearer " + Cookies.get("access_token"),
                    },
                }
            );
            if (respone.data.status === true) {
                setFollow(true)
            }
        } catch (error) {
            console.log(error);
        }
    };
    const unfollow = async () => {
        try {
            const respone = await axios.delete(
                `${API_URL}/user/follows`,
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        Authorization: "Bearer " + Cookies.get("access_token"),
                    },
                    data: {
                        username: user.userName,
                    }
                }
            );
            if (respone.data.status === true) {
                setFollow(false)
            }
        } catch (error) {
            console.log(error);
        }
    };

    const donate = async () => {
        try {
            const respone = await axios.post(
                `${API_URL}/user/donate`,
                {
                    receiver: userId,
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
            toast("Số tiền tối thiểu là 1000VNĐ", {
                icon: '🛈',
                position: "top-right",
                style: {
                    border: '1px solid #713200',
                    padding: '16px',
                    color: '#713200',
                },
            })

        }
        else if (Number(amount) > 1000000) {
            toast("Số tiền donate tối đa 1 000 000 trong một lần", {
                icon: '🛈',
                position: "top-right",
                style: {
                    border: '1px solid #713200',
                    padding: '16px',
                    color: '#713200',
                },
            })

        } else if (donateMessage.length > 1000) {
            toast("Tin nhắn quá dài, tối đa 1000 ký tự", {
                icon: '🛈',
                position: "top-right",
                style: {
                    border: '1px solid #713200',
                    padding: '16px',
                    color: '#713200',
                },
            })
        } else {
            donate();
        }
    };

    return (
        <div className="profile-page-container">
            <>
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

                <div className="content">

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
                                            src={user.avatar ? user.avatar : defaultAvatarUrl}
                                        />
                                        <h5 className="title">{user.name}</h5>
                                        <p className="description">@{user.userName}</p>
                                    </div>
                                    <p className="description text-center">
                                        '{user.intro}'
                                    </p>
                                    <Row>
                                        <Col className="ml-auto mr-auto" lg="5" md="6" xs="6">
                                            <Button onClick={()=>handleButonDonateClick()}>Ủng hộ</Button>
                                        </Col>
                                        <Col className="ml-auto mr-auto" lg="6" md="6" xs="6">
                                            {!follow && (
                                                <Button

                                                    variant="contained"
                                                    onClick={handleButtonFollowClick}
                                                >
                                                    Theo dõi
                                                </Button>
                                            )}
                                            {follow && (
                                                <Button

                                                    variant="contained"
                                                    onClick={handleButtonFollowClick}
                                                >
                                                    Đã theo dõi
                                                </Button>
                                            )}
                                        </Col>

                                    </Row>
                                    <Row>
                                        <Col className="ml-auto mr-auto" lg="3" md="6" xs="6">
                                            <ChatHead
                                                icon={
                                                    <IconButton size="small" sx={{ my: "12px", color: "primary.contrastText" }}>
                                                        <Comment sx={{ color: 'gray' }} />
                                                    </IconButton>
                                                }>
                                                <Chatbox receiverUserName={user.userName} />
                                            </ChatHead>
                                        </Col>
                                    </Row>

                                </CardBody>
                                <CardFooter>
                                    <hr />
                                    <div className="button-container">
                                        <Row>
                                            <Col className="ml-auto" lg="3" md="6" xs="6">
                                                <h5>
                                                    12<br />
                                                    <small>Lượt theo dõi</small>
                                                </h5>
                                            </Col>
                                            <Col className="ml-auto mr-auto" lg="4" md="6" xs="6">
                                                <h5>
                                                    13 <br />
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
                        </Col>
                        <Col md="8">
                            <Card>
                                <CardHeader>
                                    <CardTitle tag="h5">Danh sách truyện</CardTitle>
                                </CardHeader>
                                <CardBody>

                                    <ul className="list-unstyled team-members">
                                        {currentcomics.map((comic, index) => (
                                            <li key={index}>
                                                <Row>
                                                    <Col md="4" xs="4">
                                                        <img
                                                            alt="..."

                                                            src={comic.image}
                                                            style={{ maxHeight: 50, width: 50 }}
                                                        />

                                                    </Col>
                                                    <Col md="5" xs="5">

                                                        <Link to={`/comic-detail/${comic.id}`}>{comic.name}</Link>
                                                    </Col>
                                                    <Col className="text-right" md="3" xs="3">
                                                        {comic.premium ? "Premium" : "Free"}
                                                    </Col>
                                                </Row>
                                            </li>))}

                                    </ul>
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


                                </CardBody>
                            </Card>

                        </Col>
                    </Row>

                </div>
            </>
        </div>
    );
};

export default UserPublic;
