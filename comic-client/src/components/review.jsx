import axios from "axios";
import API_URL from "../config/config";
import React, { useState } from "react";
import { Rating } from 'react-simple-star-rating'
import { checkAuth } from "../security/Authentication";
import Cookies from 'js-cookie';
import Scrollbars from "react-custom-scrollbars-2";
import toast from "react-hot-toast";
const Review = (props) => {
    const ratingList = props.ratingList
    const comicId=props.comicId
    const [ratingComment, setRatingComment] = useState("");
    const [ratingScore, setRatingScore] = useState(0)
    const defaultAvatarUrl = `${process.env.PUBLIC_URL}/images/default-avatar.png`;

    const handleTextareaChange = (event) => {
        setRatingComment(event.target.value);
    };
    const handleRating = (rate) => {
        setRatingScore(rate)
    }
    const insertRating = async () => {
        try {
                await axios.post(
                    `${API_URL}/user/ratings`,
                    {comicId:comicId,score:ratingScore,comment:ratingComment},
                    {
                        headers: {
                        "Authorization":"Bearer "+ Cookies.get("access_token"),
                          "Content-Type": "application/x-www-form-urlencoded"
                        }
                      }
                );

        } catch (error) {
            console.log(error);
        }
    };
    
    const handleSubmit = (event) => {
        //event.preventDefault()
        if (!checkAuth()) {
            toast("Bạn cần đăng nhập để đánh giá truyện!",{
                icon:'🛈',
                position:"top-right",
                style: {
                  border: '1px solid #713200',
                  padding: '16px',
                  color: '#713200',
                },
               })
             event.preventDefault()
        }
        else if(ratingScore===0 || ratingComment===""){
            setRatingScore(0);
            setRatingComment("")
            toast("Nhập nội dung và điểm để đánh giá",{
                icon:'🛈',
                position:"top-right",
                style: {
                  border: '1px solid #713200',
                  padding: '16px',
                  color: '#713200',
                },
               })
             event.preventDefault()
        }
        else {
            insertRating();
            setRatingScore(0);
            setRatingComment("")
           
        }
    };


    return (
        <>
            <div className="anime__details__review">
                <div className="section-title">
                    <h5>Đánh giá ({ratingList.length})</h5>
                   
                </div>
                <div className="anime__details__title">
              </div>
                <Scrollbars
                autoHeight autoHeightMax={300}>
                {ratingList.length ? (ratingList.map((item) => (
                    <div key={item.id} className="anime__review__item">
                        <div className="anime__review__item__pic">
                            <img src={item.user.avatar?item.user.avatar:defaultAvatarUrl} alt="" />
                        </div>
                        <div className="anime__review__item__text">
                            <h6>{item.user.name}<br></br><span>{item.score}⭐</span></h6>
                            <p>{item.comment}</p>
                        </div>
                    </div>
                ))) : (<div className="anime__review__item">

                    <div className="anime__review__item__text">

                        <p>Chưa có đánh giá</p>
                    </div>
                </div>)}
                </Scrollbars>

            </div>
            <div className="anime__details__form">
                <div className="section-title">
                    <h5>Đánh giá của bạn</h5>
                </div>
                <form onSubmit={handleSubmit}>
                    <Rating initialValue={ratingScore} onClick={handleRating} />
                    <textarea className="inputText" value={ratingComment} onChange={handleTextareaChange} placeholder="Viết đánh giá vào đây"></textarea>
                    <button type="submit"  ><i className="fa fa-location-arrow"></i> Đánh giá</button>
                </form>
            </div>
        </>
    )
}
export default Review;