import axios from "axios";
import API_URL from "../config/config";
import React, { useEffect, useState } from "react";
import { checkAuth } from "../security/Authentication";
import Cookies from 'js-cookie';
const Comment = (props) => {
    const chapterId = props.chapterId
    const [commentList, setCommentList] = useState([])
    const [commentContent,setCommentContent]=useState('')
    const [comment,setComment]=useState({})
    useEffect(() => {
        const getCommentByChapter = async () => {
            try {
                if (chapterId) {
                    const response = await axios.get(
                        `${API_URL}/comments?chapterId=${chapterId}`
                    );
                    setCommentList(response.data.data);
                }
            } catch (error) {
                console.log(error);
            }

        };
        getCommentByChapter();

    }, [chapterId]);

    const insertComment = async () => {
        try {
                const response = await axios.post(
                    `${API_URL}/user/comments`,
                    {chapterId:chapterId,content:commentContent},
                    {
                        headers: {
                        "Authorization":"Bearer "+ Cookies.get("access_token"),
                          "Content-Type": "application/x-www-form-urlencoded"
                        }
                      }
                );
                if(response.data.status===true){
                    setComment(response.data.data)
                }
            
        } catch (error) {
            console.log(error);
        }
    };
    const handleTextareaChange = (event) => {
        setCommentContent(event.target.value);
    };
    const handleSubmit = (event) => {
        
        if (!checkAuth()) {
            alert("Bạn cần đăng nhập để bình luận")
            event.preventDefault()
        }
        else if(commentContent===""){
            alert("Nhập nội dung bình luận")
            event.preventDefault()
        }
        else {
            insertComment();
            setCommentContent("")
        }
    };

    return (
        <>
            <div className="anime__details__review">
                <div className="section-title">
                    <h5>Bình luận</h5>
                </div>
                {commentList.length ? (commentList.map((item) => (
                    <div key={item.id} className="anime__review__item">
                        <div className="anime__review__item__pic">
                            <img src={`http://localhost:8081/api/v1/files/${item.user.avatar}`} alt="" />
                        </div>
                        <div className="anime__review__item__text">
                            <h6>{item.user.name}  <span>{item.createAt}</span></h6>
                            <p>{item.content}</p>
                        </div>
                    </div>
                ))) : (<div className="anime__review__item">

                    <div className="anime__review__item__text">

                        <p>Chưa có bình luận</p>
                    </div>
                </div>)}
            </div>
            <div className="anime__details__form">
                <div className="section-title">
                    <h5>Bình luận tại đây</h5>
                </div>
                <form onSubmit={handleSubmit}>
                    <textarea className="inputText" value={commentContent} onChange={handleTextareaChange} placeholder="Your Comment"></textarea>

                    <button type="submit"><i className="fa fa-location-arrow"></i> Bình luận</button>
                </form>
            </div>


        </>
    )
}
export default Comment;