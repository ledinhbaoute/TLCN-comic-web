import React from "react";
import { Link } from "react-router-dom";

const ComicList = (props) => {
     const listComic = props.listComic
    // const [listComic,setListComic]=useState([]);


    return (

        <div className="product__sidebar__view">
            <div className="section-title">
                <h5>{props.title}</h5>
            </div>
            {/* <ul class="filter__controls">
            <li class="active">Ngày</li>
            <li>Tuần</li>
            <li >Tháng</li>
            <li>Năm</li>
            <li>Tất cả</li>

        </ul> */}
            {listComic && listComic.map((item) => (
                <div className="product__sidebar__view__item set-bg" key={item.id}  style={{ backgroundImage: `url(http://localhost:8081/api/v1/files/${item.image})` }}>
                    {item.premium &&(
                        <div className="ep">Premium</div>
                    )}
                    <div className="view" key={item.id}><i className="fa fa-eye"  key={item.id}></i>{item.view}</div>
                    <h5><Link to={`/comic-detail/${item.id}`}key={item.id}>{item.name}</Link></h5>
                </div>
            ))}


         </div>
    )
}
export default ComicList;