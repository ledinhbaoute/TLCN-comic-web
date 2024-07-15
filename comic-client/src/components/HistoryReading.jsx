import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../config/config";
import ComicItem from "./ComicItem";
import Cookies from "js-cookie";
import RecommentComicList from "./RecommentComicList";
import { checkAuth } from "../security/Authentication";
const HistoryReadingPage = () => {
    const [listComic, setListComic] = useState([])
    const [listHistory, setListHistory] = useState([])
    useEffect(() => {
        const getHistoryReading = async () => {
            if (checkAuth()) {
                try {
                    const response = await axios.get(
                        `${API_URL}/user/history_reading`,
                        {
                            headers: {
                                "Authorization": "Bearer " + Cookies.get("access_token")
                            }
                        }
                    );
                    setListHistory(response.data);

                } catch (error) {
                    console.log(error);
                }
            }
        }
        getHistoryReading();
    }, []);
    useEffect(()=>{
        setListComic(listHistory.map((item, index) =>
            item.chapter
        ))
    },[listHistory])
    
    return (
        <section className="product-page spad">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="product__page__content">
                            <div className="product__page__title">
                                <div className="row">
                                    <div className="col-lg-8 col-md-8 col-sm-6">
                                        <div className="section-title">
                                            <h4>Lịch sử đọc truyện</h4>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            {
                                listComic.length > 0 ? (
                                    <div className="row">
                                        {listComic.map((item, index) => (
                                            <ComicItem chapter={item} item={item.comicBook_Id} key={index} />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="anime__details__title">
                                        {checkAuth() ? (
                                            <div>
                                                <h3>Chưa có lịch sử đọc truyện</h3>
                                               
                                            </div>
                                        ) : (
                                            <div>
                                                <h3>Bạn cần đăng nhập</h3>
                                               
                                            </div>)
                                        }
                                    </div>
                                )
                            }

                        </div>
                       
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-8">
                        <RecommentComicList tittle="Gợi ý cho bạn"></RecommentComicList>
                    </div>
                </div>
            </div>
        </section>


    )
}
export default HistoryReadingPage;