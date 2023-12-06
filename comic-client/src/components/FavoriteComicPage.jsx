import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../config/config";
import Pagination from "./Pagination";
import ComicItem from "./ComicItem";
import Cookies from "js-cookie";
import { checkAuth } from "../security/Authentication";
const FavoriteComicPage = () => {
    const [listComic, setListComic] = useState([])

    useEffect(() => {
        const getFavoriteComic = async () => {
            if (checkAuth()) {
                try {
                    const response = await axios.get(
                        `${API_URL}/user/favorite-comic`,
                        {
                            headers: {
                            "Authorization":"Bearer "+ Cookies.get("access_token")                           
                            }
                          }
                    );
                    setListComic(response.data.data);
                } catch (error) {
                    console.log(error);
                }
            }
        }
        getFavoriteComic();
    }, []);

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
                                            <h4>Ưa thích</h4>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            {
                                listComic.length>0? (
                                    <div className="row">
                                    {listComic.map((item,index) => (
                                        <ComicItem item={item.comicBookDTO} key={index} />
                                    ))}
                                </div>
                                ):(
                                    <div className="anime__details__title">
                                    
                                    {checkAuth()? (
                                            <h3>Danh sách trống</h3>
                                        ):(
                                        <h3>Bạn cần đăng nhập</h3>)
                                        }
                                  </div>
                                )
                            }
                           
                        </div>
                        {/* <Pagination totalPage={totalPage} listBy={listBy} currentPage={indexPage} /> */}
                    </div>
                </div>
            </div>
        </section>


    )
}
export default FavoriteComicPage;