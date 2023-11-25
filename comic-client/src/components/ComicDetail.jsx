import React from "react";
import ReactDOM from "react-dom/client";
const ComicDetail = () => {
  const imgDetailUrl = `${process.env.PUBLIC_URL}/images/anime/details-pic.jpg`;

  var demo = {
    id: "1",
    img: `${process.env.PUBLIC_URL}/images/anime/details-pic.jpg`,
    name: "Fate Stay Night: Unlimited Blade",
    author: "フェイト／ステイナイト, Feito／sutei naito",
    rating: "4.5",
    numberOfVote: "1050",
    describe: `Every human inhabiting the world of Alcia is branded by a “Count” or a number written on
        their body. For Hina’s mother, her total drops to 0 and she’s pulled into the Abyss,
        never to be seen again. But her mother’s last words send Hina on a quest to find a
        legendary hero from the Waste War - the fabled Ace!`,
    genres: ["Action", "Adventure", "Fantasy", "Magic"],
    datePublished: "Oct 02, 2019 to ?",
    comicStatus: "Continue",
    views: "131600",
  };

  return (
    <div class="anime__details__content">
      <div class="row">
        <div class="col-lg-3">
          <div
            class="anime__details__pic set-bg"
            style={{ backgroundImage: `url(${demo.img})` }}
          >
            <div class="comment">
              <i class="fa fa-comments"></i> 11
            </div>
            <div class="view">
              <i class="fa fa-eye"></i> 9141
            </div>
          </div>
        </div>
        <div class="col-lg-9">
          <div class="anime__details__text">
            <div class="anime__details__title">
              <h3>{demo.name}</h3>
              <span>{demo.author}</span>
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
            <p>{demo.describe}</p>
            <div class="anime__details__widget">
              <div class="row">
                <div class="col-lg-6 col-md-6">
                  <ul>
                    <li>
                      <span>Date published:</span> {demo.datePublished}
                    </li>
                    <li>
                      <span>Status:</span> {demo.comicStatus}
                    </li>
                    <li>
                      <span>Genre:</span>
                      {demo.genres.map((item, index) => (
                        <a key={index}> {item} </a>
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
                      <span>Rating:</span> {demo.rating} / {demo.numberOfVote} times
                    </li>
                    {/* <li>
                      <span>Duration:</span> 24 min/ep
                    </li> */}
                    {/* <li>
                      <span>Quality:</span> HD
                    </li> */}
                    <li>
                      <span>Views:</span> {demo.views}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="anime__details__btn">
              <a href="#" class="follow-btn">
                <i class="fa fa-heart-o"></i> Follow
              </a>
              <a href="#" class="watch-btn">
                <span>Read Now</span> <i class="fa fa-angle-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
// const root = ReactDOM.createRoot(document.getElementById('animeDetail'));
// root.render(
//   <React.StrictMode>
//     <AnimeDetail />
//   </React.StrictMode>);
export default ComicDetail;
