
import React from "react";
import { Link } from "react-router-dom";
const ComicItem = ({item}) => {
    const itemImageUrl = `${process.env.PUBLIC_URL}/images/popular/popular-1.jpg`

    const firstThreeGenres = item.genres.slice(0,3);
    return (
        <div className="col-lg-4 col-md-6 col-sm-6">
        <div className="product__item">
            <div className="product__item__pic set-bg" style={{ backgroundImage: `url('http://localhost:8081/api/v1/files/${item.image}')`}}>
                {/* <div className="ep">18 / 18</div> */}
                <div className="comment"><i className="fa fa-star"></i> {item.rate}</div>
                <div className="view"><i className="fa fa-eye"></i> {item.view}</div>
            </div>
            <div className="product__item__text">
                <ul>
                    {firstThreeGenres.map((item) => (
                        <li key={item.id}>{item.name}</li>
                    ))}
                </ul>
                <h5><Link to={`/comic-detail/${item.id}`}>{item.name}</Link></h5>
            </div>
        </div>
        </div>

    )
}
export default ComicItem;