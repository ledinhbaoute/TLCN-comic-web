import React from "react";
import ReactDOM from 'react-dom/client';
const Pagination = () => {

    return (
        <div className="product__pagination">
            <a href="#"><i className="fa fa-angle-double-left"></i></a>
            <a href="#" className="current-page">1</a>
            <a href="#">2</a>
            <a href="#">3</a>
            <a href="#">4</a>
            <a href="#">5</a>
            <a href="#"><i className="fa fa-angle-double-right"></i></a>
        </div>
    )
}
export default Pagination;