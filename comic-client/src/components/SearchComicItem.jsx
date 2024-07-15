import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import API_URL from "../config/config";
const SearchComicItem = ({ item }) => {
    const firstThreeGenres = item.genres.slice(0, 3);

    const increaseView = async () => {
        try {
            await axios.post(
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