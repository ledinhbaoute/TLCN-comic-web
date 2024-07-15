import React from 'react';
import { Link, useLocation } from "react-router-dom";
import axios from 'axios';
import API_URL from "../config/config";
import Cookies from 'js-cookie';
import { checkAuth } from '../security/Authentication';
const ComicItem = ({ item,chapter }) => {
  const firstThreeGenres = item.genres.slice(0, 3);
  const location = useLocation();
  const currentPath = location.pathname

  const increaseView = async () => {
    try {
      await axios.post(`${API_URL}/comic/view`,
        { comicId: item.id },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });

    } catch (error) {
      console.error(error);
    }
  };

  const deleteFavoriteComic = async () => {
    try {
      await axios.delete(`${API_URL}/user/favorite-comic`,
        {
          headers: {
            "Authorization": "Bearer " + Cookies.get("access_token"),
            "Content-Type": "application/x-www-form-urlencoded"

          }, data: { comicId: item.id },
        });

    } catch (error) {
      console.error('Error increasing view:', error);
    }
  };

  const deleteHistoryReading = async () => {
    try {
      await axios.delete(`${API_URL}/user/history_reading`,
        {
          headers: {
            "Authorization": "Bearer " + Cookies.get("access_token"),
            "Content-Type": "application/x-www-form-urlencoded"

          }, data: { chapterId: chapter.id },
        });

    } catch (error) {
      console.error('Error increasing view:', error);
    }
  };

  const handleDeleteFavorite = async () => {
    deleteFavoriteComic()
    // console.log(deleteStatus)
    // if (deleteStatus) {
    //   alert("Xoa thanh cong")
    // }
    // else {
    //   alert("loi")
    // }
    window.location.reload()
    
  }
  const handleDeleteHistory = async () => {
    deleteHistoryReading()
    window.location.reload()
    
  }

  const insertHistoryReading = async (chapterId) => {
    try {
        if (checkAuth) {
            await axios.post(
                `${API_URL}/user/history_reading`,
                { chapterId: chapterId },
                {
                    headers: {
                        "Authorization": "Bearer " + Cookies.get("access_token"),
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                }

            );
        }
        // setRatingList(response.data.data);
    } catch (error) {
        console.log(error);
    }
};

  return (
    <div className="col-lg-3 col-md-6 col-sm-6">
      <div className="product__item">
        <div className="product__item__pic set-bg" style={{ backgroundImage: `url('${API_URL}/files/${item.image}')` }}>
          {item.premium && (
            <div className="ep">PREMIUM</div>
          )}


          {currentPath === "/favorite-comic" && (
            <div className="ep1" onClick={handleDeleteFavorite} >X</div>
          )}
           {currentPath === "/history-reading" && (
            <div className="ep1" onClick={handleDeleteHistory} >X</div>
          )}
          
          <div className="comment"><i className="fa fa-star"></i> {item.rate}</div>
          <div className="view"><i className="fa fa-eye"></i> {item.view}</div>
        </div>
        <div className="product__item__text">
          <ul>
            {firstThreeGenres.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
          <h5 onClick={increaseView}><Link to={`/comic-detail/${item.id}`}>{item.name}</Link></h5>
          {currentPath === "/history-reading" && (
                <span onClick={()=>insertHistoryReading(chapter.id)}><Link to={`/chapter/${chapter.id}`}>Chapter {chapter.ordinalNumber}</Link></span>
          )}
        </div>
      </div>
    </div>
  )
}
export default ComicItem;