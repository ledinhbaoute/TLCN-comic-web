import React, { useState, useEffect, useContext } from "react";
import "../css/search-comic.css";
import axios from "axios";
import API_URL from "../config/config";
import Pagination from "./Pagination";
import ComicItem from "./ComicItem";
import SearchComicItem from "./SearchComicItem";
import Cookies from "js-cookie";
import { checkAuth } from "../security/Authentication";
import RecommentComicList from "./RecommentComicList";
import AppContext from "../context/AppContext";

function SearchComic() {
  const [genres, setGenres] = useState([]);
  const [genreStates, setGenreStates] = useState({});
  const [comicStatus, setComicStatus] = useState(0);
  const [chapters, setChapters] = useState(0);

  const handleComicStatusChange = (event) => {
    setComicStatus(event.target.value);
  };

  const handleChaptersChange = (event) => {
    setChapters(event.target.value);
  };

  const getGenres = async () => {
    try {
      const response = await axios.get(`${API_URL}/genres`);
      const fetchedGenres = response.data.data;
      setGenres(fetchedGenres);
      // Initialize genreStates based on fetched genres
      setGenreStates(
        fetchedGenres.reduce((acc, genre) => ({ ...acc, [genre.id]: 0 }), {})
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleGenreClick = (genreId) => {
    setGenreStates((prevStates) => ({
      ...prevStates,
      [genreId]: (prevStates[genreId] + 1) % 3,
    }));
  };

  const getGenreClass = (state) => {
    switch (state) {
      case 1:
        return "included";
      case 2:
        return "excluded";
      default:
        return "";
    }
  };

  const [listComic, setListComic] = useState([]);

  const handleSearchClick = () => {};
  const imageError = process.env.PUBLIC_URL + "/images/hihihi.png";
  useEffect(() => {
    const getFavoriteComic = async () => {
      if (checkAuth()) {
        try {
          const response = await axios.get(`${API_URL}/user/favorite-comic`, {
            headers: {
              Authorization: "Bearer " + Cookies.get("access_token"),
            },
          });
          setListComic(response.data.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getFavoriteComic();
    getGenres();
  }, []);

  return (
    <div className="container">
      <div className="filter-container">
        <h2>Lọc Truyện</h2>
        <div className="filter-section">
          <label>
            Thể loại (click để thay đổi, xanh là bao gồm, đỏ là loại trừ):
          </label>
          {genres.map((genre) => (
            <div
              key={genre.id}
              className={`genre ${getGenreClass(genreStates[genre.id])}`}
              onClick={() => handleGenreClick(genre.id)}
            >
              {genre.name}
            </div>
          ))}
        </div>
        <div className="filter-section">
          <label>Tình Trạng:</label>
          <select
            name="status"
            value={comicStatus}
            onChange={handleComicStatusChange}
          >
            <option value={0}>Tất cả</option>
            <option value={1}>Đang Tiến Hành</option>
            <option value={2}>Hoàn Thành</option>
            <option value={3}>Tạm Ngưng</option>
          </select>
        </div>
        <div className="filter-section">
          <label>Số lượng chương (lớn hơn hoặc bằng):</label>
          <input
            type="number"
            name="chapters"
            min="0"
            value={chapters}
            onChange={handleChaptersChange}
          />
        </div>
        <button className="search-button" onClick={handleSearchClick}>
          Tìm kiếm
        </button>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="product__page__content">
            <div className="product__page__title">
              <div className="row">
                <div className="col-lg-12 col-md-8 col-sm-6">
                  <div className="section-title">
                    <h4>Kết quả</h4>
                  </div>
                </div>
              </div>
            </div>
            {listComic.length > 0 ? (
              <div className="row">
                {listComic.map((item, index) => (
                  <SearchComicItem item={item.comicBookDTO} key={index} />
                ))}
              </div>
            ) : (
              <div className="anime__details__title">
                {checkAuth() ? (
                  <div>
                    <h3>Danh sách trống</h3>
                    <img src={imageError} alt="Error"></img>
                  </div>
                ) : (
                  <div>
                    <h3>Bạn cần đăng nhập</h3>
                    <img src={imageError} alt="Error"></img>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchComic;
