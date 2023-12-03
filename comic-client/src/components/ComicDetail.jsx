import React from "react";
import ReactDOM from "react-dom/client";
import { Link } from "react-router-dom";
const ComicDetail = (props) => {
  const imgDetailUrl = `${process.env.PUBLIC_URL}/images/anime/details-pic.jpg`;

  const comic=props.comic;
  

  return (
    <div class="anime__details__content">
      <div class="row">
        <div class="col-lg-3">
          <div
            class="anime__details__pic set-bg"
            style={{ backgroundImage: `url(${comic.image})` }}
          >
            <div class="comment">
              <i class="fa fa-star"></i> {comic.rate}
            </div>
            <div class="view">
              <i class="fa fa-eye"></i> {comic.view}
            </div>
          </div>
        </div>
        <div class="col-lg-9">
          <div class="anime__details__text">
            <div class="anime__details__title">
              <h3>{comic.name}</h3>
              {comic.actorId && (
                 <span>Tác giả:{comic.actorId.name}</span>
              )}
                      </div>
            {/* <div class="anime__details__rating">
                            <div class="rating">
                                <a href="#"><i class="fa fa-star"></i></a>
                                <a href="#"><i class="fa fa-star"></i></a>
                                <a href="#"><i class="fa fa-star"></i></a>
                                <a href="#"><i class="fa fa-star"></i></a>
                                <a href="#"><i class="fa fa-star-half-o"></i></a>
                            </div>
                            <span>1.029 Votes</span>
                        </div> */}
            <p>{comic.discription}</p>
            <div class="anime__details__widget">
              <div class="row">
                <div class="col-lg-6 col-md-6">
                  <ul>
                    <li>
                      <span>Ngày ra mắt:</span> {comic.publishDate}
                    </li>
                    <li>
                      <span>Trạng thái:</span> {comic.status===1 &&"Đang tiến hành"}
                    </li>
                    <li>
                       
                      <span>Thể loại:</span>
                        
                      {comic.genres && comic.genres.map((item, index) => (
                        <a key={index}> {item.name} </a>
                      ))}
                    </li>
                  </ul>
                </div>
                <div class="col-lg-6 col-md-6">
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
            <div class="anime__details__btn">
              <a href="#" class="follow-btn">
                <i class="fa fa-heart-o"></i> Ưa thích
              </a>
              <a href="#" class="watch-btn">
                <span> Đánh Giá</span> <i class="fa fa-angle-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ComicDetail;
