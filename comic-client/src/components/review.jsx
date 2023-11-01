import React from "react";
import ReactDOM from 'react-dom/client';
import "../sass/style.scss";
import "../css/AllStyles";

function getImageUrl(imageName) {
    return `${process.env.PUBLIC_URL}/images/anime/`+imageName
}
const Review = () => {

    return (
        <>            
                <div className="anime__details__review">
                    <div className="section-title">
                        <h5>Reviews</h5>
                    </div>
                    <div className="anime__review__item">
                        <div className="anime__review__item__pic">
                            <img src={getImageUrl("review-1.jpg")} alt="" />
                        </div>
                        <div className="anime__review__item__text">
                            <h6>Chris Curry - <span>1 Hour ago</span></h6>
                            <p>whachikan Just noticed that someone categorized this as belonging to the genre
                                "demons" LOL</p>
                        </div>
                    </div>
                    <div className="anime__review__item">
                        <div className="anime__review__item__pic">
                            <img src={getImageUrl("review-2.jpg")} alt="" />
                        </div>
                        <div className="anime__review__item__text">
                            <h6>Lewis Mann - <span>5 Hour ago</span></h6>
                            <p>Finally it came out ages ago</p>
                        </div>
                    </div>
                    <div className="anime__review__item">
                        <div className="anime__review__item__pic">
                            <img src={getImageUrl("review-2.jpg")} alt="" />
                        </div>
                        <div className="anime__review__item__text">
                            <h6>Louis Tyler - <span>20 Hour ago</span></h6>
                            <p>Where is the episode 15 ? Slow update! Tch</p>
                        </div>
                    </div>
                    <div className="anime__review__item">
                        <div className="anime__review__item__pic">
                            <img src={getImageUrl("review-2.jpg")} alt="" />
                        </div>
                        <div className="anime__review__item__text">
                            <h6>Chris Curry - <span>1 Hour ago</span></h6>
                            <p>whachikan Just noticed that someone categorized this as belonging to the genre
                                "demons" LOL</p>
                        </div>
                    </div>
                    <div className="anime__review__item">
                        <div className="anime__review__item__pic">
                            <img src={getImageUrl("review-2.jpg")} alt="" />
                        </div>
                        <div className="anime__review__item__text">
                            <h6>Lewis Mann - <span>5 Hour ago</span></h6>
                            <p>Finally it came out ages ago</p>
                        </div>
                    </div>
                    <div className="anime__review__item">
                        <div className="anime__review__item__pic">
                            <img src={getImageUrl("review-2.jpg")} alt="" />
                        </div>
                        <div className="anime__review__item__text">
                            <h6>Louis Tyler - <span>20 Hour ago</span></h6>
                            <p>Where is the episode 15 ? Slow update! Tch</p>
                        </div>
                    </div>
                </div>
                <div className="anime__details__form">
                    <div className="section-title">
                        <h5>Your Comment</h5>
                    </div>
                    <form action="#">
                        <textarea placeholder="Your Comment"></textarea>
                        <button type="submit"><i className="fa fa-location-arrow"></i> Review</button>
                    </form>
                </div>
        

        </>
    )
}
export default Review;