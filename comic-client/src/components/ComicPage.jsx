import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../config/config";
import Pagination from "./Pagination";
import SearchComicItem from "./SearchComicItem"
const ComicPage = (props) => {
    const {listBy, indexPage} = useParams();
    const [listComic, setListComic] = useState([])
    const [totalPage, setTotalPage] = useState({});
    
    useEffect(() => {
        const getListComic = async () => {
            if (listBy === "trending") {
                try {
                    const response = await axios.get(
                        `${API_URL}/comic_trending?indexPage=${indexPage-1}`
                    );
                    setListComic(response.data.content);
                    setTotalPage(response.data.totalPages)
                } catch (error) {
                    console.log(error);
                }
            }
            else if(listBy==="new_update"){
                try {
                    const response = await axios.get(
                        `${API_URL}/comic/latest_update?indexPage=${indexPage-1}`
                    );
                    setListComic(response.data.content);
                    setTotalPage(response.data.totalPages)
                } catch (error) {
                    console.log(error);
                }
            }
        }
        getListComic();

    }, [listBy, indexPage]);

    return (
        <section className="product-page spad">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="product__page__content">
                            <div className="product__page__title">
                                <div className="row">
                                    <div className="col-lg-12 col-md-8 col-sm-6">
                                        <div className="section-title">
                                            <h4>{listBy==="trending"? "Trending":"Truyện mới cập nhật"}</h4>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="row">
                                {listComic.map((item) => (
                                    <SearchComicItem item={item} key={item.id} />
                                ))}
                            </div>
                        </div>
                        <Pagination totalPage={totalPage} listBy={listBy} currentPage={indexPage} />
                    </div>
                </div>
            </div>
        </section>


    )
}
export default ComicPage;