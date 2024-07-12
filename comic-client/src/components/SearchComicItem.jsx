import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import API_URL from "../config/config";
import Cookies from "js-cookie";
import { checkAuth } from "../security/Authentication";
const SearchComicItem = ({ item }) => {
    const firstThreeGenres = item.genres.slice(0, 3);
    const location = useLocation();
    const currentPath = location.pathname;

    const increaseView = async () => {
        try {
            const response = await axios.post(
                `${API_URL}/comic/view`,
                { comicId: item.id },
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );
        } catch (error) {
            console.error(error);
        }
    };
    const insertHistoryReading = async (chapterId) => {
        try {
            if (checkAuth) {
                const response = await axios.post(
                    `${API_URL}/user/history_reading`,
                    { chapterId: chapterId },
                    {
                        headers: {
                            Authorization: "Bearer " + Cookies.get("access_token"),
                            "Content-Type": "application/x-www-form-urlencoded",
                        },
                    }
                );
            }
            // setRatingList(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="col-lg-2 col-md-1 col-sm-1">
            <div className="product__item">
                <div
                    className="product__item__picc set-bg"
                    style={{ backgroundImage: `url('${API_URL}/files/${item.image}')` }}
                >
                    {item.premium && <div className="ep">PREMIUM</div>}

                    <div className="comment">
                        <i className="fa fa-star"></i> {item.rate}
                    </div>
                    <div className="view">
                        <i className="fa fa-eye"></i> {item.view}
                    </div>
                </div>
                <div className="product__item__text">
                    <ul>
                        {firstThreeGenres.map((item) => (
                            <li key={item.id}>{item.name}</li>
                        ))}
                    </ul>
                    <h5 onClick={increaseView}>
                        <Link to={`/comic-detail/${item.id}`}>{item.name}</Link>
                    </h5>
                </div>
            </div>
        </div>
    );
};
export default SearchComicItem;