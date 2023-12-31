import Breadcrumb from "../Breadcrumb";
import Comment from "../Comment";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import API_URL from "../../config/config";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { checkAuth } from "../../security/Authentication";

const ComicReadingPage = () => {
  const { chapterId } = useParams();
  const [imageList, setImageList] = useState([]);
  const [premiumLimited, setPremiumLimited] = useState(false);
  const [chapterList, setChapterList] = useState([]);

  const imgOnlyPemiumUrl = `${process.env.PUBLIC_URL}/images/only-premium.png`;

  useEffect(() => {
    const getChapterDetail = async () => {
      try {
        if (chapterId) {
          if (Cookies.get("access_token")) {
            const response = await axios.get(
              `${API_URL}/chapter_images/${chapterId}`,
              {
                headers: {
                  Authorization: "Bearer " + Cookies.get("access_token"),
                },
              }
            );
            console.log(response);
            if (
              response.data.message ===
              "You need Account Premium to read this book!"
            ) {
              setPremiumLimited(true);
            } else {
              setImageList(response.data.data);
              setPremiumLimited(false);
              // console.log(premiumLimited);
            }
          } else {
            const response = await axios.get(
              `${API_URL}/chapter_images/${chapterId}`
            );
            console.log(response);
            if (
              response.data.message ===
              "You need Account Premium to read this book!"
            ) {
              setPremiumLimited(true);
            } else {
              setImageList(response.data.data);
              setPremiumLimited(false);
              // console.log(premiumLimited);
            }
          }

          //   console.log(imageList);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getChapterDetail();
  }, [chapterId]);

  useEffect(() => {
    if (imageList.length > 0) {
      const comic = imageList[0].chapter.comicBook_Id;
      const getChapterByComic = async () => {
        try {
          const response = await axios.get(`${API_URL}/chapters/${comic.id}`);
          setChapterList(response.data.data);
        } catch (error) {
          console.log(error);
        }
      };
      getChapterByComic();
    }
  }, [imageList]);

  const insertHistoryReading = async (chapterId) => {
    try {
      if (checkAuth) {
        const response = await axios.post(
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
      // setRatingList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* <Breadcrumb /> */}
      <section className="anime-details spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="anime__video__player__container">
                {!premiumLimited ? (
                  imageList &&
                  imageList.map((item) => (
                    <div className="anime__video__playerr" key={item.id}>
                      <img key={item.id} src={item.link} alt="aaa" />
                    </div>
                  ))
                ) : (
                  <div className="anime__video__playerr">
                    <img src={imgOnlyPemiumUrl} alt="aaa" />
                  </div>
                )}
              </div>

              <div className="anime__details__episodes">
                <div className="section-title">
                  <h5>Chương truyện</h5>
                </div>
                {chapterList &&
                  chapterList.map((item) => (
                    <span onClick={() => insertHistoryReading(item.id)}>
                      {" "}
                      <Link to={`/chapter/${item.id}`} key={item.id}>
                        {" "}
                        Chapter {item.ordinalNumber}{" "}
                      </Link>
                    </span>
                  ))}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8">
              <Comment chapterId={chapterId} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default ComicReadingPage;
