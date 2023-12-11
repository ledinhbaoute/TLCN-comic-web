import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import API_URL from "../config/config";
import { checkAuth } from "../security/Authentication";

const ComicDetail = (props) => {

  const comic = props.comic;

  const [favorite,setFavorite]=useState({})
  const addFavoriteComic  = async () => {
    try {
        const response = await axios.post(
          `${API_URL}/user/favorite-comic`,
          {comicId:comic.id},
          {
            headers: {
            "Authorization":"Bearer "+ Cookies.get("access_token"),
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }
        );
        setFavorite(response.data.data);
    } catch (error) {
      console.log(error);
    }
}
const handleBtnFavoriteSubmit = () => {
  if (!checkAuth()) {
      alert("Bạn cần đăng nhập để thêm truyện vào ưu thích")
  }
  else {
      addFavoriteComic();
      alert("Đã thêm truyện vào ưu thích")
  }
};

return (
  <div className="anime__details__content">
    <div className="row">
      <div className="col-lg-3">
        <div
          className="anime__details__pic set-bg"
          style={{ backgroundImage: `url(${comic.image})` }}
        >
          <div className="comment">
            <i className="fa fa-star"></i> {comic.rate}
          </div>
          <div className="view">
            <i className="fa fa-eye"></i> {comic.view}
          </div>
        </div>
      </div>
      <div className="col-lg-9">
        <div className="anime__details__text">
          <div className="anime__details__title">
            <h3>{comic.name}</h3>
            {comic.actorId && (
              <span>Tác giả:{comic.actorId.name}</span>
            )}
          </div>
          {/* <div className="anime__details__rating">
                            <div className="rating">
                                <a href="#"><i className="fa fa-star"></i></a>
                                <a href="#"><i className="fa fa-star"></i></a>
                                <a href="#"><i className="fa fa-star"></i></a>
                                <a href="#"><i className="fa fa-star"></i></a>
                                <a href="#"><i className="fa fa-star-half-o"></i></a>
                            </div>
                            <span>1.029 Votes</span>
                        </div> */}
          <p>{comic.discription}</p>
          <div className="anime__details__widget">
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <ul>
                  <li>
                    <span>Ngày ra mắt:</span> {comic.publishDate}
                  </li>
                  <li>
                    <span>Trạng thái:</span> {comic.status === 1 && "Đang tiến hành"}
                  </li>
                  <li>

                    <span>Thể loại:</span>

                    {comic.genres && comic.genres.map((item, index) => (
                      <a key={index}> {item.name} </a>
                    ))}
                  </li>
                </ul>
              </div>
              <div className="col-lg-6 col-md-6">
                <ul>
                  {/* <li>
                      <span>Scores:</span> 7.31 / 1,515
                    </li> */}
                  <li>
                    <span>Đánh giá:</span> {comic.rate}/5 ⭐
                  </li>
                  {/* <li>
                      <span>Duration:</span> 24 min/ep
                    </li> */}
                  {/* <li>
                      <span>Quality:</span> HD
                    </li> */}
                  <li>
                    <span>Lượt xem:</span> {comic.view}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="anime__details__btn">
            <button onClick={handleBtnFavoriteSubmit} className="follow-btn">
              <i className="fa fa-heart-o"></i> Ưa thích
            </button>
            {/* <a href="#" className="watch-btn">
              <span> Đánh Giá</span> <i className="fa fa-angle-right"></i>
            </a> */}
          </div>
        </div>
      </div>
    </div>
  </div>
);
};
export default ComicDetail;
