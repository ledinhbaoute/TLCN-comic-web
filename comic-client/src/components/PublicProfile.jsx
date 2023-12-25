import React, { useState, useEffect } from "react";
import axios from "axios";
import "../sass/_public-profile.scss";
import { Link, useParams } from "react-router-dom";
import { useNavigateTo } from "../service/navigation";
import API_URL from "../config/config";
import { Button } from "@mui/material";

const PublicProfile = () => {

  const userId = useParams("userId");
  const [user, setUser] = useState({});
  const navigate = useNavigateTo();
  const [comics, setComics] = useState([]);

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

  return (
    <div className="profile-page-container">
      <div className="profile-container">
        <h2 className="profile-username">{user.name}</h2>
        <img className="profile-avatar" src={`${API_URL}/files/${user.avatar}`} alt="Avatar" />
        {/* <div className="donate">
            <Button>Ủng hộ</Button>
        </div> */}
        <h3>DANH SÁCH TRUYỆN</h3>
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
                <td><Link to={`/comic-detail/${comic.id}`}>{comic.name}</Link></td>
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
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PublicProfile;
