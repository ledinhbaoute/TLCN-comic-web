import axios from "axios";
import API_URL from "../config/config";
import { PY_API_URL } from "../config/config";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Scrollbars from "react-custom-scrollbars-2";


const RecommentComicList = ({ tittle }) => {
    const currentUserId = window.sessionStorage.getItem("userid")
    const [recommentList, setRecommentList] = useState([]);
    const [recommentComicList, setRecommentComicList] = useState([]);

    useEffect(() => {
        const getRecommentIdList = async () => {

            try {
                const response = await axios.get(
                    `${PY_API_URL}/user/${currentUserId}`
                );
                setRecommentList(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        getRecommentIdList()

    }, [currentUserId])

    const getComicById = async (comicId) => {
        try {

            const response = await axios.get(
                `${API_URL}/comicbooks/${comicId}`
            );
            return response.data.data;

        } catch (error) {
            console.log(error);
            return null;
        }
    };
    useEffect(() => {
        const getRecommentComics = async () => {
            if (recommentList.length === 0) return;

            try {
                const comicPromises = recommentList.map(comicId => getComicById(comicId));
                const comics = await Promise.all(comicPromises);

                // Filter out null values in case some requests failed
                const validComics = comics.filter(comic => comic !== null);
                setRecommentComicList(validComics);
            } catch (error) {
                console.log(error);
            }
        };

        getRecommentComics();
    }, [recommentList]);


    return (
        <>
            <div class="product__sidebar">
                <div class="product__sidebar__comment">
                    <div class="section-title">
                        <h5>{tittle}</h5>
                    </div>
                    <Scrollbars
               autoHeight autoHeightMax={1120}>
                    {recommentComicList && recommentComicList.map((item) => (
                        <div class="product__sidebar__comment__item">
                            <img class="product__sidebar__comment__item__pic" src={item.image} alt="" />
                            <div class="product__sidebar__comment__item__text">
                                <ul>
                                    {item.genres.map((genre)=>(
                                        <li>{genre.name}</li>
                                    ))}
                                </ul>
                                <h5><Link to={`/comic-detail/${item.id}`}>{item.name}</Link></h5>
                                <span><i class="fa fa-eye"></i> {item.view} lượt xem</span>
                            </div>
                        </div>
                    ))}
                    </Scrollbars>


                </div>
            </div>
        </>
    );
};
export default RecommentComicList;

