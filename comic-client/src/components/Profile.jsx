import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import API_URL from "../config/config";
import Cookies from "js-cookie";
import { useNavigateTo } from "../service/navigation";

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

const Profile = () => {
  const navigate = useNavigateTo();

  const [user, setUser] = useState({});

  const defaultAvatarUrl = `${process.env.PUBLIC_URL}/images/default-avatar.png`;
  const [avatarUrl, setAvatarUrl] = useState(defaultAvatarUrl);
  const [selectedFile, setSelectedFile] = useState();

  const uploadAvatar = async (formData) => {
    try {
      const response = await axios.post(`${API_URL}/user/avt-upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: "Bearer " + Cookies.get("access_token"),
        },
      });
      window.alert("Cập nhật thành công");
    } catch (error) {
      console.log(error);
    }
  };

  const handleAvatarUpload = (event) => {
    setSelectedFile(event.target.files[0]);
    const formData = new FormData();
    formData.append("file", selectedFile);
    console.log(formData);
    console.log(formData.get("file"));
    uploadAvatar(formData);
    navigate("../profile");    
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
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
    console.log(user.avatar);
    if (user.avatar !== "") {
      setAvatarUrl(`${API_URL}/files/${user.avatar}`);
    }
  }, []);

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Profile</Card.Title>
              </Card.Header>
              <Card.Body>
                <div className="author">
                  <a onClick={(e) => e.preventDefault()}>
                    <img
                      style={{
                        width: "124px",
                        height: "124px",
                        border: "5px solid #FFFFFF",
                        position: "relative",
                      }}
                      alt="avatar"
                      className="avatar border-gray"
                      src={avatarUrl}
                    ></img>
                  </a>
                  <label htmlFor="file-upload" className="custom-file-upload">
                    Chọn ảnh
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    onChange={handleAvatarUpload}
                    style={{ display: "none" }}
                  />
                  {/* <p className="description">michael24</p> */}
                </div>
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
                          defaultValue={user.name}
                          placeholder="Họ và tên"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    {/* <Col className="pl-1" md="4">
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">
                          Email address
                        </label>
                        <Form.Control
                          value={user.email}
                          placeholder="Email"
                          type="email"
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
                    </Col> */}
                  </Row>
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                  >
                    Update Profile
                  </Button>
                  <div className="clearfix"></div>
                </Form>
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
