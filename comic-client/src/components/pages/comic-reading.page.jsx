import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { checkAuth } from "../../security/Authentication";
import Comment from "../Comment";
import API_URL from "../../config/config";
import RecommentComicList from "../RecommentComicList";

const ComicReadingPage = () => {
  const { chapterId } = useParams();
  const [imageList, setImageList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [premiumLimited, setPremiumLimited] = useState(false);
  const [chapterList, setChapterList] = useState([]);

  const imgOnlyPemiumUrl = `${process.env.PUBLIC_URL}/images/only-premium.png`;

  useEffect(() => {
    const getChapterDetail = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/chapter_images/${chapterId}`,
          {
            headers: Cookies.get("access_token") 
              ? { Authorization: "Bearer " + Cookies.get("access_token") }
              : {},
          }
        );
        if (response.data.message === "You need Account Premium to read this book!") {
          setPremiumLimited(true);
        } else {
          setImageList(response.data.data);
          setPremiumLimited(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getChapterDetail();
  }, [chapterId]);

  useEffect(() => {
    const getChaptersComic = async () => {
      try {
        const response = await axios.get(`${API_URL}/chaptersByChapter/${chapterId}`);
        setChapterList(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getChaptersComic();
  }, [chapterId]);

  const insertHistoryReading = async (chapterId) => {
    try {
      if (checkAuth) {
        await axios.post(
          `${API_URL}/user/history_reading`,
          { chapterId: chapterId },
          {
            headers: {
              Authorization: "Bearer " + Cookies.get("access_token"),
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const nextPage = () => {
    if (currentPage < imageList.length - 2) {
      setCurrentPage(currentPage + 2);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 2);
    }
  };

  return (
    <>
      <section className="anime-details spad">
        <div className="container">
          
          <div className="row">
            <div className="col-lg-12">
            
              <div className="anime__video__player__container">
              <div className="image-container">
                {!premiumLimited ? (
                  <div className="image-pair">
                    {imageList.slice(currentPage, currentPage + 2).map((item, index) => (
                      <div className="anime__video__playerr" key={index}>
                        <img src={item.link} alt={`Page ${currentPage + index + 1}`} />
                      </div>
                    ))}
                  </div>
                ) : (
                    <img src={imgOnlyPemiumUrl} alt="Only for premium" />
                  
                )}
              </div>
              </div>
              <div className="page-controls">
                <button onClick={prevPage} disabled={currentPage === 0}>Trước</button>
                <button onClick={nextPage} disabled={currentPage >= imageList.length - 2}>Kế Tiếp</button>
              </div>
              <div className="anime__details__episodes">
                <div className="section-title">
                  <h5>Chương truyện</h5>
                </div>
                {chapterList.map((item) => (
                  <span onClick={() => insertHistoryReading(item.id)} key={item.id} >
                    <Link to={`/chapter/${item.id}`}  className={chapterId===item.id?'selected':""}>Chapter {item.ordinalNumber} </Link>
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8">
              <Comment chapterId={chapterId} />
            </div>
            <div className="col-lg-4 col-md-6 col-sm-8">
                        <RecommentComicList tittle="Gợi ý cho bạn"></RecommentComicList>
                    </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ComicReadingPage;
