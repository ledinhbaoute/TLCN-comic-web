import React, { useEffect, useState } from "react";
// import "../sass/style.scss";
// import "../css/AllStyles";
import axios from "axios";
import API_URL from "../config/config";
import ComicList from "./ComicList";
import ComicItem from "./ComicItem";

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
          `${API_URL}/comic_trending`
        );
        setListTrending(response.data);
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
          `${API_URL}/comic/latest_update`
        );
        setListLatestUpdate(response.data);
      } catch (error) {
        console.log(error);
      }

    };
    getComicLatestUpdate();

  }, []);
  return (
    <div>
      {/*  Hero Section Begin  */}
      {/* <section className="hero">
        <div className="container">
          <div className="hero__slider owl-carousel">
            <div
              className="hero__items set-bg"
              style={{ backgroundImage: `url(${imgHeroUrl})` }}
            >
              <div className="row">
                <div className="col-lg-6">
                  <div className="hero__text">
                    <div className="label">Adventure</div>
                    <h2>Fate / Stay Night: Unlimited Blade Works</h2>
                    <p>After 30 days of travel across the world...</p>
                    <a href="#">
                      <span>Watch Now</span> <i className="fa fa-angle-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="hero__items set-bg"
              style={{ backgroundImage: `url(${imgHeroUrl})` }}
            >
              <div className="row">
                <div className="col-lg-6">
                  <div className="hero__text">
                    <div className="label">Adventure</div>
                    <h2>Fate / Stay Night: Unlimited Blade Works</h2>
                    <p>After 30 days of travel across the world...</p>
                    <a href="#">
                      <span>Watch Now</span> <i className="fa fa-angle-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="hero__items set-bg"
              style={{ backgroundImage: `url(${imgHeroUrl})` }}
            >
              <div className="row">
                <div className="col-lg-6">
                  <div className="hero__text">
                    <div className="label">Adventure</div>
                    <h2>Fate / Stay Night: Unlimited Blade Works</h2>
                    <p>After 30 days of travel across the world...</p>
                    <a href="#">
                      <span>Watch Now</span> <i className="fa fa-angle-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
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
                      <h4>Trending Now</h4>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-4">
                    <div className="btn__all">
                      <a href="#" className="primary-btn">
                        View All <span className="arrow_right"></span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="row">
                  {listTrending && listTrending.map((item, index) => (
                    <ComicItem key={index} item={item}></ComicItem>

                  ))}
                </div>
              </div>
              {/* <div className="popular__product">
                <div className="row">
                  <div className="col-lg-8 col-md-8 col-sm-8">
                    <div className="section-title">
                      <h4>Popular Shows</h4>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-4">
                    <div className="btn__all">
                      <a href="#" className="primary-btn">
                        View All <span className="arrow_right"></span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="row">
    
                </div>
              </div> */}
              <div className="recent__product">
                <div className="row">
                  <div className="col-lg-8 col-md-8 col-sm-8">
                    <div className="section-title">
                      <h4>Truyện mới cập nhật</h4>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-4">
                    <div className="btn__all">
                      <a href="#" className="primary-btn">
                        View All <span className="arrow_right"></span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="row">
                  {listLatestUpdate && listLatestUpdate.map((item, index) => (
                    <ComicItem key={index} item={item}></ComicItem>
                  ))}

                </div>
              </div>
              {/* <div className="live__product">
                <div className="row">
                  <div className="col-lg-8 col-md-8 col-sm-8">
                    <div className="section-title">
                      <h4>Live Action</h4>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-4">
                    <div className="btn__all">
                      <a href="#" className="primary-btn">
                        View All <span className="arrow_right"></span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="row">        
           
                           </div>
              </div> */}
            </div>
            <div className="col-lg-4 col-md-6 col-sm-8">
              <ComicList listComic={listTopView} title="Top Views"></ComicList>
              
            </div>
          </div>
        </div>
      </section>
      {/* Product Section End */}
    </div>
  );
};

export default Home;
