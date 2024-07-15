import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../config/config";
import ComicList from "./ComicList";
import ComicItem from "./ComicItem";
import { Link } from "react-router-dom";
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import RecommentComicList from "./RecommentComicList";
const Home = () => {
  const [listTopView, setListTopView] = useState([])
  const [listTrending, setListTrending] = useState([])
  const [listLatestUpdate, setListLatestUpdate] = useState([])
  useEffect(() => {
    const getTopViewComic = async () => {
      try {

        const response = await axios.get(
          `${API_URL}/comic_topview`
        );
        setListTopView(response.data);
      } catch (error) {
        console.log(error);
      }

    };
    getTopViewComic();

  }, []);

  useEffect(() => {
    const getTrendingComic = async () => {
      try {

        const response = await axios.get(
          `${API_URL}/comic_trending?indexPage=0`
        );
        setListTrending(response.data.content);
      } catch (error) {
        console.log(error);
      }

    };
    getTrendingComic();

  }, []);

  useEffect(() => {
    const getComicLatestUpdate = async () => {
      try {

        const response = await axios.get(
          `${API_URL}/comic/latest_update?indexPage=0`
        );
        setListLatestUpdate(response.data.content);
      } catch (error) {
        console.log(error);
      }

    };
    getComicLatestUpdate();

  }, []);

  return (
    <div>
      {/*  Hero Section Begin  */}
      <section className="hero">
        <div className="container">
          <Fade duration={2000}>
            <img style={{ width: '1350px', height: '560px' }} src="/images/slide/image-1.jpg" alt="hahah" />
            <img style={{ width: '1350px', height: '600px' }} src="/images/slide/hero-1.jpg"  alt="hahha"/>
            <img style={{ width: '1350px', height: '600px' }} src="/images/slide/image-6.webp"  alt="hahha"/>
            <img style={{ width: '1350px', height: '600px' }} src="/images/slide/image-5.webp"  alt="hahah"/>
            <img style={{ width: '1350px', height: '600px' }} src="/images/slide/image-5.jpg"  alt="imahhage"/>
          </Fade>
        </div>
      </section>
      {/*  Hero Section End  */}

      {/* Product Section Begin */}
      <section className="product spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="trending__product">
                <div className="row">
                  <div className="col-lg-8 col-md-8 col-sm-8">
                    <div className="section-title">
                      <h4>Đang hot</h4>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-4">
                    <div className="btn__all">
                      <Link to="/comic/trending/1" className="primary-btn">
                        Xem thêm <span className="arrow_right"></span>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="row">
                  {listTrending && listTrending.map((item, index) => (
                    <ComicItem key={index} item={item}></ComicItem>

                  ))}
                </div>
              </div>

              <div className="recent__product">
                <div className="row" >
                  <div className="col-lg-8 col-md-8 col-sm-8">
                    <div className="section-title">
                      <h4>Truyện mới cập nhật</h4>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-4">
                    <div className="btn__all">
                      <Link to="/comic/new_update/1" className="primary-btn">
                        Xem thêm <span className="arrow_right"></span>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="row" >
                  {listLatestUpdate && listLatestUpdate.map((item, index) => (
                    <ComicItem key={index} item={item}></ComicItem>
                  ))}

                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-8">
              <ComicList listComic={listTopView} title="Lượt xem cao nhất"></ComicList>
              <RecommentComicList tittle="Gợi ý cho bạn"></RecommentComicList>
            </div>
          </div>
        </div>
      </section>
      {/* Product Section End */}
    </div>
  );
};

export default Home;
