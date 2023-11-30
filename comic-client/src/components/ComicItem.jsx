
import React from "react";
import ReactDOM from 'react-dom/client';

const ComicItem = () => {
    const itemImageUrl = `${process.env.PUBLIC_URL}/images/popular/popular-1.jpg`

    
    return (
        <div className="col-lg-4 col-md-6 col-sm-6">
        <div className="product__item">
            <div className="product__item__pic set-bg" style={{ backgroundImage: `url(${itemImageUrl})`}}>
                <div className="ep">18 / 18</div>
                <div className="comment"><i className="fa fa-comments"></i> 11</div>
                <div className="view"><i className="fa fa-eye"></i> 9141</div>
            </div>
            <div className="product__item__text">
                <ul>
                    <li>Active</li>
                    <li>Movie</li>
                </ul>
                <h5><a href="#">Sen to Chihiro no Kamikakushi</a></h5>
            </div>
        </div>
        </div>

    )
}
export default ComicItem;