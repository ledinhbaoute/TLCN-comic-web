
import React from "react";
import ReactDOM from 'react-dom/client';

const ComicItem = () => {
    const itemImageUrl = `${process.env.PUBLIC_URL}/images/popular/popular-1.jpg`

    
    return (
        <div class="col-lg-4 col-md-6 col-sm-6">
        <div class="product__item">
            <div class="product__item__pic set-bg" style={{ backgroundImage: `url(${itemImageUrl})`}}>
                <div class="ep">18 / 18</div>
                <div class="comment"><i class="fa fa-comments"></i> 11</div>
                <div class="view"><i class="fa fa-eye"></i> 9141</div>
            </div>
            <div class="product__item__text">
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