import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import axios from 'axios';
import API_URL from "../config/config";
import Cookies from 'js-cookie';
import { checkAuth } from '../security/Authentication';
const SearchResutlItem = ({searchItem}) => {
    const displayText = searchItem.name.length < 20 ? searchItem.name : `${searchItem.name.slice(0, 20)}...`;
    
    return (

        <div className="product__sidebar__comment__item">
            <div className="product__sidebar__comment__item__pic">
                <img src={searchItem.image} alt="hinh" />
            </div>
            <div className="product__sidebar__comment__item__text">
            
                <h5><Link to ={`/comic-detail/${searchItem.id}`} >{displayText}</Link></h5>
                <span><i className="fa fa-eye"></i> {searchItem.view}</span>
            </div>
        </div>

    )
}
export default SearchResutlItem