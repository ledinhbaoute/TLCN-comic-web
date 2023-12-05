import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import API_URL from "../config/config";
const ComicItem = ({item}) => {
    const firstThreeGenres = item.genres.slice(0,3);
    const [viewCount, setViewCount] = useState(item.view);

   
        const increaseView = async () => {
          try {
            const response = await axios.post(`${API_URL}/comic/view`,
            { comicId:item.id},
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            });
           
          } catch (error) {
            console.error('Error increasing view:', error);
          }
        };       
    
    return (
        <div className="col-lg-4 col-md-6 col-sm-6">
        <div className="product__item">
            <div className="product__item__pic set-bg" style={{ backgroundImage: `url('http://localhost:8081/api/v1/files/${item.image}')`}}>
                {item.premium && (
                    <div className="ep">PREMIUM</div>
                )}
                
                <div className="comment"><i className="fa fa-star"></i> {item.rate}</div>
                <div className="view"><i className="fa fa-eye"></i> {item.view}</div>
            </div>
            <div className="product__item__text">
                <ul>
                    {firstThreeGenres.map((item) => (
                        <li key={item.id}>{item.name}</li>
                    ))}
                </ul>
                <h5 onClick={increaseView}><Link to={`/comic-detail/${item.id}`}>{item.name}</Link></h5>
            </div>
        </div>
        </div>
    )
}
export default ComicItem;