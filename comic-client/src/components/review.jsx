import axios from "axios";
import API_URL from "../config/config";
import React, { useEffect, useState } from "react";
import { Rating } from 'react-simple-star-rating'
import { checkAuth } from "../security/Authentication";
import Cookies from 'js-cookie';
const Review = (props) => {
    const ratingList = props.ratingList
    const comicId=props.comicId
    const [ratingComment, setRatingComment] = useState("");
    const [ratingScore, setRatingScore] = useState(0)
    const [rating, setRating] = useState({})
    
    const handleTextareaChange = (event) => {
        setRatingComment(event.target.value);
    };
    const handleRating = (rate) => {
        setRatingScore(rate)
    }
    const insertRating = async () => {
        try {
                const response = await axios.post(
                    `${API_URL}/user/ratings`,
                    {comicId:comicId,score:ratingScore,comment:ratingComment},
                    {
                        headers: {
                        "Authorization":"Bearer "+ Cookies.get("access_token"),
                          "Content-Type": "application/x-www-form-urlencoded"
                        }
                      }
                );
                if(response.data.status===true){
                    setRating(response.data.data)
                }
               

        } catch (error) {
            console.log(error);
        }
    };
    
    const handleSubmit = (event) => {
        //event.preventDefault()
        if (!checkAuth()) {

            alert("Bạn cần đăng nhập để đánh giá truyện")
             event.preventDefault()
        }
        else if(ratingScore===0 || ratingComment===""){
            setRatingScore(0);
            setRatingComment("")
            alert("Nhập nội dung và điểm điểm đánh giá")
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
                    <h5>Đánh giá</h5>
                </div>
                {ratingList.length ? (ratingList.map((item) => (
                    <div key={item.id} className="anime__review__item">
                        <div className="anime__review__item__pic">
                            <img src={`http://localhost:8081/api/v1/files/${item.user.avatar}`} alt="" />
                        </div>
                        <div className="anime__review__item__text">
                            <h6>{item.user.name}    <span>{item.score}⭐</span></h6>
                            <p>{item.comment}</p>
                        </div>
                    </div>
                ))) : (<div className="anime__review__item">

                    <div className="anime__review__item__text">

                        <p>Chưa có đánh giá</p>
                    </div>
                </div>)}


            </div>
            <div className="anime__details__form">
                <div className="section-title">
                    <h5>Đánh giá của bạn</h5>
                </div>
                <form onSubmit={handleSubmit}>
                    <Rating initialValue={ratingScore} onClick={handleRating} />
                    <textarea value={ratingComment} onChange={handleTextareaChange} placeholder="Viết đánh giá vào đây"></textarea>
                    <button type="submit"  ><i className="fa fa-location-arrow"></i> Đánh giá</button>
                </form>
            </div>
        </>
    )
}
export default Review;