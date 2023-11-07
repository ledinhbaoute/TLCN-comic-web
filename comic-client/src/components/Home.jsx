import React from "react";
import "../sass/style.scss";
import "../css/AllStyles";

const Home = () => {
  const imgHeroUrl = `${process.env.PUBLIC_URL}images/hero/hero-1.jpg`;
  const imgTrendingUrl = [
    `${process.env.PUBLIC_URL}images/trending/trend-1.jpg`,
    `${process.env.PUBLIC_URL}images/trending/trend-2.jpg`,
    `${process.env.PUBLIC_URL}images/trending/trend-3.jpg`,
    `${process.env.PUBLIC_URL}images/trending/trend-4.jpg`,
    `${process.env.PUBLIC_URL}images/trending/trend-5.jpg`,
    `${process.env.PUBLIC_URL}images/trending/trend-6.jpg`,
  ];

  const imgRecentlyUrl = [
    `${process.env.PUBLIC_URL}images/recent/recent-1.jpg`,
    `${process.env.PUBLIC_URL}images/recent/recent-2.jpg`,
    `${process.env.PUBLIC_URL}images/recent/recent-3.jpg`,
    `${process.env.PUBLIC_URL}images/recent/recent-4.jpg`,
    `${process.env.PUBLIC_URL}images/recent/recent-5.jpg`,
    `${process.env.PUBLIC_URL}images/recent/recent-6.jpg`,
  ];

  const imgTvUrl = [
    `${process.env.PUBLIC_URL}images/sidebar/tv-1.jpg`,
    `${process.env.PUBLIC_URL}images/sidebar/tv-2.jpg`,
    `${process.env.PUBLIC_URL}images/sidebar/tv-3.jpg`,
    `${process.env.PUBLIC_URL}images/sidebar/tv-4.jpg`,
    `${process.env.PUBLIC_URL}images/sidebar/tv-5.jpg`,
  ]

  return (
    <div>
      {/*  Hero Section Begin  */}
      <section class="hero">
        <div class="container">
          <div class="hero__slider owl-carousel">
            <div
              class="hero__items set-bg"
              style={{ backgroundImage: `url(${imgHeroUrl})` }}
            >
              <div class="row">
                <div class="col-lg-6">
                  <div class="hero__text">
                    <div class="label">Adventure</div>
                    <h2>Fate / Stay Night: Unlimited Blade Works</h2>
                    <p>After 30 days of travel across the world...</p>
                    <a href="#">
                      <span>Watch Now</span> <i class="fa fa-angle-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="hero__items set-bg"
              style={{ backgroundImage: `url(${imgHeroUrl})` }}
            >
              <div class="row">
                <div class="col-lg-6">
                  <div class="hero__text">
                    <div class="label">Adventure</div>
                    <h2>Fate / Stay Night: Unlimited Blade Works</h2>
                    <p>After 30 days of travel across the world...</p>
                    <a href="#">
                      <span>Watch Now</span> <i class="fa fa-angle-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="hero__items set-bg"
              style={{ backgroundImage: `url(${imgHeroUrl})` }}
            >
              <div class="row">
                <div class="col-lg-6">
                  <div class="hero__text">
                    <div class="label">Adventure</div>
                    <h2>Fate / Stay Night: Unlimited Blade Works</h2>
                    <p>After 30 days of travel across the world...</p>
                    <a href="#">
                      <span>Watch Now</span> <i class="fa fa-angle-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*  Hero Section End  */}

      {/* Product Section Begin */}
      <section class="product spad">
        <div class="container">
          <div class="row">
            <div class="col-lg-8">
              <div class="trending__product">
                <div class="row">
                  <div class="col-lg-8 col-md-8 col-sm-8">
                    <div class="section-title">
                      <h4>Trending Now</h4>
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-4 col-sm-4">
                    <div class="btn__all">
                      <a href="#" class="primary-btn">
                        View All <span class="arrow_right"></span>
                      </a>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-4 col-md-6 col-sm-6">
                    <div class="product__item">
                      <div
                        class="product__item__pic set-bg"
                        style={{ backgroundImage: `url(${imgTrendingUrl[0]})` }}
                      >
                        <div class="ep">18 / 18</div>
                        <div class="comment">
                          <i class="fa fa-comments"></i> 11
                        </div>
                        <div class="view">
                          <i class="fa fa-eye"></i> 9141
                        </div>
                      </div>
                      <div class="product__item__text">
                        <ul>
                          <li>Active</li>
                          <li>Movie</li>
                        </ul>
                        <h5>
                          <a href="#">
                            The Seven Deadly Sins: Wrath of the Gods
                          </a>
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-6 col-sm-6">
                    <div class="product__item">
                      <div
                        class="product__item__pic set-bg"
                        style={{ backgroundImage: `url(${imgTrendingUrl[1]})` }}
                      >
                        <div class="ep">18 / 18</div>
                        <div class="comment">
                          <i class="fa fa-comments"></i> 11
                        </div>
                        <div class="view">
                          <i class="fa fa-eye"></i> 9141
                        </div>
                      </div>
                      <div class="product__item__text">
                        <ul>
                          <li>Active</li>
                          <li>Movie</li>
                        </ul>
                        <h5>
                          <a href="#">
                            Gintama Movie 2: Kanketsu-hen - Yorozuya yo Eien
                          </a>
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-6 col-sm-6">
                    <div class="product__item">
                      <div
                        class="product__item__pic set-bg"
                        style={{ backgroundImage: `url(${imgTrendingUrl[2]})` }}
                      >
                        <div class="ep">18 / 18</div>
                        <div class="comment">
                          <i class="fa fa-comments"></i> 11
                        </div>
                        <div class="view">
                          <i class="fa fa-eye"></i> 9141
                        </div>
                      </div>
                      <div class="product__item__text">
                        <ul>
                          <li>Active</li>
                          <li>Movie</li>
                        </ul>
                        <h5>
                          <a href="#">Shingeki no Kyojin Season 3 Part 2</a>
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-6 col-sm-6">
                    <div class="product__item">
                      <div
                        class="product__item__pic set-bg"
                        style={{ backgroundImage: `url(${imgTrendingUrl[3]})` }}
                      >
                        <div class="ep">18 / 18</div>
                        <div class="comment">
                          <i class="fa fa-comments"></i> 11
                        </div>
                        <div class="view">
                          <i class="fa fa-eye"></i> 9141
                        </div>
                      </div>
                      <div class="product__item__text">
                        <ul>
                          <li>Active</li>
                          <li>Movie</li>
                        </ul>
                        <h5>
                          <a href="#">Fullmetal Alchemist: Brotherhood</a>
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-6 col-sm-6">
                    <div class="product__item">
                      <div
                        class="product__item__pic set-bg"
                        style={{ backgroundImage: `url(${imgTrendingUrl[4]})` }}
                      >
                        <div class="ep">18 / 18</div>
                        <div class="comment">
                          <i class="fa fa-comments"></i> 11
                        </div>
                        <div class="view">
                          <i class="fa fa-eye"></i> 9141
                        </div>
                      </div>
                      <div class="product__item__text">
                        <ul>
                          <li>Active</li>
                          <li>Movie</li>
                        </ul>
                        <h5>
                          <a href="#">Shiratorizawa Gakuen Koukou</a>
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-6 col-sm-6">
                    <div class="product__item">
                      <div
                        class="product__item__pic set-bg"
                        style={{ backgroundImage: `url(${imgTrendingUrl[5]})` }}
                      >
                        <div class="ep">18 / 18</div>
                        <div class="comment">
                          <i class="fa fa-comments"></i> 11
                        </div>
                        <div class="view">
                          <i class="fa fa-eye"></i> 9141
                        </div>
                      </div>
                      <div class="product__item__text">
                        <ul>
                          <li>Active</li>
                          <li>Movie</li>
                        </ul>
                        <h5>
                          <a href="#">Code Geass: Hangyaku no Lelouch R2</a>
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div class="popular__product">
                <div class="row">
                  <div class="col-lg-8 col-md-8 col-sm-8">
                    <div class="section-title">
                      <h4>Popular Shows</h4>
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-4 col-sm-4">
                    <div class="btn__all">
                      <a href="#" class="primary-btn">
                        View All <span class="arrow_right"></span>
                      </a>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-4 col-md-6 col-sm-6">
                    <div class="product__item">
                      <div
                        class="product__item__pic set-bg"
                        data-setbg="img/popular/popular-1.jpg"
                      >
                        <div class="ep">18 / 18</div>
                        <div class="comment">
                          <i class="fa fa-comments"></i> 11
                        </div>
                        <div class="view">
                          <i class="fa fa-eye"></i> 9141
                        </div>
                      </div>
                      <div class="product__item__text">
                        <ul>
                          <li>Active</li>
                          <li>Movie</li>
                        </ul>
                        <h5>
                          <a href="#">Sen to Chihiro no Kamikakushi</a>
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-6 col-sm-6">
                    <div class="product__item">
                      <div
                        class="product__item__pic set-bg"
                        data-setbg="img/popular/popular-2.jpg"
                      >
                        <div class="ep">18 / 18</div>
                        <div class="comment">
                          <i class="fa fa-comments"></i> 11
                        </div>
                        <div class="view">
                          <i class="fa fa-eye"></i> 9141
                        </div>
                      </div>
                      <div class="product__item__text">
                        <ul>
                          <li>Active</li>
                          <li>Movie</li>
                        </ul>
                        <h5>
                          <a href="#">Kizumonogatari III: Reiket su-hen</a>
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-6 col-sm-6">
                    <div class="product__item">
                      <div
                        class="product__item__pic set-bg"
                        data-setbg="img/popular/popular-3.jpg"
                      >
                        <div class="ep">18 / 18</div>
                        <div class="comment">
                          <i class="fa fa-comments"></i> 11
                        </div>
                        <div class="view">
                          <i class="fa fa-eye"></i> 9141
                        </div>
                      </div>
                      <div class="product__item__text">
                        <ul>
                          <li>Active</li>
                          <li>Movie</li>
                        </ul>
                        <h5>
                          <a href="#">Shirogane Tamashii hen Kouhan sen</a>
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-6 col-sm-6">
                    <div class="product__item">
                      <div
                        class="product__item__pic set-bg"
                        data-setbg="img/popular/popular-4.jpg"
                      >
                        <div class="ep">18 / 18</div>
                        <div class="comment">
                          <i class="fa fa-comments"></i> 11
                        </div>
                        <div class="view">
                          <i class="fa fa-eye"></i> 9141
                        </div>
                      </div>
                      <div class="product__item__text">
                        <ul>
                          <li>Active</li>
                          <li>Movie</li>
                        </ul>
                        <h5>
                          <a href="#">
                            Rurouni Kenshin: Meiji Kenkaku Romantan
                          </a>
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-6 col-sm-6">
                    <div class="product__item">
                      <div
                        class="product__item__pic set-bg"
                        data-setbg="img/popular/popular-5.jpg"
                      >
                        <div class="ep">18 / 18</div>
                        <div class="comment">
                          <i class="fa fa-comments"></i> 11
                        </div>
                        <div class="view">
                          <i class="fa fa-eye"></i> 9141
                        </div>
                      </div>
                      <div class="product__item__text">
                        <ul>
                          <li>Active</li>
                          <li>Movie</li>
                        </ul>
                        <h5>
                          <a href="#">Mushishi Zoku Shou 2nd Season</a>
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-6 col-sm-6">
                    <div class="product__item">
                      <div
                        class="product__item__pic set-bg"
                        data-setbg="img/popular/popular-6.jpg"
                      >
                        <div class="ep">18 / 18</div>
                        <div class="comment">
                          <i class="fa fa-comments"></i> 11
                        </div>
                        <div class="view">
                          <i class="fa fa-eye"></i> 9141
                        </div>
                      </div>
                      <div class="product__item__text">
                        <ul>
                          <li>Active</li>
                          <li>Movie</li>
                        </ul>
                        <h5>
                          <a href="#">Monogatari Series: Second Season</a>
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
              <div class="recent__product">
                <div class="row">
                  <div class="col-lg-8 col-md-8 col-sm-8">
                    <div class="section-title">
                      <h4>Truyện mới cập nhật</h4>
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-4 col-sm-4">
                    <div class="btn__all">
                      <a href="#" class="primary-btn">
                        View All <span class="arrow_right"></span>
                      </a>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-4 col-md-6 col-sm-6">
                    <div class="product__item">
                      <div
                        class="product__item__pic set-bg"
                        style={{ backgroundImage: `url(${imgRecentlyUrl[0]})` }}
                      >
                        <div class="ep">18 / 18</div>
                        <div class="comment">
                          <i class="fa fa-comments"></i> 11
                        </div>
                        <div class="view">
                          <i class="fa fa-eye"></i> 9141
                        </div>
                      </div>
                      <div class="product__item__text">
                        <ul>
                          <li>Active</li>
                          <li>Movie</li>
                        </ul>
                        <h5>
                          <a href="#">Great Teacher Onizuka</a>
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-6 col-sm-6">
                    <div class="product__item">
                      <div
                        class="product__item__pic set-bg"
                        style={{ backgroundImage: `url(${imgRecentlyUrl[1]})` }}
                      >
                        <div class="ep">18 / 18</div>
                        <div class="comment">
                          <i class="fa fa-comments"></i> 11
                        </div>
                        <div class="view">
                          <i class="fa fa-eye"></i> 9141
                        </div>
                      </div>
                      <div class="product__item__text">
                        <ul>
                          <li>Active</li>
                          <li>Movie</li>
                        </ul>
                        <h5>
                          <a href="#">
                            Fate/stay night Movie: Heaven's Feel - II. Lost
                          </a>
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-6 col-sm-6">
                    <div class="product__item">
                      <div
                        class="product__item__pic set-bg"
                        style={{ backgroundImage: `url(${imgRecentlyUrl[2]})` }}
                      >
                        <div class="ep">18 / 18</div>
                        <div class="comment">
                          <i class="fa fa-comments"></i> 11
                        </div>
                        <div class="view">
                          <i class="fa fa-eye"></i> 9141
                        </div>
                      </div>
                      <div class="product__item__text">
                        <ul>
                          <li>Active</li>
                          <li>Movie</li>
                        </ul>
                        <h5>
                          <a href="#">Mushishi Zoku Shou: Suzu no Shizuku</a>
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-6 col-sm-6">
                    <div class="product__item">
                      <div
                        class="product__item__pic set-bg"
                        style={{ backgroundImage: `url(${imgRecentlyUrl[3]})` }}
                      >
                        <div class="ep">18 / 18</div>
                        <div class="comment">
                          <i class="fa fa-comments"></i> 11
                        </div>
                        <div class="view">
                          <i class="fa fa-eye"></i> 9141
                        </div>
                      </div>
                      <div class="product__item__text">
                        <ul>
                          <li>Active</li>
                          <li>Movie</li>
                        </ul>
                        <h5>
                          <a href="#">Fate/Zero 2nd Season</a>
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-6 col-sm-6">
                    <div class="product__item">
                      <div
                        class="product__item__pic set-bg"
                        style={{ backgroundImage: `url(${imgRecentlyUrl[4]})` }}
                      >
                        <div class="ep">18 / 18</div>
                        <div class="comment">
                          <i class="fa fa-comments"></i> 11
                        </div>
                        <div class="view">
                          <i class="fa fa-eye"></i> 9141
                        </div>
                      </div>
                      <div class="product__item__text">
                        <ul>
                          <li>Active</li>
                          <li>Movie</li>
                        </ul>
                        <h5>
                          <a href="#">Kizumonogatari II: Nekket su-hen</a>
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-6 col-sm-6">
                    <div class="product__item">
                      <div
                        class="product__item__pic set-bg"
                        style={{ backgroundImage: `url(${imgRecentlyUrl[5]})` }}
                      >
                        <div class="ep">18 / 18</div>
                        <div class="comment">
                          <i class="fa fa-comments"></i> 11
                        </div>
                        <div class="view">
                          <i class="fa fa-eye"></i> 9141
                        </div>
                      </div>
                      <div class="product__item__text">
                        <ul>
                          <li>Active</li>
                          <li>Movie</li>
                        </ul>
                        <h5>
                          <a href="#">
                            The Seven Deadly Sins: Wrath of the Gods
                          </a>
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div class="live__product">
                <div class="row">
                  <div class="col-lg-8 col-md-8 col-sm-8">
                    <div class="section-title">
                      <h4>Live Action</h4>
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-4 col-sm-4">
                    <div class="btn__all">
                      <a href="#" class="primary-btn">
                        View All <span class="arrow_right"></span>
                      </a>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-4 col-md-6 col-sm-6">
                    <div class="product__item">
                      <div
                        class="product__item__pic set-bg"
                        data-setbg="img/live/live-1.jpg"
                      >
                        <div class="ep">18 / 18</div>
                        <div class="comment">
                          <i class="fa fa-comments"></i> 11
                        </div>
                        <div class="view">
                          <i class="fa fa-eye"></i> 9141
                        </div>
                      </div>
                      <div class="product__item__text">
                        <ul>
                          <li>Active</li>
                          <li>Movie</li>
                        </ul>
                        <h5>
                          <a href="#">Shouwa Genroku Rakugo Shinjuu</a>
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-6 col-sm-6">
                    <div class="product__item">
                      <div
                        class="product__item__pic set-bg"
                        data-setbg="img/live/live-2.jpg"
                      >
                        <div class="ep">18 / 18</div>
                        <div class="comment">
                          <i class="fa fa-comments"></i> 11
                        </div>
                        <div class="view">
                          <i class="fa fa-eye"></i> 9141
                        </div>
                      </div>
                      <div class="product__item__text">
                        <ul>
                          <li>Active</li>
                          <li>Movie</li>
                        </ul>
                        <h5>
                          <a href="#">Mushishi Zoku Shou 2nd Season</a>
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-6 col-sm-6">
                    <div class="product__item">
                      <div
                        class="product__item__pic set-bg"
                        data-setbg="img/live/live-3.jpg"
                      >
                        <div class="ep">18 / 18</div>
                        <div class="comment">
                          <i class="fa fa-comments"></i> 11
                        </div>
                        <div class="view">
                          <i class="fa fa-eye"></i> 9141
                        </div>
                      </div>
                      <div class="product__item__text">
                        <ul>
                          <li>Active</li>
                          <li>Movie</li>
                        </ul>
                        <h5>
                          <a href="#">Mushishi Zoku Shou: Suzu no Shizuku</a>
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-6 col-sm-6">
                    <div class="product__item">
                      <div
                        class="product__item__pic set-bg"
                        data-setbg="img/live/live-4.jpg"
                      >
                        <div class="ep">18 / 18</div>
                        <div class="comment">
                          <i class="fa fa-comments"></i> 11
                        </div>
                        <div class="view">
                          <i class="fa fa-eye"></i> 9141
                        </div>
                      </div>
                      <div class="product__item__text">
                        <ul>
                          <li>Active</li>
                          <li>Movie</li>
                        </ul>
                        <h5>
                          <a href="#">
                            The Seven Deadly Sins: Wrath of the Gods
                          </a>
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-6 col-sm-6">
                    <div class="product__item">
                      <div
                        class="product__item__pic set-bg"
                        data-setbg="img/live/live-5.jpg"
                      >
                        <div class="ep">18 / 18</div>
                        <div class="comment">
                          <i class="fa fa-comments"></i> 11
                        </div>
                        <div class="view">
                          <i class="fa fa-eye"></i> 9141
                        </div>
                      </div>
                      <div class="product__item__text">
                        <ul>
                          <li>Active</li>
                          <li>Movie</li>
                        </ul>
                        <h5>
                          <a href="#">
                            Fate/stay night Movie: Heaven's Feel - II. Lost
                          </a>
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-4 col-md-6 col-sm-6">
                    <div class="product__item">
                      <div
                        class="product__item__pic set-bg"
                        data-setbg="img/live/live-6.jpg"
                      >
                        <div class="ep">18 / 18</div>
                        <div class="comment">
                          <i class="fa fa-comments"></i> 11
                        </div>
                        <div class="view">
                          <i class="fa fa-eye"></i> 9141
                        </div>
                      </div>
                      <div class="product__item__text">
                        <ul>
                          <li>Active</li>
                          <li>Movie</li>
                        </ul>
                        <h5>
                          <a href="#">Kizumonogatari II: Nekketsu-hen</a>
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
            <div class="col-lg-4 col-md-6 col-sm-8">
              <div class="product__sidebar">
                <div class="product__sidebar__view">
                  <div class="section-title">
                    <h5>Top Views</h5>
                  </div>
                  <ul class="filter__controls">
                    <li class="active" data-filter="*">
                      Ngày
                    </li>
                    <li data-filter=".week">Tuần</li>
                    <li data-filter=".month">Tháng</li>
                    <li data-filter=".years">Năm</li>
                  </ul>
                  <div class="filter__gallery">
                    <div
                      class="product__sidebar__view__item set-bg mix day years"
                      style={{ backgroundImage: `url(${imgTvUrl[0]})` }}
                    >
                      <div class="ep">18 / ?</div>
                      <div class="view">
                        <i class="fa fa-eye"></i> 9141
                      </div>
                      <h5>
                        <a href="#">Boruto: Naruto next generations</a>
                      </h5>
                    </div>
                    <div
                      class="product__sidebar__view__item set-bg mix month week"
                      style={{ backgroundImage: `url(${imgTvUrl[1]})` }}
                    >
                      <div class="ep">18 / ?</div>
                      <div class="view">
                        <i class="fa fa-eye"></i> 9141
                      </div>
                      <h5>
                        <a href="#">The Seven Deadly Sins: Wrath of the Gods</a>
                      </h5>
                    </div>
                    <div
                      class="product__sidebar__view__item set-bg mix week years"
                      style={{ backgroundImage: `url(${imgTvUrl[2]})` }}
                    >
                      <div class="ep">18 / ?</div>
                      <div class="view">
                        <i class="fa fa-eye"></i> 9141
                      </div>
                      <h5>
                        <a href="#">
                          Sword art online alicization war of underworld
                        </a>
                      </h5>
                    </div>
                    <div
                      class="product__sidebar__view__item set-bg mix years month"
                      style={{ backgroundImage: `url(${imgTvUrl[3]})` }}
                    >
                      <div class="ep">18 / ?</div>
                      <div class="view">
                        <i class="fa fa-eye"></i> 9141
                      </div>
                      <h5>
                        <a href="#">
                          Fate/stay night: Heaven's Feel I. presage flower
                        </a>
                      </h5>
                    </div>
                    <div
                      class="product__sidebar__view__item set-bg mix day"
                      style={{ backgroundImage: `url(${imgTvUrl[4]})` }}
                    >
                      <div class="ep">18 / ?</div>
                      <div class="view">
                        <i class="fa fa-eye"></i> 9141
                      </div>
                      <h5>
                        <a href="#">Fate stay night unlimited blade works</a>
                      </h5>
                    </div>
                  </div>
                </div>
                {/* <div class="product__sidebar__comment">
                  <div class="section-title">
                    <h5>New Comment</h5>
                  </div>
                  <div class="product__sidebar__comment__item">
                    <div class="product__sidebar__comment__item__pic">
                      <img src="img/sidebar/comment-1.jpg" alt="" />
                    </div>
                    <div class="product__sidebar__comment__item__text">
                      <ul>
                        <li>Active</li>
                        <li>Movie</li>
                      </ul>
                      <h5>
                        <a href="#">The Seven Deadly Sins: Wrath of the Gods</a>
                      </h5>
                      <span>
                        <i class="fa fa-eye"></i> 19.141 Viewes
                      </span>
                    </div>
                  </div>
                  <div class="product__sidebar__comment__item">
                    <div class="product__sidebar__comment__item__pic">
                      <img src="img/sidebar/comment-2.jpg" alt="" />
                    </div>
                    <div class="product__sidebar__comment__item__text">
                      <ul>
                        <li>Active</li>
                        <li>Movie</li>
                      </ul>
                      <h5>
                        <a href="#">Shirogane Tamashii hen Kouhan sen</a>
                      </h5>
                      <span>
                        <i class="fa fa-eye"></i> 19.141 Viewes
                      </span>
                    </div>
                  </div>
                  <div class="product__sidebar__comment__item">
                    <div class="product__sidebar__comment__item__pic">
                      <img src="img/sidebar/comment-3.jpg" alt="" />
                    </div>
                    <div class="product__sidebar__comment__item__text">
                      <ul>
                        <li>Active</li>
                        <li>Movie</li>
                      </ul>
                      <h5>
                        <a href="#">Kizumonogatari III: Reiket su-hen</a>
                      </h5>
                      <span>
                        <i class="fa fa-eye"></i> 19.141 Viewes
                      </span>
                    </div>
                  </div>
                  <div class="product__sidebar__comment__item">
                    <div class="product__sidebar__comment__item__pic">
                      <img src="img/sidebar/comment-4.jpg" alt="" />
                    </div>
                    <div class="product__sidebar__comment__item__text">
                      <ul>
                        <li>Active</li>
                        <li>Movie</li>
                      </ul>
                      <h5>
                        <a href="#">Monogatari Series: Second Season</a>
                      </h5>
                      <span>
                        <i class="fa fa-eye"></i> 19.141 Viewes
                      </span>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Product Section End */}
    </div>
  );
};

export default Home;
