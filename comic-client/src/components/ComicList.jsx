import React from "react";
import { Link } from "react-router-dom";

const ComicList = (props) => {
    const listComic = props.listComic

    return (

        <div className="anime__details__sidebar">
            <div className="section-title">
                <h5>{props.title}</h5>
            </div>
            {listComic && listComic.map((item,index) => (
                <div className="product__sidebar__view__item set-bg" style={{ backgroundImage: `url(http://localhost:8081/api/v1/files/${item.image})` }}>
                    <div className="ep">18 / ?</div>
                    <div className="view"><i className="fa fa-eye"></i> {item.view}</div>
                    <h5><Link to={`/comic-detail/${item.id}`}key={index}>{item.name}</Link></h5>
                </div>
            ))}


         </div>

    )
}
export default ComicList;